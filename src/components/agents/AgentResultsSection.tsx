/** @format */

import { Loader2 } from "lucide-react";
import { AgentCard } from "./AgentCard";
import type { Agent } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface AgentResultsSectionProps {
	agents: Agent[];
	visibleAgents: Agent[];
	loading: boolean;
	error: string | null;
	hasMore: boolean;
	remaining: number;
	onLoadMore: () => void;
	onRetry: () => void;
	onResetFilters: () => void;
}

export function AgentResultsSection({
	agents,
	visibleAgents,
	loading,
	error,
	hasMore,
	remaining,
	onLoadMore,
	onRetry,
	onResetFilters,
}: AgentResultsSectionProps) {
	if (error) {
		return (
			<div className='py-20 text-center px-4'>
				<p className='text-destructive mb-4'>{error}</p>
				<Button onClick={onRetry} variant='outline' className='rounded-full'>
					Try Again
				</Button>
			</div>
		);
	}

	if (loading) {
		return (
			<div className='flex justify-center items-center py-32'>
				<Loader2 className='w-8 h-8 animate-spin text-primary' />
			</div>
		);
	}

	if (agents.length === 0) {
		return (
			<div className='py-32 text-center px-4'>
				<h3 className='text-xl font-bold mb-2'>No agents found</h3>
				<p className='text-muted-foreground mb-6 max-w-sm mx-auto'>
					We couldn't find any agents matching your current filters. Try adjusting your search criteria.
				</p>
				<Button onClick={onResetFilters} variant='outline' className='rounded-full'>
					Reset Filters
				</Button>
			</div>
		);
	}

	return (
		<section className='mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12'>
			<div className='mb-6 flex items-center justify-between'>
				<p className='text-sm text-muted-foreground font-medium'>
					Showing {visibleAgents.length} of {agents.length} agents
				</p>
			</div>

			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{visibleAgents.map((agent) => (
					<AgentCard key={agent.id} agent={agent} />
				))}
			</div>

			{hasMore && (
				<div className='mt-12 flex justify-center'>
					<Button
						variant='outline'
						size='lg'
						onClick={onLoadMore}
						className='rounded-full px-8 h-11 font-bold hover:bg-primary/5 hover:text-primary border-border/50 bg-background transition-all'
					>
						Load More ({remaining} remaining)
					</Button>
				</div>
			)}
		</section>
	);
}
