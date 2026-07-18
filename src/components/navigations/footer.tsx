/** @format */

import { Share2, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const APP_NAME = import.meta.env.VITE_APP_NAME || "Houster";

export default function Footer() {
	return (
		<footer className='py-12 px-4 lg:px-20 mb-16 md:mb-0 bg-chart-1/10'>
			<div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12'>
				<div className='col-span-1 md:col-span-2 flex flex-col gap-6'>
					<Link to='/' className='flex items-center gap-2 text-primary'>
						<h2 className='text-foreground text-xl font-black capitalize tracking-tight'>
							{APP_NAME}
						</h2>
					</Link>
					<p className='text-muted-foreground max-w-sm leading-relaxed font-medium'>
						Helping students and renters find the perfect hostels with
						ease, transparency, and trust.
					</p>
					<div className='flex gap-4'>
						<a
							title={`Share ${APP_NAME}`}
							className='size-10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors border border-border'
							href='#'
						>
							<Share2 className='size-5' />
						</a>
						<a
							title={`Visit ${APP_NAME} website`}
							className='size-10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors border border-border'
							href='#'
						>
							<Globe className='size-5' />
						</a>
					</div>
				</div>

				<div>
					<h4 className='font-bold mb-6 text-foreground text-sm uppercase tracking-wider'>
						Resources
					</h4>
					<ul className='flex flex-col gap-4 text-muted-foreground text-sm font-medium'>
						<li>
							<a
								className='hover:text-primary transition-colors flex items-center gap-2'
								href='#'
							>
								Booking Guide & Tips
							</a>
						</li>
						<li>
							<Link
								className='hover:text-primary transition-colors flex items-center gap-2'
								to='/blog'
							>
								Blog & Updates
							</Link>
						</li>
						<li>
							<Link
								className='hover:text-primary transition-colors flex items-center gap-2'
								to='/faq'
							>
								FAQ
							</Link>
						</li>
						<li>
							<Link
								className='hover:text-primary transition-colors flex items-center gap-2'
								to='/how-to-use'
							>
								How to Use
							</Link>
						</li>
					</ul>
				</div>

				<div>
					<h4 className='font-bold mb-6 text-foreground text-sm uppercase tracking-wider'>
						Legal
					</h4>
					<ul className='flex flex-col gap-4 text-muted-foreground text-sm font-medium'>
						<li>
							<Link
								className='hover:text-primary transition-colors'
								to='/privacy'
							>
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link
								className='hover:text-primary transition-colors'
								to='/terms'
							>
								Terms of Service
							</Link>
						</li>
						<li>
							<Link
								className='hover:text-primary transition-colors'
								to='/contact'
							>
								Contact Us
							</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className='max-w-7xl mx-auto mt-12 pt-8 border-t border-border text-center text-muted-foreground font-medium text-xs'>
				&#169; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
			</div>
		</footer>
	);
}
