/** @format */

import { motion } from "motion/react";
import { ArrowRight, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * LandingCTA Component
 * 
 * The final Call-To-Action section at the bottom of the landing page.
 * Uses a vibrant primary background with decorative blur elements and
 * presents two main navigation paths to the user.
 */
export function LandingCTA() {
	return (
		<section className='px-4 lg:px-20 pb-20 md:pb-28 max-w-7xl mx-auto'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.45 }}
				className='relative overflow-hidden rounded-3xl bg-primary px-6 py-6 md:px-12 md:py-16 text-center shadow-xl shadow-primary/20'
			>
				{/* Background decorative elements 
				  * These absolute positioned divs create the glowing orbed effects
				  * on the top-right and bottom-left corners of the CTA card.
				  */}
				<div className='pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-background/15 blur-3xl' />
				<div className='pointer-events-none absolute -bottom-16 -left-16 size-56 rounded-full bg-background/15 blur-2xl' />

				{/* Foreground text content */}
				<div className='relative max-w-2xl mx-auto space-y-6'>
					<h2 className='text-2xl md:text-4xl font-black text-primary-foreground tracking-tight leading-tight'>
						Ready to find your perfect hostel?
					</h2>
					<p className='text-primary-foreground/90 text-lg md:text-xl font-medium'>
						Browse through hundreds of verified listings and secure your
						comfort today. Your new home is just a few clicks away.
					</p>

					{/* Action Buttons 
					  * Similar to the Hero component, directs the user to either
					  * browse hostels or login to post a hostel.
					  */}
					<div className='pt-5 flex flex-col sm:flex-row gap-4 justify-center items-center'>
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
										buttonVariants({ variant: "secondary", size: "lg" }),
										"font-bold px-10 py-7 flex items-center justify-center gap-3 w-full sm:w-auto text-lg rounded-full"
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
										"font-bold px-10 py-7 w-full sm:w-auto text-lg rounded-full bg-transparent text-secondary flex items-center justify-center gap-2"
									)}
								>
									<Building className='w-5 h-5' />
									Post Hostel
								</Link>
							</motion.div>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
