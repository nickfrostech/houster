/** @format */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";

import type { Hostel } from "@/lib/types";
import { RECENT_HOSTELS } from "@/lib/mock_data";

import { HostelImageGallery } from "@/components/hostels/HostelImageGallery";
import { HostelInfoSection } from "@/components/hostels/HostelInfoSection";
import { HostelSidebar } from "@/components/hostels/HostelSidebar";
import { SimilarHostels } from "@/components/hostels/SimilarHostels";
import { Button } from "@/components/ui/button";

export function HostelDetailsPage() {
	const { id } = useParams<{ id: string }>();
	const [hostel, setHostel] = useState<Hostel | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Mock API fetch
		setLoading(true);
		const timer = setTimeout(() => {
			const found = RECENT_HOSTELS.find((h) => h.id === id);
			setHostel(found || null);
			setLoading(false);
		}, 500);

		return () => clearTimeout(timer);
	}, [id]);

	if (loading) {
		return (
			<div className='min-h-[60vh] flex items-center justify-center'>
				<Loader2 className='w-10 h-10 animate-spin text-primary' />
			</div>
		);
	}

	if (!hostel) {
		return (
			<div className='min-h-[60vh] flex flex-col items-center justify-center text-center px-4'>
				<h2 className='text-2xl font-bold mb-2 text-foreground'>
					Hostel Not Found
				</h2>
				<p className='text-muted-foreground mb-6 max-w-md'>
					The hostel you're looking for doesn't exist or has been removed.
				</p>
				<Button className='rounded-full px-8'>
					<Link to='/hostels'>Browse other hostels</Link>
				</Button>
			</div>
		);
	}

	const displayImages = hostel.images && hostel.images.length > 0 
		? hostel.images 
		: [hostel.image];

	return (
		<main className='min-h-screen bg-secondary/10 pb-16'>
			{/* Breadcrumb / Back button */}
			<div className='bg-background border-b'>
				<div className='max-w-7xl mx-auto px-4 md:px-6 py-4'>
					<Link
						to='/hostels'
						className='inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
					>
						<ArrowLeft className='w-4 h-4' />
						Back to Hostels
					</Link>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 md:px-6 mt-6'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
					{/* Left Column (Images + Info) */}
					<div className='lg:col-span-2 flex flex-col gap-8'>
						<div className='bg-background rounded-3xl p-4 md:p-6 border shadow-sm'>
							<HostelImageGallery images={displayImages} video={hostel.video} title={hostel.title} />
						</div>

						<div className='bg-background rounded-3xl p-6 md:p-8 border shadow-sm'>
							<HostelInfoSection hostel={hostel} />
						</div>
					</div>

					{/* Right Column (Sidebar) */}
					<div className='lg:col-span-1'>
						<HostelSidebar hostel={hostel} />
					</div>
				</div>

				<div className='mt-8 border-t pt-8'>
					<SimilarHostels currentHostel={hostel} />
				</div>
			</div>
		</main>
	);
}
