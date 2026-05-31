/** @format */

"use client";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { Building, CheckCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function Home() {
	const { user, profile, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && user && profile) {
			router.push(profile.role === "admin" ? "/admin" : "/student");
		}
	}, [user, profile, loading, router]);

	if (loading) return null;

	return (
		<div className='flex flex-col min-h-screen border-t-4 border-primary'>
			<Navbar />
			<main className='flex-1'>
				{/* Hero Section */}
				<section className='py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center'>
					<Badge
						className='mb-8 px-4 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 border-primary/20'
						variant='outline'
					>
						University Portal 2024/2025
					</Badge>
					<h1 className='text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-8 max-w-4xl leading-tight'>
						Modern Hostel Bed Space <br />
						<span className='text-primary'>Management System</span>
					</h1>
					<p className='text-xl text-muted-foreground max-w-2xl mb-12'>
						Streamline your campus accommodation process. Apply for hostel
						bed spaces seamlessly, without the hassle of long queues.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
						<Link 
							href='/register'
							className='inline-flex group/button shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-lg font-medium whitespace-nowrap transition-all outline-none select-none bg-primary text-primary-foreground hover:bg-primary/80 h-14 w-full sm:w-auto px-8'
						>
							Student Application
						</Link>
						<Link 
							href='/login'
							className='inline-flex group/button shrink-0 items-center justify-center rounded-xl border border-border bg-background bg-clip-padding text-lg font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground h-14 w-full sm:w-auto px-8'
						>
							Admin Portal
						</Link>
					</div>
				</section>

				{/* Features Section */}
				<section className='py-24 bg-muted/30 border-y'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							<div className='bg-background p-8 rounded-2xl shadow-sm border'>
								<div className='h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6'>
									<Building className='h-7 w-7 text-primary' />
								</div>
								<h3 className='text-xl font-bold mb-3'>
									Digital Allocation
								</h3>
								<p className='text-muted-foreground leading-relaxed'>
									Automated tracking and transparent bed space
									distribution across all campus hostels.
								</p>
							</div>
							<div className='bg-background p-8 rounded-2xl shadow-sm border'>
								<div className='h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6'>
									<CheckCircle className='h-7 w-7 text-primary' />
								</div>
								<h3 className='text-xl font-bold mb-3'>
									Instant Updates
								</h3>
								<p className='text-muted-foreground leading-relaxed'>
									Receive clear status updates on your allocation
									without visiting the student affairs office.
								</p>
							</div>
							<div className='bg-background p-8 rounded-2xl shadow-sm border'>
								<div className='h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6'>
									<ShieldCheck className='h-7 w-7 text-primary' />
								</div>
								<h3 className='text-xl font-bold mb-3'>
									Secure & Verified
								</h3>
								<p className='text-muted-foreground leading-relaxed'>
									Integrated with university matriculation records
									ensuring only eligible students apply.
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className='py-8 text-center text-muted-foreground text-sm border-t'>
				<p>
					&copy; {new Date().getFullYear()} Hostelly (Final Year Project).
					All rights reserved.
				</p>
			</footer>
		</div>
	);
}
