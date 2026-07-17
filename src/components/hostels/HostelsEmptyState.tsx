/** @format */

import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HostelsEmptyState({ onReset }: { onReset: () => void }) {
	return (
		<div className='col-span-full flex flex-col items-center justify-center py-20 text-center px-4'>
			<div className='mb-6 flex size-20 items-center justify-center rounded-full bg-secondary/50'>
				<SearchX className='size-10 text-muted-foreground' />
			</div>
			<h3 className='mb-2 text-2xl font-bold tracking-tight text-foreground'>
				No hostels found
			</h3>
			<p className='mb-8 max-w-sm text-base text-muted-foreground'>
				We couldn't find any hostels matching your current filters. Try adjusting your search criteria or resetting filters.
			</p>
			<Button
				variant='default'
				onClick={onReset}
				className='min-h-12 rounded-full px-8 font-semibold shadow-sm'
			>
				Reset all filters
			</Button>
		</div>
	);
}
