/** @format */

import { HostelCard } from "./HostelCard";
import type { Hostel } from "@/lib/types";
import { RECENT_HOSTELS } from "@/lib/mock_data";

export function SimilarHostels({ currentHostel }: { currentHostel: Hostel }) {
	// Simple mock logic: get hostels of same location or type, exclude current
	const similarHostels = RECENT_HOSTELS.filter(
		(h) =>
			h.id !== currentHostel.id &&
			(h.location === currentHostel.location || h.type === currentHostel.type)
	).slice(0, 4);

	if (similarHostels.length === 0) return null;

	return (
		<section className='pt-12'>
			<h2 className='text-2xl font-bold text-foreground mb-6'>
				Similar Hostels
			</h2>
			<div className='grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-5'>
				{similarHostels.map((hostel) => (
					<HostelCard key={hostel.id} hostel={hostel} />
				))}
			</div>
		</section>
	);
}
