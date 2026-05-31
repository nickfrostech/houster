/** @format */

"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { fetchProfile } from "./data";
import { useRouter, usePathname } from "next/navigation";

type User = {
	id: string;
	email: string;
};

type Profile = {
	id: string;
	role: "student" | "admin";
	full_name: string;
	[key: string]: any;
};

interface AuthContextType {
	user: User | null;
	profile: Profile | null;
	loading: boolean;
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	profile: null,
	loading: true,
	signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [profile, setProfile] = useState<Profile | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const pathname = usePathname();

	// Helper to fetch profile with retry logic (trigger may be delayed)
	const fetchProfileWithRetry = async (userId: string, email: string, maxAttempts = 5) => {
		for (let attempt = 1; attempt <= maxAttempts; attempt++) {
			try {
				const profile = await fetchProfile(userId);
				return profile;
			} catch (error) {
				if (attempt < maxAttempts) {
					// Wait before retrying (trigger might need time to fire)
					await new Promise((resolve) => setTimeout(resolve, 500));
				} else {
					console.error("fetchProfileWithRetry exhausted:", error);
					// Fallback profile if trigger failed or RLS blocked read
					return {
						id: userId,
						email: email,
						role: "student",
						full_name: "Student",
					} as Profile;
				}
			}
		}
		return null;
	};

	// Helper to redirect users to role-specific dashboard when appropriate
	const redirectToRole = (p: Profile | null) => {
		if (!p) return;
		const target = p.role === "student" ? "/student" : "/admin";
		
		// Use window.location.pathname to get the freshest value without depending on a react state that kills the effect
		if (typeof window !== "undefined") {
			const currentPath = window.location.pathname;
			if (currentPath === "/login" || currentPath === "/register" || currentPath === "/") {
				router.push(target);
			}
		}
	};

	useEffect(() => {
		let mounted = true;

		const loadSession = async () => {
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession();
				
				if (session?.user) {
					setUser({ id: session.user.id, email: session.user.email! });
					const profile = await fetchProfileWithRetry(session.user.id, session.user.email!);
					if (mounted) {
						setProfile(profile);
						redirectToRole(profile);
					}
				}
			} catch (error) {
				console.error("Error loading auth session:", error);
			} finally {
				if (mounted) setLoading(false);
			}
		};

		loadSession();

		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				if (session?.user) {
					// We don't blindly set loading true here if it's just a token refresh. 
					// But if user wasn't set, we might need to.
					setUser(prev => {
						if (!prev) setLoading(true);
						return { id: session.user.id, email: session.user.email! };
					});
					
					const profile = await fetchProfileWithRetry(session.user.id, session.user.email!);
					
					if (mounted) {
						setProfile(profile);
						setLoading(false);
						redirectToRole(profile);
					}
				} else {
					if (mounted) {
						setUser(null);
						setProfile(null);
						setLoading(false);
					}
				}
			},
		);

		return () => {
			mounted = false;
			authListener.subscription.unsubscribe();
		};
	}, [router]); // Router from next/navigation is safe to depend on

	const signOut = async () => {
		await supabase.auth.signOut();
		setUser(null);
		setProfile(null);
		router.push("/");
	};

	return (
		<AuthContext.Provider value={{ user, profile, loading, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
