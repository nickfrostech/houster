/** @format */

import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import type { Hostel } from "@/lib/types";

export function HostelCard({ hostel }: { hostel: Hostel }) {
	return (
		<Link to={`/hostels/${hostel.id}`} className='block group h-full'>
			<motion.div
				whileHover={{ y: -4 }}
				className='bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col'
			>
				<div className='relative aspect-video overflow-hidden bg-muted'>
					<img
						src={hostel.image}
						alt={hostel.title}
						className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
					/>
					<div className='absolute top-3 left-3 flex gap-2 flex-wrap'>
						<Badge
							variant='secondary'
							className='bg-background/90 backdrop-blur-sm text-foreground font-semibold shadow-sm rounded-md px-2 py-1'
						>
							{/* <Home className='w-3 h-3 mr-1.5' /> */}
							{hostel.type}
						</Badge>
					</div>
					{hostel.negotiable && (
						<div className='absolute top-3 right-3'>
							<Badge className='bg-green-500/90 hover:bg-green-600/90 text-white backdrop-blur-sm shadow-sm border-none rounded-md px-2 py-1'>
								Negotiable
							</Badge>
						</div>
					)}
				</div>
				<div className='p-4 flex flex-col grow'>
					<div className='flex items-start justify-between gap-2 mb-1.5'>
						<h3 className='font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors'>
							{hostel.title}
						</h3>
					</div>
					<div className='flex items-center text-muted-foreground text-xs mb-3 font-medium'>
						<MapPin className='w-3.5 h-3.5 mr-1 text-primary shrink-0' />
						<span className='truncate'>{hostel.location} Campus</span>
					</div>
					<p className='text-muted-foreground text-sm line-clamp-2 mb-4 grow leading-relaxed'>
						{hostel.description}
					</p>
					<div className='mt-auto pt-4 border-t border-border/60 flex items-center justify-between'>
						<div className='flex flex-col'>
							<span className='text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-0.5'>
								Rent
							</span>
							<div className='flex items-baseline gap-1'>
								<span className='text-lg font-black text-primary'>
									{hostel.price}
								</span>
								<span className='text-xs text-muted-foreground font-medium'>
									/{hostel.period}
								</span>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</Link>
	);
}
