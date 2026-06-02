/** @format */

"use client";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, Building, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function StudentLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, profile, loading } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		console.log("StudentLayout check:", {
			loading,
			user: user?.email,
			profileRole: profile?.role,
		});
		// Only redirect if we're done loading and either:
		// - no user is logged in, OR
		// - user's role is explicitly not "student"
		if (!loading && !user) {
			console.log("StudentLayout: Redirecting to login - no user");
			router.push("/login");
		} else if (!loading && profile && profile.role !== "student") {
			console.log("StudentLayout: Redirecting based on role -", profile.role);
			router.push("/admin");
		}
	}, [user, profile, loading, router]);

	// Show nothing while loading or waiting for profile
	if (loading || !user || !profile) return null;

	const navItems = [
		{ name: "Dashboard", href: "/student", icon: LayoutDashboard },
		{ name: "My Profile", href: "/student/profile", icon: UserCircle },
	];

	return (
		<div className='min-h-screen bg-muted/20 flex flex-col'>
			<Navbar />
			<div className='flex-1 flex max-w-7xl w-full mx-auto p-4 gap-6'>
				{/* Sidebar */}
				<aside className='w-64 hidden md:flex flex-col gap-2 bg-primary text-primary-foreground rounded-2xl shadow-sm overflow-hidden shrink-0'>
					<div className='p-6 flex items-center gap-3 border-b border-primary-foreground/10 mb-2'>
						<h2 className='text-xl font-bold tracking-tight truncate'>
							Student Portal
						</h2>
					</div>
					<nav className='space-y-1 px-4 flex-1'>
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									"flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-primary-foreground/10",
									pathname === item.href
										? "bg-primary-foreground/20 text-white"
										: "text-primary-foreground/80",
								)}
							>
								<item.icon className='w-5 h-5 opacity-80' />
								{item.name}
							</Link>
						))}
					</nav>
					<div className='p-4 border-t border-primary-foreground/10 mt-auto'>
						<div className='flex items-center gap-3 p-2 bg-primary-foreground/5 rounded-lg'>
							<div className='overflow-hidden'>
								<p className='text-xs font-semibold truncate'>
									{profile.full_name}
								</p>
								<p className='text-[10px] text-primary-foreground/70 truncate'>
									{user?.email}
								</p>
							</div>
						</div>
					</div>
				</aside>

				{/* Main Content */}
				<main className='flex-1 py-6'>{children}</main>
			</div>
		</div>
	);
}
