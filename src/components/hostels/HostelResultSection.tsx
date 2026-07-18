/** @format */

"use client";

import { useEffect, useRef } from "react";
import { AlertCircle, Home, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Hostel } from "@/lib/types";
import { HostelCard } from "./HostelCard";
import { HostelsEmptyState } from "./HostelsEmptyState";

export type HostelsResultsSectionProps = {
	Hostels: Hostel[];
	visibleHostels: Hostel[];
	loading: boolean;
	error: string | null;
	hasMore: boolean;
	remaining: number;
	onLoadMore: () => void;
	onRetry: () => void;
	onResetFilters: () => void;
};

/**
 * HostelsResultsSection Component
 * 
 * Displays the grid of available hostels based on the current filters.
 * Implements infinite scrolling using IntersectionObserver to fetch more results.
 */
export function HostelsResultsSection({
	Hostels,
	visibleHostels,
	loading,
	error,
	hasMore,
	onLoadMore,
	onRetry,
	onResetFilters,
}: HostelsResultsSectionProps) {
	const observerTarget = useRef<HTMLDivElement>(null);

	// Infinite Scroll Logic
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loading) {
					onLoadMore();
				}
			},
			{ threshold: 0.1, rootMargin: "100px" }
		);

		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}

		return () => observer.disconnect();
	}, [hasMore, loading, onLoadMore]);

	return (
		<section
			id='Hostels'
			className='mx-auto max-w-7xl px-4 py-10 md:py-16 lg:px-20'
		>
			<div className='mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-center sm:justify-between'>
				<h2 className='text-2xl font-bold tracking-tight text-foreground md:text-3xl'>
					Available Hostels
				</h2>
				{!loading && !error && Hostels.length > 0 ? (
					<Badge variant='secondary' className='w-fit text-sm font-medium px-3 py-1'>
						<span className='hidden sm:inline'>
							{visibleHostels.length === Hostels.length
								? "Showing all "
								: `Showing ${visibleHostels.length} of `}
						</span>
						<span className='sm:hidden'>
							{visibleHostels.length < Hostels.length
								? `${visibleHostels.length}/`
								: ""}
						</span>
						{Hostels.length} {Hostels.length === 1 ? "hostel" : "hostels"}
					</Badge>
				) : null}
			</div>

			{loading && Hostels.length === 0 ? (
				<div className='flex flex-col items-center justify-center gap-4 py-24'>
					<Loader2 className='size-10 animate-spin text-primary' />
				</div>
			) : null}

			{error && !loading ? (
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					className='flex flex-col items-center justify-center gap-4 py-24'
				>
					<div className='flex size-16 items-center justify-center rounded-full bg-destructive/10'>
						<AlertCircle className='size-7 text-destructive' />
					</div>
					<p className='font-semibold text-foreground/70'>{error}</p>
					<div className='flex gap-3 justify-center flex-wrap'>
						<Button
							onClick={onRetry}
							variant='default'
							className='inline-flex items-center gap-2 px-5 py-6 rounded-xl font-bold'
						>
							Try again
						</Button>

						<Link
							to='/'
							className={cn(
								buttonVariants({ variant: "secondary" }),
								"inline-flex items-center gap-2 px-5 py-6 rounded-xl font-bold"
							)}
						>
							<Home className='w-4 h-4' />
							Back to Home
						</Link>
					</div>
				</motion.div>
			) : null}

			{!error && (Hostels.length > 0 || !loading) ? (
				<>
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						<AnimatePresence mode='popLayout'>
							{Hostels.length > 0 ? (
								visibleHostels.map((hostel) => (
									<HostelCard
										key={hostel.id}
										hostel={hostel}
									/>
								))
							) : (
								<HostelsEmptyState onReset={onResetFilters} />
							)}
						</AnimatePresence>
					</div>

					{/* Infinite Scroll Trigger */}
					{Hostels.length > 0 && hasMore && (
						<div 
							ref={observerTarget} 
							className='mt-10 flex justify-center py-8 w-full'
						>
							<Loader2 className="w-8 h-8 animate-spin text-primary/50" />
						</div>
					)}
				</>
			) : null}
		</section>
	);
}
