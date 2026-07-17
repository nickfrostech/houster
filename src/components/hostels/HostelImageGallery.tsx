/** @format */

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Camera, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MediaItem = { type: 'image' | 'video', url: string };

export function HostelImageGallery({
	images,
	video,
	title,
}: {
	images: string[];
	video?: string;
	title: string;
}) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const mediaItems = useMemo<MediaItem[]>(() => {
		const items: MediaItem[] = [];
		if (video) {
			items.push({ type: 'video', url: video });
		}
		if (images && images.length > 0) {
			items.push(...images.map((url) => ({ type: 'image' as const, url })));
		}
		return items;
	}, [images, video]);

	if (mediaItems.length === 0) return null;

	const handleNext = () => {
		setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
	};

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
	};

	const currentMedia = mediaItems[currentIndex];

	return (
		<div className='flex flex-col gap-4'>
			{/* Main Media */}
			<div className='relative w-full aspect-4/3 sm:aspect-video rounded-2xl overflow-hidden bg-black group flex items-center justify-center'>
				{/* Image Counter Badge */}
				<div className='absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-2'>
					<Camera className='w-4 h-4' />
					{currentIndex + 1} / {mediaItems.length}
				</div>

				{currentMedia.type === "video" ? (
					<video
						src={currentMedia.url}
						controls
						muted
						className='w-full h-full object-contain'
					/>
				) : (
					<img
						src={currentMedia.url}
						alt={`${title} - view ${currentIndex + 1}`}
						className='w-full h-full object-cover transition-transform duration-500'
					/>
				)}

				{/* Navigation Arrows */}
				{mediaItems.length > 1 && (
					<>
						<Button
							variant='secondary'
							size='icon'
							className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 shadow-md'
							onClick={handlePrev}
						>
							<ChevronLeft className='w-5 h-5' />
						</Button>
						<Button
							variant='secondary'
							size='icon'
							className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 shadow-md'
							onClick={handleNext}
						>
							<ChevronRight className='w-5 h-5' />
						</Button>
					</>
				)}
			</div>

			{/* Thumbnails */}
			{mediaItems.length > 1 && (
				<div className='flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar'>
					{mediaItems.map((media, idx) => (
						<button
							key={idx}
							onClick={() => setCurrentIndex(idx)}
							className={cn(
								"relative shrink-0 w-24 aspect-video rounded-xl overflow-hidden snap-start transition-all cursor-pointer bg-black",
								currentIndex === idx
									? "ring-2 ring-primary ring-offset-2 ring-offset-background"
									: "opacity-60 hover:opacity-100",
							)}
						>
							{media.type === "video" ? (
								<>
									<video
										src={media.url}
										className='w-full h-full object-cover'
										muted
									/>
									<div className='absolute inset-0 flex items-center justify-center bg-black/30'>
										<PlayCircle className='w-8 h-8 text-white/80' />
									</div>
								</>
							) : (
								<img
									src={media.url}
									alt={`Thumbnail ${idx + 1}`}
									className='w-full h-full object-cover'
								/>
							)}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
