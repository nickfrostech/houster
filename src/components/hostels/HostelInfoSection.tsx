/** @format */

import { useState } from "react";
import { Copy, Check, Eye, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Hostel } from "@/lib/types";

export function HostelInfoSection({ hostel }: { hostel: Hostel }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className='flex flex-col gap-8'>
			{/* Header Section */}
			<div className='flex flex-col gap-3'>
				<div className='flex items-start justify-between gap-4'>
					<h1 className='text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight'>
						{hostel.title}
					</h1>
					<div className='flex gap-2 shrink-0'>
						<Button variant='ghost' size='icon' className='rounded-full' onClick={handleCopy}>
							{copied ? <Check className='w-5 h-5 text-green-600' /> : <Copy className='w-5 h-5 text-muted-foreground' />}
						</Button>
					</div>
				</div>

				<div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground font-medium'>
					<div className='flex items-center gap-1.5'>
						<MapPin className='w-4 h-4' />
						{hostel.location} Campus
					</div>
					<div className='w-1 h-1 rounded-full bg-border' />
					<div>Posted {hostel.postedAt || "Recently"}</div>
					<div className='w-1 h-1 rounded-full bg-border' />
					<div className='flex items-center gap-1.5'>
						<Eye className='w-4 h-4' />
						{hostel.views || 0} views
					</div>
				</div>
			</div>

			{/* Attributes Grid */}
			<div className='grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 py-6 border-y border-border/50'>
				<div>
					<div className='text-sm text-muted-foreground mb-1'>Price</div>
					<div className='font-bold text-foreground'>{hostel.price} / {hostel.period}</div>
				</div>
				<div>
					<div className='text-sm text-muted-foreground mb-1'>Type</div>
					<div className='font-bold text-foreground'>{hostel.type}</div>
				</div>
				<div>
					<div className='text-sm text-muted-foreground mb-1'>Units Available</div>
					<div className='font-bold text-foreground'>{hostel.unitsAvailable ?? 1} Units</div>
				</div>
				<div>
					<div className='text-sm text-muted-foreground mb-1'>Negotiable</div>
					<div className='font-bold text-foreground'>
						{hostel.negotiable ? "Yes" : "No"}
					</div>
				</div>
				<div>
					<div className='text-sm text-muted-foreground mb-1'>Location</div>
					<div className='font-bold text-foreground'>{hostel.location}</div>
				</div>
				<div>
					<div className='text-sm text-muted-foreground mb-1'>Status</div>
					<div className='font-bold text-foreground'>
						Available
					</div>
				</div>
			</div>

			{/* Description */}
			<div>
				<h3 className='text-xl font-bold mb-3'>Description</h3>
				
				{/* Location Sentence */}
				{(hostel.distanceToSchool || hostel.closestLandmark) && (
					<p className='text-primary font-medium mb-3'>
						Located {hostel.distanceToSchool || "a short distance"} from school and close to {hostel.closestLandmark || "key areas"}.
					</p>
				)}

				<p className='text-muted-foreground leading-relaxed whitespace-pre-wrap text-base sm:text-lg'>
					{hostel.description}
				</p>
			</div>

			{/* Facilities */}
			{hostel.facilities && hostel.facilities.length > 0 && (
				<div className='pt-2'>
					<h3 className='text-xl font-bold mb-4'>Facilities & Amenities</h3>
					<div className='flex flex-wrap gap-2'>
						{hostel.facilities.map((facility, idx) => (
							<Badge key={idx} variant='secondary' className='px-3 py-1.5 text-sm font-medium'>
								{facility}
							</Badge>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
