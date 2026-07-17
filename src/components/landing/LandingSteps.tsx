import { motion } from "motion/react";
import { Search, MessageCircle, Key } from "lucide-react";
import { Link } from "react-router-dom";

/* 
 * BACKEND INTEGRATION NOTE:
 * These steps are currently hardcoded for the landing page. If you ever need them to be dynamic
 * (e.g., from a CMS), the backend should return an array of { iconName, title, description }.
 */

const STEPS = [
	{
		icon: Search,
		title: (<>
			1. <Link to="/hostels" className="text-primary hover:underline">Find a Hostel</Link>
		</>),
		description:
			"Search through our extensive list of verified hostels by location, price, and amenities.",
	},
	{
		icon: MessageCircle,
		title: "2. Contact the Agent",
		description:
			"Connect directly with the hostel owner or trusted agents to arrange a viewing.",
	},
	{
		icon: Key,
		title: "3. Secure Your Space",
		description:
			"Make your payment and get the keys to your new comfort zone instantly.",
	},
];

export function LandingSteps() {
	return (
		<section
			id='how-to-use'
			className='scroll-mt-24 px-4 py-20 sm:py-24 lg:px-20 bg-background'
		>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-10 text-center'>
					<span className='mb-2 block text-sm font-bold uppercase tracking-[0.2em] text-primary'>
						How it works
					</span>
					<h2 className='px-2 text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl'>
						Three steps to your new home
					</h2>
					<p className='mx-auto mt-2 max-w-xl text-lg text-muted-foreground font-medium'>
						Finding a hostel has never been this simple. We guide you from search to move-in.
					</p>
				</div>

				<div className='relative mx-auto max-w-6xl mt-12'>
					{/* Desktop connector */}
					<div className='pointer-events-none absolute top-13 right-0 left-0 hidden md:block'>
						<div className='relative h-0.5'>
							<div className='absolute top-1/2 right-[18%] left-[18%] -translate-y-1/2 border-t-2 border-dashed border-primary/30' />
						</div>
					</div>

					<div className='grid w-full grid-cols-1 items-start gap-12 md:grid-cols-3 md:gap-10 lg:gap-14'>
						{STEPS.map(({ icon: Icon, title, description }, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-48px" }}
								transition={{ duration: 0.45, delay: index * 0.1 }}
								className='group relative flex flex-col items-center text-center'
							>
								{/* Mobile step spine */}
								{index < STEPS.length - 1 && (
									<div
										className='absolute top-25 left-1/2 z-0 h-[calc(100%+2.5rem)] w-px -translate-x-1/2 bg-linear-to-b from-primary/40 via-primary/15 to-transparent md:hidden'
										aria-hidden
									/>
								)}

								<div className='relative z-10 mb-6 flex size-24 shrink-0 items-center justify-center rounded-full border-2 border-primary/40 bg-card text-primary shadow-lg ring-4 ring-primary/5 transition-all duration-300 group-hover:border-primary group-hover:ring-primary/20 group-hover:-translate-y-1 sm:size-26'>
									<Icon
										className='size-10 transition-transform duration-300 group-hover:scale-110 sm:size-11'
										strokeWidth={2}
									/>
								</div>
								<div className='flex flex-col items-center justify-center bg-background rounded-3xl z-10'>
									<h3 className='relative z-10 mb-3 max-w-[16rem] text-xl font-bold text-foreground sm:text-2xl'>
										{title}
									</h3>
									<p className='relative z-10 max-w-xs text-base leading-relaxed text-muted-foreground'>
										{description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
