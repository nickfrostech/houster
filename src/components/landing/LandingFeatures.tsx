import { motion } from "motion/react";
import { ShieldCheck, MessageSquare, Search } from "lucide-react";

const FEATURES = [
	{
		icon: ShieldCheck,
		title: "100% Verified Listings",
		description:
			"We verify every hostel and agent to ensure you get exactly what you see and avoid scams.",
	},
	{
		icon: MessageSquare,
		title: "Direct Communication",
		description:
			"Chat or call agents and owners directly. No middle-men, no hidden fees, just direct connection.",
	},
	{
		icon: Search,
		title: "Smart Filtering",
		description:
			"Filter by campus, price range, accommodation type, and amenities to find your perfect match in seconds.",
	},
];

export function LandingFeatures() {
	return (
		<section
			id='features'
			className='scroll-mt-24 px-4 py-16 sm:py-20 md:py-24 lg:px-20'
		>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-10 text-center sm:mb-12 md:mb-14'>
					<span className='mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-primary sm:mb-4 sm:text-sm'>
						Why students use Houster
					</span>
					<h2 className='px-2 text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl'>
						Less stress, more comfort.
					</h2>
					<p className='mx-auto mt-4 max-w-xl text-md text-muted-foreground sm:text-lg font-medium'>
						Built for students and renters to easily navigate the housing market around campuses with transparency and trust.
					</p>
				</div>

				<div className='mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 sm:gap-5 md:grid-cols-3 md:gap-5 lg:gap-8'>
					{FEATURES.map(({ icon: Icon, title, description }, index) => (
						<motion.div
							key={title}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{ duration: 0.4, delay: index * 0.08 }}
							className='h-full'
						>
							<div className='group flex h-full flex-col rounded-3xl border border-border/50 bg-background/50 p-6 transition-[border-color,box-shadow,background-color] duration-300 hover:border-primary/35 hover:bg-background hover:shadow-lg sm:p-8'>
								<div className='mb-5 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20 sm:size-16'>
									<Icon
										className='size-7 sm:size-8'
										strokeWidth={2}
									/>
								</div>
								<h3 className='mb-3 text-xl font-bold leading-snug text-foreground'>
									{title}
								</h3>
								<p className='max-w-sm text-base leading-relaxed text-muted-foreground'>
									{description}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
