/** @format */

import { BadgeCheck, ArrowRight, Building } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/*
 * BACKEND INTEGRATION NOTE:
 * The 'Find Hostel' button will route to the search page. The PHP backend should expect
 * a GET request on the search endpoint (e.g., /api/hostels?search=...) with filters.
 * The 'Post Hostel' button routes to the login/dashboard. The backend will need to secure
 * the POST /api/hostels endpoint so only authenticated owners can create listings.
 */

/**
 * Hero Component
 *
 * This is the very first section the user sees when they land on the homepage.
 * It contains a background image with an overlay, a large call-to-action headline,
 * and two primary buttons for navigating to the search page or the login/post page.
 */
export default function Hero() {
	return (
		<section className='relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden'>
			{/* Background Image / Overlay Section
			 * Sets a fixed background image with a dark backdrop-blur overlay to ensure
			 * the text remains readable regardless of the image content.
			 */}
			<div className='absolute inset-0 z-0'>
				<img
					src='https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop'
					alt='Hostel background'
					className='w-full h-full object-cover object-center'
				/>
				<div className='absolute inset-0 bg-background/80 dark:bg-background/90 backdrop-blur-[2px]' />
				<div className='absolute inset-0 bg-linear-to-b from-transparent to-background/90' />
			</div>

			{/* Main Content Container
			 * Centered relative container that holds the badge, headline, description,
			 * and the call-to-action buttons. It uses z-10 to sit above the background.
			 */}
			<div className='relative z-10 container px-4 md:px-6 flex flex-col items-center text-center gap-4 max-w-4xl mx-auto py-20'>
				{/* Verification Badge
				 * A small animated badge at the top to build trust with the user immediately.
				 */}
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
				{/* Primary Headline */}{" "}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className='text-5xl font-black text-foreground md:text-7xl lg:text-8xl'
				>
					Find Your Perfect <span className='text-primary'>Hostel</span>
				</motion.h1>
				{/* Subheadline/Description */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className='text-muted-foreground text-md md:text-lg font-medium max-w-2xl leading-relaxed'
				>
					Browse through verified hostels and accomodations, find
					roommates, and connect with trusted agents instantly. Your
					comfort is our priority.
				</motion.p>
				{/* Call to Action Buttons
				 * Two primary actions: Find a Hostel (navigates to /hostels search)
				 * and Post Hostel (navigates to /login to create an account/listing).
				 */}
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
						<Link
							to='/hostels'
							className={cn(
								buttonVariants({ variant: "default", size: "lg" }),
								"font-bold px-10 py-7 flex items-center justify-center gap-3 w-full sm:w-auto text-lg rounded-full",
							)}
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
						</Link>
					</motion.div>

					<motion.div
						whileTap={{ scale: 0.96 }}
						whileHover={{ scale: 1.02 }}
						className='w-full sm:w-auto'
					>
						<Link
							to='/login'
							className={cn(
								buttonVariants({ variant: "outline", size: "lg" }),
								"font-bold px-10 py-7 w-full sm:w-auto text-lg rounded-full border-primary flex items-center justify-center gap-2",
							)}
						>
							<Building className='w-5 h-5 text-muted-foreground' />
							Post Hostel
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
