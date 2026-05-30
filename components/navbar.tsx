/** @format */

"use client";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useAuth } from "@/lib/auth";
import { GraduationCap, LogOut, Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
	const { user, profile, signOut } = useAuth();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<nav className='border-b bg-background sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16'>
					<div className='flex'>
						<Link
							href='/'
							className='flex-shrink-0 flex items-center gap-2'
						>
							<GraduationCap className='h-8 w-8 text-primary' />
							<span className='font-bold text-xl tracking-tight text-primary'>
								Hostelly
							</span>
						</Link>
					</div>
					<div className='hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4'>
						{!user ? (
							<>
								<Link href='/login' className={buttonVariants({ variant: 'ghost' })}>
									Login
								</Link>
								<Link href='/register' className={buttonVariants()}>
									Apply Now
								</Link>
							</>
						) : (
							<>
								<span className='text-sm font-medium text-muted-foreground mr-4'>
									Hi, {profile?.full_name?.split(" ")[0]}
								</span>
								<Link
									className={buttonVariants({ variant: 'ghost' })}
									href={
										profile?.role === "admin"
											? "/admin"
											: "/student"
									}
								>
									Dashboard
								</Link>
								<Button
									variant='destructive'
									size='sm'
									onClick={() => signOut()}
								>
									<LogOut className='h-4 w-4 mr-2' />
									Logout
								</Button>
							</>
						)}
					</div>
					<div className='-mr-2 flex items-center sm:hidden'>
						<Button
							variant='ghost'
							size='icon'
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							<Menu className='h-6 w-6' />
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{mobileMenuOpen && (
				<div className='sm:hidden border-t'>
					<div className='pt-2 pb-3 space-y-1'>
						{!user ? (
							<>
								<Link
									href='/login'
									className='block px-4 py-2 text-base font-medium hover:bg-muted'
								>
									Login
								</Link>
								<Link
									href='/register'
									className='block px-4 py-2 text-base font-medium text-primary hover:bg-muted'
								>
									Apply Now
								</Link>
							</>
						) : (
							<>
								<Link
									href={
										profile?.role === "admin" ? "/admin" : "/student"
									}
									className='block px-4 py-2 text-base font-medium hover:bg-muted'
								>
									Dashboard
								</Link>
								<button
									onClick={() => signOut()}
									className='block w-full text-left px-4 py-2 text-base font-medium text-destructive hover:bg-muted'
								>
									Logout
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</nav>
	);
}
