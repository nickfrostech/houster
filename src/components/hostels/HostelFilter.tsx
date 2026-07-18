/** @format */

"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { HostelFilterFields } from "./HostelFilterFields";
import type { HostelFilters } from "@/lib/filter-schema";

export type HostelFiltersMobileDrawerProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	filters: HostelFilters;
	updateFilter: (key: keyof HostelFilters, value: string | null) => void;
	hasActiveFilters: boolean;
	onReset: () => void;
};

/**
 * HostelFilter (Mobile Drawer) Component
 * 
 * Renders the filter options inside a slide-up drawer (Dialog) for mobile devices.
 * Reuses the `HostelFilterFields` component internally to maintain DRY code.
 */
export function HostelFilter({
	open,
	onOpenChange,
	filters,
	updateFilter,
	onReset,
}: HostelFiltersMobileDrawerProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange} modal={false}>
			<DialogContent
				className={cn(
					"p-0 gap-0",
					"flex max-h-[96svh] flex-col h-max overflow-hidden",
					"sm:max-w-lg w-11/12 rounded-4xl",
				)}
			>
				<DialogHeader className='shrink-0 px-5 pt-5 pb-4 text-left border-b border-border/50'>
					<DialogTitle className='text-xl font-bold tracking-tight'>
						More Filters
					</DialogTitle>
				</DialogHeader>

				{/* Scrollable Filter Fields Container */}
				<div className='min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6'>
					<HostelFilterFields
						layout='drawer'
						filters={filters}
						updateFilter={updateFilter}
					/>
				</div>

				{/* Sticky Footer Action Buttons */}
				<DialogFooter className='shrink-0 px-8 pt-4 pb-[max(1.8rem,env(safe-area-inset-bottom))] border-t border-border/50 flex-row justify-between gap-3'>
					<div className='w-full flex flex-wrap-reverse justify-center items-center gap-3'>
						<Button
							variant='destructive'
							type='button'
							className='h-11 font-semibold rounded-full flex-1'
							onClick={onReset}
						>
							Clear all
						</Button>
						<DialogClose className='flex-1'>
							<Button
								type='button'
								className='h-11 font-bold rounded-full w-full'
							>
								Apply Filters
							</Button>
						</DialogClose>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
