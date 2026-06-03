/** @format */

"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
   
const registerSchema = z.object({
	fullName: z.string().min(2, "Full name is required"),
	email: z.email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	matricNumber: z.string().min(2, "Matric number is required"),
});

export default function RegisterPage() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: z.infer<typeof registerSchema>) => {
		setLoading(true);

		const { data: authData, error: authError } = await supabase.auth.signUp({
			email: data.email,
			password: data.password,
			options: {
				data: {
					full_name: data.fullName,
					matric_number: data.matricNumber,
				},
			},
		});

		if (authError) {
			toast.error(authError.message);
			setLoading(false);
			return;
		}

		if (authData.user) {
			if (authData.session) {
				toast.success("Registration successful! Redirecting...");
				router.push("/student");
			} else {
				toast.info(
					"Registration successful! Please check your email to confirm your account and then log in.",
				);
				router.push("/login");
			}
		}

		setLoading(false);
	};

	return (
		<div className='min-h-screen flex flex-col bg-muted/20'>
			<Navbar />
			<main className='flex-1 flex items-center justify-center p-4 py-12'>
				<Card className='w-full max-w-md shadow-lg border-primary/10'>
					<CardHeader className='space-y-1 text-center'>
						<CardTitle className='text-2xl font-bold tracking-tight text-primary'>
							Student Registration
						</CardTitle>
						<CardDescription>
							Create your portal account to apply for a bed space
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='fullName'>Full Name</Label>
								<Input
									id='fullName'
									placeholder='Oluwaseun Adebayo'
									{...register("fullName")}
								/>
								{errors.fullName && (
									<p className='text-sm text-destructive'>
										{errors.fullName.message}
									</p>
								)}
							</div>
							<div className='space-y-2'>
								<Label htmlFor='matricNumber'>
									Matriculation Number
								</Label>
								<Input
									id='matricNumber'
									placeholder='U20/CSC/1234'
									{...register("matricNumber")}
								/>
								{errors.matricNumber && (
									<p className='text-sm text-destructive'>
										{errors.matricNumber.message}
									</p>
								)}
							</div>
							<div className='space-y-2'>
								<Label htmlFor='email'>University Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='student@university.edu.ng'
									{...register("email")}
								/>
								{errors.email && (
									<p className='text-sm text-destructive'>
										{errors.email.message}
									</p>
								)}
							</div>
							<div className='space-y-2'>
								<Label htmlFor='password'>Password</Label>
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
								className='w-full h-11 text-base mt-4'
								disabled={loading}
							>
								{loading ? "Creating Account..." : "Create Account"}
							</Button>
						</form>
					</CardContent>
					<CardFooter className='flex flex-col text-center'>
						<p className='text-sm text-muted-foreground'>
							Already have an account?{" "}
							<Link
								href='/login'
								className='text-primary font-medium hover:underline'
							>
								Login here
							</Link>
						</p>
					</CardFooter>
				</Card>
			</main>
		</div>
	);
}
