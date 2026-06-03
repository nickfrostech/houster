/** @format */

"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { toast } from "sonner";
import Link from "next/link";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: z.infer<typeof loginSchema>) => {
		setLoading(true);

		const { data: authData, error } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (error) {
			toast.error(error.message);
			setLoading(false);
			return;
		}

		if (authData?.user) {
			// Auth succeeded. The auth provider's listener will handle profile fetch and redirect.
			toast.success("Login successful! Loading your dashboard...");
			// Don't manually redirect; let the auth provider do it after profile loads
		}

		setLoading(false);
	};

	return (
		<div className='min-h-screen flex flex-col bg-muted/20'>
			<Navbar />
			<main className='flex-1 flex items-center justify-center p-4'>
				<Card className='w-full max-w-md shadow-lg border-primary/10'>
					<CardHeader className='space-y-1 text-center'>
						<CardTitle className='text-2xl font-bold tracking-tight text-primary'>
							Portal Login
						</CardTitle>
						<CardDescription>
							Enter your email and password to access your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email Address</Label>
								<Input
									id='email'
									type='email'
									placeholder='student@university.edu'
									{...register("email")}
								/>
								{errors.email && (
									<p className='text-sm text-destructive'>
										{errors.email.message}
									</p>
								)}
							</div>
							<div className='space-y-2'>
								<div className='flex items-center justify-between'>
									<Label htmlFor='password'>Password</Label>
								</div>
								<Input
									id='password'
									type='password'
									{...register("password")}
								/>
								{errors.password && (
									<p className='text-sm text-destructive'>
										{errors.password.message}
									</p>
								)}
							</div>
							<Button
								type='submit'
								className='w-full h-11 text-base mt-2'
								disabled={loading}
							>
								{loading ? "Authenticating..." : "Login to Portal"}
							</Button>
						</form>
					</CardContent>
					<CardFooter className='flex flex-col text-center'>
						<p className='text-sm text-muted-foreground'>
							Don&apos;t have an account?{" "}
							<Link
								href='/register'
								className='text-primary font-medium hover:underline'
							>
								Apply for one
							</Link>
						</p>
					</CardFooter>
				</Card>
			</main>
		</div>
	);
}
