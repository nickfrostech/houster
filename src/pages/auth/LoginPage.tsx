/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const APP_NAME = import.meta.env.VITE_APP_NAME || "Houster";

export function LoginPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	/*
	 * BACKEND INTEGRATION NOTE: LOGIN
	 * 
	 * Expected API Endpoint: POST /api/auth/login
	 * 
	 * Payload:
	 * {
	 *   "email": "user@example.com",
	 *   "password": "securepassword123"
	 * }
	 * 
	 * Expected Response (Success - 200 OK):
	 * {
	 *   "token": "jwt_token_here",
	 *   "user": {
	 *     "id": 1,
	 *     "name": "John Doe",
	 *     "email": "user@example.com",
	 *     "role": "Agent"
	 *   }
	 * }
	 * 
	 * Expected Error Response (400/401):
	 * {
	 *   "error": "Invalid email or password"
	 * }
	 */
	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// TODO: Replace with actual backend fetch
		// Example:
		// fetch('/api/auth/login', {
		//   method: 'POST',
		//   headers: { 'Content-Type': 'application/json' },
		//   body: JSON.stringify({ email, password })
		// })
		// .then(res => res.json())
		// .then(data => { ... save token, redirect ... })

		// Mocking network delay
		setTimeout(() => {
			setIsLoading(false);
			// After successful login, redirect to dashboard or home
			window.location.href = "/";
		}, 1500);
	};

	return (
		<div className='min-h-screen grid lg:grid-cols-2 bg-background'>
			{/* Left Side: Dynamic Visual / Branding */}
			<div className='hidden lg:flex flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden'>
				{/* Subtle background pattern or gradient */}
				<div className='absolute inset-0 bg-linear-to-br from-primary-foreground/10 to-transparent pointer-events-none' />

				<div className='relative z-10'>
					<Link to='/' className='flex items-center gap-2 mb-12 w-fit'>
						<span className='text-2xl font-black tracking-tight'>
							{APP_NAME}
						</span>
					</Link>

					<div className='max-w-lg'>
						<h1 className='text-5xl font-black leading-tight mb-6'>
							Welcome back to {APP_NAME}
						</h1>
						<p className='text-primary-foreground/80 text-lg leading-relaxed mb-8'>
							Sign in to manage your hostel listings, respond to inquiries, and connect with students looking for accommodation.
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
			</div>

			{/* Right Side: Form */}
			<div className='flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24'>
				<div className='mx-auto w-full max-w-md'>
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
								You only need an account if you want to <strong>post a room</strong>. Browsing is completely free and open!
							</p>
						</div>
					</div>

					<div className='text-center lg:text-left mb-8'>
						<h2 className='text-3xl font-bold tracking-tight text-foreground mb-2'>
							Sign in
						</h2>
						<p className='text-muted-foreground'>
							Enter your credentials to access your account
						</p>
					</div>

					<form onSubmit={handleLogin} className='space-y-5'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email address</Label>
							<Input
								id='email'
								type='email'
								placeholder='name@example.com'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className='rounded-full h-11'
							/>
						</div>

						<div className='space-y-2'>
							<div className='flex items-center justify-between'>
								<Label htmlFor='password'>Password</Label>
								<Link
									to='/forgot-password'
									className='text-sm font-medium text-primary hover:underline'
								>
									Forgot password?
								</Link>
							</div>
							<Input
								id='password'
								type='password'
								placeholder='••••••••'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className='rounded-full h-11'
							/>
						</div>

						<Button
							type='submit'
							className='w-full rounded-full font-bold mt-2 transition-all h-11'
							disabled={isLoading}
						>
							{isLoading ? (
								<>
									<Loader2 className='w-5 h-5 mr-2 animate-spin' />
									Signing in...
								</>
							) : (
								"Sign in"
							)}
						</Button>
					</form>

					<div className='mt-8 text-center text-sm text-muted-foreground'>
						Don't have an account?{" "}
						<Link
							to='/signup'
							className='font-bold text-primary hover:underline'
						>
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
