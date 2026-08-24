/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const APP_NAME = import.meta.env.VITE_APP_NAME || "Houster";

export function SignupPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		role: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleRoleChange = (value: string | null) => {
		if (value !== null) setFormData((prev) => ({ ...prev, role: value }));
	};

	/*
	 * BACKEND INTEGRATION NOTE: REGISTRATION
	 * 
	 * Expected API Endpoint: POST /api/auth/register
	 * 
	 * Payload:
	 * {
	 *   "fullName": "John Doe",
	 *   "email": "user@example.com",
	 *   "phone": "08012345678",
	 *   "password": "securepassword123",
	 *   "role": "Agent" // ENUM: "Agent" | "Landlord" | "Student" | "Others"
	 * }
	 * 
	 * Expected Response (Success - 201 Created):
	 * {
	 *   "message": "Registration successful",
	 *   "token": "jwt_token_here",
	 *   "user": {
	 *     "id": "1",
	 *     "name": "John Doe",
	 *     "role": "Agent"
	 *   }
	 * }
	 * 
	 * Expected Error Response (400 Bad Request):
	 * {
	 *   "error": "Email already exists"
	 * }
	 */
	const handleSignup = (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match.");
			return;
		}
		setError(null);
		setIsLoading(true);

		// TODO: Replace with actual backend fetch
		// fetch('/api/auth/register', {
		//   method: 'POST',
		//   headers: { 'Content-Type': 'application/json' },
		//   body: JSON.stringify(formData)
		// })
		// .then(...)

		// Mocking network delay
		setTimeout(() => {
			setIsLoading(false);
			// After successful registration, redirect to dashboard or home
			window.location.href = "/";
		}, 1500);
	};

	return (
		<div className='min-h-screen grid lg:grid-cols-2 bg-background'>
			{/* Left Side: Visuals */}
			<div className='hidden lg:flex flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden'>
				<div className='absolute inset-0 bg-linear-to-br from-primary-foreground/10 to-transparent pointer-events-none' />

				<div className='relative z-10'>
					<Link to='/' className='flex items-center gap-2 mb-12 w-fit'>
						<span className='text-2xl font-black tracking-tight'>
							{APP_NAME}
						</span>
					</Link>

					<div className='max-w-lg'>
						<h1 className='text-5xl font-black leading-tight mb-6'>
							Join {APP_NAME} Today
						</h1>
						<p className='text-primary-foreground/80 text-lg leading-relaxed mb-8'>
							Create an account to post rooms, manage your properties, and reach thousands of students instantly.
						</p>

						{/* Info Banner */}
						<div className='flex items-start gap-3 bg-black/10 backdrop-blur-md p-4 rounded-xl border border-white/10'>
							<Info className='w-6 h-6 shrink-0 mt-0.5 text-primary-foreground/90' />
							<p className='text-sm leading-relaxed text-primary-foreground/90'>
								<strong>Did you know?</strong> You only need an account if you want to <strong>post a room or hostel</strong>. If you're just browsing for accommodation, no account is required!
							</p>
						</div>
					</div>
				</div>

				<div className='relative z-10 text-primary-foreground/60 text-sm'>
					&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
				</div>
			</div>

			{/* Right Side: Form */}
			<div className='flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 overflow-y-auto'>
				<div className='mx-auto w-full max-w-md my-auto'>
					{/* Mobile Header / Branding */}
					<div className='lg:hidden flex flex-col items-center mb-8'>
						<Link to='/' className='flex items-center gap-2 mb-6'>
							<span className='text-2xl font-black text-foreground tracking-tight'>
								{APP_NAME}
							</span>
						</Link>

						<div className='flex items-start gap-3 bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100 mb-4'>
							<Info className='w-5 h-5 shrink-0 mt-0.5' />
							<p className='text-sm leading-relaxed'>
								You only need an account if you want to <strong>post a room</strong>. Browsing is completely free!
							</p>
						</div>
					</div>

					<div className='text-center lg:text-left mb-8'>
						<h2 className='text-3xl font-bold tracking-tight text-foreground mb-2'>
							Create an account
						</h2>
						<p className='text-muted-foreground'>
							Fill in your details below to get started.
						</p>
					</div>

					<form onSubmit={handleSignup} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='fullName'>Full Name</Label>
							<Input
								id='fullName'
								placeholder='John Doe'
								value={formData.fullName}
								onChange={handleChange}
								required
								className='rounded-full h-11'
							/>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email Address</Label>
								<Input
									id='email'
									type='email'
									placeholder='name@example.com'
									value={formData.email}
									onChange={handleChange}
									required
									className='rounded-full h-11'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='phone'>Phone Number</Label>
								<Input
									id='phone'
									type='tel'
									placeholder='08012345678'
									value={formData.phone}
									onChange={handleChange}
									required
									className='rounded-full h-11'
								/>
							</div>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='role'>I am a...</Label>
							<Select value={formData.role} onValueChange={handleRoleChange} required>
								<SelectTrigger className='rounded-full h-11!'>
									<SelectValue placeholder='Select your role' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='Agent'>Agent</SelectItem>
									<SelectItem value='Landlord'>Landlord</SelectItem>
									<SelectItem value='Student'>Student</SelectItem>
									<SelectItem value='Others'>Others</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								type='password'
								placeholder='Create a secure password'
								value={formData.password}
								onChange={handleChange}
								required
								className='rounded-full h-11'
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='confirmPassword'>Confirm Password</Label>
							<Input
								id='confirmPassword'
								type='password'
								placeholder='Confirm your password'
								value={formData.confirmPassword}
								onChange={handleChange}
								required
								className='rounded-full h-11'
							/>
						</div>

						{error && (
							<p className='text-sm font-medium text-destructive text-center mt-2'>
								{error}
							</p>
						)}

						<Button
							type='submit'
							className='w-full rounded-full h-11 font-bold mt-4 transition-all'
							disabled={isLoading}
						>
							{isLoading ? (
								<>
									<Loader2 className='w-5 h-5 mr-2 animate-spin' />
									Creating account...
								</>
							) : (
								"Create Account"
							)}
						</Button>
					</form>

					<div className='mt-8 text-center text-sm text-muted-foreground'>
						Already have an account?{" "}
						<Link
							to='/login'
							className='font-bold text-primary hover:underline'
						>
							Sign in
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
