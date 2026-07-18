/** @format */

import { useState, useEffect } from "react";
import { HostelFilter } from "@/components/hostels/HostelFilter";
import { HostelsResultsSection } from "@/components/hostels/HostelResultSection";
import { useHostelsExplorer } from "@/hooks/use-hostels-explorer";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HostelFilterFields } from "@/components/hostels/HostelFilterFields";
import { motion, AnimatePresence } from "motion/react";

/**
 * HostelPage Component
 *
 * The main search and discovery page for hostels.
 * Connects the search bar, filter sidebar/drawer, and the infinite-scrolling results grid.
 */
export function HostelPage() {
	const {
		hostels,
		loading,
		error,
		setVisibleCount,
		filters,
		updateFilter,
		fetchHostels,
		resetFilters,
		hasActiveFilters,
		visibleHostels,
		hasMore,
		remaining,
		filtersDrawerOpen,
		setFiltersDrawerOpen,
	} = useHostelsExplorer();

	const [isScrolled, setIsScrolled] = useState(false);

	// Listen to scroll events to show/hide the Floating Action Button
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 300);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className='min-h-screen text-foreground'>
			<main>
				<section className='border-b bg-secondary/30 dark:bg-secondary/10'>
					<div className='mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:px-8 md:py-12'>
						{/* Page Header */}
						<div className='space-y-2'>
							<h1 className='text-3xl font-black tracking-tight md:text-5xl'>
								Find your space
							</h1>
							<p className='max-w-2xl text-base text-muted-foreground md:text-lg font-medium'>
								Search and filter through verified hostels around your
								campus.
							</p>
						</div>

						{/* Desktop Filters Bar & Search Input */}
						<div className='flex flex-col md:flex-row gap-3 items-center w-full mt-2'>
							{/* Search Bar */}
							<div className='relative w-full md:max-w-md shrink-0'>
								<Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
								<Input
									className='w-full pl-11 pr-10 h-11 bg-background border-border rounded-full text-base'
									placeholder='Search by name or description...'
									value={filters.searchQuery}
									onChange={(e) =>
										updateFilter("searchQuery", e.target.value)
									}
								/>
								{filters.searchQuery && (
									<button
										onClick={() => updateFilter("searchQuery", "")}
										className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
									>
										<X className='w-4 h-4' />
									</button>
								)}
							</div>

							{/* Desktop Filter Fields */}
							<div className='hidden md:block flex-1'>
								<HostelFilterFields
									layout='desktop'
									filters={filters}
									updateFilter={updateFilter}
								/>
							</div>

							{/* Mobile Filter Trigger Button */}
							<Button
								type='button'
								variant='outline'
								className='relative h-11 w-full md:w-auto shrink-0 rounded-full border-border bg-background px-6 font-semibold gap-2'
								onClick={() => setFiltersDrawerOpen(true)}
							>
								<Filter className='size-4' />
								<span className='md:hidden'>Filters</span>
								<span className='hidden md:inline'>More</span>
								{hasActiveFilters ? (
									<span className='absolute top-2.5 right-2.5 size-2.5 rounded-full bg-primary' />
								) : null}
							</Button>
						</div>
					</div>
				</section>

				{/* Mobile Filter Drawer */}
				<HostelFilter
					open={filtersDrawerOpen}
					onOpenChange={setFiltersDrawerOpen}
					filters={filters}
					updateFilter={updateFilter}
					hasActiveFilters={hasActiveFilters}
					onReset={resetFilters}
				/>

				{/* Results Grid with Infinite Scroll */}
				<HostelsResultsSection
					Hostels={hostels}
					visibleHostels={visibleHostels}
					loading={loading}
					error={error}
					hasMore={hasMore}
					remaining={remaining}
					onLoadMore={() =>
						setVisibleCount((c) => Math.min(c + 8, hostels.length))
					}
					onRetry={fetchHostels}
					onResetFilters={resetFilters}
				/>

				{/* Floating Action Button */}
				<AnimatePresence>
					{isScrolled && (
						<motion.div
							initial={{ opacity: 0, y: -50, scale: 0.8 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -50, scale: 0.8 }}
							className='fixed top-20 right-4 z-40 '
						>
							<Button
								type='button'
								size='icon'
								className='h-11 w-11 sm:h-14 sm:w-14 rounded-full shadow-2xl shadow-primary/20 bg-primary hover:bg-primary/90 border-0 transition-transform hover:scale-105 active:scale-95'
								onClick={() => setFiltersDrawerOpen(true)}
							>
								<Filter className='size-5 sm:size-6 text-primary-foreground' />
								{hasActiveFilters ? (
									<span className='absolute top-2.5 right-2.5 sm:top-3 sm:right-3 size-2.5 sm:size-3 rounded-full bg-destructive border-2 border-primary' />
								) : null}
							</Button>
						</motion.div>
					)}
				</AnimatePresence>
			</main>
		</div>
	);
}
