/** @format */

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AgentFilters } from "@/hooks/use-agents-explorer";

interface AgentFilterFieldsProps {
	filters: AgentFilters;
	updateFilter: <K extends keyof AgentFilters>(key: K, value: AgentFilters[K]) => void;
	layout?: "desktop" | "mobile";
}

export function AgentFilterFields({ filters, updateFilter, layout = "mobile" }: AgentFilterFieldsProps) {
	const isDrawer = layout === "mobile";
	const selectContentClassName = isDrawer ? "z-[200] max-h-[min(280px,45vh)] w-[var(--radix-select-trigger-width)]" : "p-1";

	const selectClass = cn(
		"h-11 w-full min-h-11 px-4 text-sm font-medium rounded-full border-border bg-background transition-colors focus:ring-0 focus:ring-offset-0",
		!isDrawer && "min-w-[140px] hover:bg-muted/50"
	);

	return (
		<div className={cn("flex w-full", isDrawer ? "flex-col gap-6" : "flex-row gap-3")}>
			<div className={cn("min-w-0", isDrawer ? "w-full space-y-2" : "w-full flex-1 md:min-w-0")}>
				{isDrawer && <Label className='text-foreground'>Role</Label>}
				<Select
					value={filters.role}
					onValueChange={(v) => v && updateFilter("role", v)}
				>
					<SelectTrigger className={selectClass}>
						<SelectValue placeholder='Role' />
					</SelectTrigger>
					<SelectContent className={cn("rounded-2xl", selectContentClassName)}>
						<SelectItem value='all' className='rounded-xl'>All Roles</SelectItem>
						<SelectItem value='agent' className='rounded-xl'>Agent</SelectItem>
						<SelectItem value='landlord' className='rounded-xl'>Landlord</SelectItem>
						<SelectItem value='student' className='rounded-xl'>Student</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className={cn("min-w-0", isDrawer ? "w-full space-y-2" : "w-full flex-1 md:min-w-0")}>
				{isDrawer && <Label className='text-foreground'>Verification Status</Label>}
				<Select
					value={filters.verified}
					onValueChange={(v) => v && updateFilter("verified", v)}
				>
					<SelectTrigger className={selectClass}>
						<SelectValue placeholder='Verification' />
					</SelectTrigger>
					<SelectContent className={cn("rounded-2xl", selectContentClassName)}>
						<SelectItem value='all' className='rounded-xl'>All Status</SelectItem>
						<SelectItem value='verified' className='rounded-xl'>Verified Only</SelectItem>
						<SelectItem value='unverified' className='rounded-xl'>Unverified</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className={cn("min-w-0", isDrawer ? "w-full space-y-2" : "w-full flex-1 md:min-w-0")}>
				{isDrawer && <Label className='text-foreground'>Sort By</Label>}
				<Select
					value={filters.sortBy}
					onValueChange={(v) => v && updateFilter("sortBy", v)}
				>
					<SelectTrigger className={selectClass}>
						<SelectValue placeholder='Sort By' />
					</SelectTrigger>
					<SelectContent className={cn("rounded-2xl", selectContentClassName)}>
						<SelectItem value='newest' className='rounded-xl'>Most Properties</SelectItem>
						<SelectItem value='oldest' className='rounded-xl'>Least Properties</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
