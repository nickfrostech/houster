/** @format */

import { BadgeCheck, ArrowRight, Building } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/*
 * BACKEND INTEGRATION NOTE:
 * The 'Find Hostel' button will route to the search page. The PHP backend should expect
 * a GET request on the search endpoint (e.g., /api/hostels?search=...) with filters.
 * The 'Post Hostel' button routes to the login/dashboard. The backend will need to secure
 * the POST /api/hostels endpoint so only authenticated owners can create listings.
 */

export default function Hero() {
	return (
		<section className='relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden'>
			{/* Background Image / Overlay */}
			<div className='absolute inset-0 z-0'>
				<img
					src='https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop'
					alt='Hostel background'
					className='w-full h-full object-cover object-center'
				/>
				<div className='absolute inset-0 bg-background/80 dark:bg-background/90 backdrop-blur-[2px]' />
				<div className='absolute inset-0 bg-linear-to-b from-transparent to-background/90' />
			</div>

			<div className='relative z-10 container px-4 md:px-6 flex flex-col items-center text-center gap-4 max-w-4xl mx-auto py-20'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Badge
						variant='outline'
						className='gap-2 py-4 px-4 text-primary font-bold bg-background/50 backdrop-blur-md border-primary/30'
					>
						<BadgeCheck className='text-primary' />
						<span className='text-primary'>
							Verified Hostels & Agents
						</span>
					</Badge>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className='text-5xl font-black text-foreground md:text-7xl lg:text-8xl'
				>
					Find Your Perfect <span className='text-primary'>Hostel</span>
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className='text-muted-foreground text-md md:text-lg font-medium max-w-2xl leading-relaxed'
				>
					Browse through verified hostels and accomodations, find roommates, and connect with
					trusted agents instantly. Your comfort is our priority.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className='flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto items-center justify-center'
				>
					<motion.div
						whileTap={{ scale: 0.96 }}
						whileHover={{ scale: 1.02 }}
						className='w-full sm:w-auto'
					>
						<Button
							variant='default'
							size='lg'
							className='font-bold px-10 py-7 flex items-center justify-center gap-3 w-full sm:w-auto text-lg rounded-full shadow-md shadow-primary/25'
						>
							<motion.span
								className='flex'
								animate={{ x: [0, 5, 0] }}
								transition={{
									repeat: Infinity,
									duration: 1.5,
									ease: "easeInOut",
								}}
							>
								<ArrowRight className='w-5 h-5' />
							</motion.span>
							Find Hostel
						</Button>
					</motion.div>

					<motion.div
						whileTap={{ scale: 0.96 }}
						whileHover={{ scale: 1.02 }}
						className='w-full sm:w-auto'
					>
						<Button
							variant='outline'
							size='lg'
							className='font-bold px-10 py-7 w-full sm:w-auto text-lg rounded-full border-primary shadow-md shadow-secondary/25'
						>
							<a
								href='/login'
								className='flex items-center justify-center gap-2'
							>
								<Building className='w-5 h-5 text-muted-foreground' />
								Post Hostel
							</a>
						</Button>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
