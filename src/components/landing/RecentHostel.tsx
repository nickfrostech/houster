/** @format */

import { HostelCard } from "../hostels/HostelCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { RECENT_HOSTELS } from "@/lib/mock_data";

/*
 * BACKEND INTEGRATION NOTE:
 * This component will fetch the 8 most recent hostels from the database.
 * The endpoint might look like GET /api/hostels?sort=recent&limit=8
 * The PHP backend should return JSON matching the `Hostel` interface.
 */


export function RecentHostel() {
	return (
		<section className='py-20 px-4 md:px-6 lg:px-20 bg-chart-1/10 rounded-4xl'>
			<div className='max-w-7xl mx-auto'>
				<div className='mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4'>
					<div>
						<span className='mb-2 block text-sm font-bold uppercase tracking-[0.2em] text-primary'>
							New Listings
						</span>
						<h2 className='text-3xl font-black text-foreground sm:text-4xl'>
							Recently Added Hostels
						</h2>
						<p className='mt-3 text-muted-foreground text-lg font-medium max-w-2xl'>
							Discover the newest, verified listings around your campus.
							Be the first to secure these spaces!
						</p>
					</div>
					<Link
						to='/hostels'
						className='group flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors w-fit'
					>
						View all hostels
						<ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1' />
					</Link>
				</div>

				{/* Grid Configuration: 1 on <400px, 2 on normal mobile, 3 on md, 4 on lg */}
				<div className='grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
					{RECENT_HOSTELS.map((hostel) => (
						<HostelCard key={hostel.id} hostel={hostel} />
					))}
				</div>

				<div className='flex w-full justify-center pt-5'>
					<Link to='/hostels'>
						<Button variant='default' className='rounded-full px-10 py-5 text-lg'>
							View All Hostels
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
