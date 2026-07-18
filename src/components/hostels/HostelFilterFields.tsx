/** @format */

"use client";

import {
	Building2,
	MapPin,
} from "lucide-react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { filterOptions, type HostelFilters } from "@/lib/filter-schema";

export type HostelFilterFieldsProps = {
	filters: HostelFilters;
	updateFilter: (key: keyof HostelFilters, value: string | null) => void;
	/** Desktop row vs stacked (drawer / mobile-friendly) */
	layout: "desktop" | "drawer";
	className?: string;
};

const selectContentClassDrawer =
	"z-[200] max-h-[min(280px,45vh)] w-[var(--radix-select-trigger-width)]";

/**
 * HostelFilterFields Component
 * 
 * Reusable form fields for filtering hostels (Type, Campus, Sort, Price).
 * Supports two layouts:
 * - 'desktop': Renders horizontally inline.
 * - 'drawer': Renders vertically with labels (used inside the mobile dialog).
 */
export function HostelFilterFields({
	filters,
	updateFilter,
	layout,
	className,
}: HostelFilterFieldsProps) {
	const isDrawer = layout === "drawer";
	const selectContentClassName = isDrawer ? selectContentClassDrawer : "p-1";

	{/* 1. Property Type Selector */}
	const typeSelect = (
		<div
			className={cn(
				"min-w-0",
				isDrawer ? "w-full space-y-2" : "w-full flex-1 md:min-w-0",
			)}
		>
			{isDrawer && <Label className='text-foreground'>Hostel Type</Label>}
			<Select
				value={filters.type ?? undefined}
				onValueChange={(v) => updateFilter("type", v)}
			>
				<SelectTrigger
					className={cn(
						"h-11 w-full min-h-11 px-3 text-sm rounded-full",
						!isDrawer && "min-w-35 flex-1",
					)}
				>
					<span className='flex items-center gap-2 font-medium'>
						{!isDrawer && (
							<Building2 className='w-4 h-4 text-muted-foreground hidden sm:block' />
						)}
						<SelectValue placeholder='All Types' />
					</span>
				</SelectTrigger>
				<SelectContent className={selectContentClassName}>
					{filterOptions.types.map((type) => (
						<SelectItem key={type.value} value={type.value}>
							{type.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);

	{/* 2. Campus Location Selector */}
	const campusSelect = (
		<div className={cn("min-w-0", isDrawer ? "w-full space-y-2" : "w-full flex-1 md:min-w-0")}>
			{isDrawer && <Label className='text-foreground'>Campus Location</Label>}
			<Select value={filters.campus ?? undefined} onValueChange={(v) => updateFilter("campus", v)}>
				<SelectTrigger className={cn("h-11 w-full min-h-11 px-3 text-sm rounded-full", !isDrawer && "min-w-35 flex-1")}>
					<span className='flex items-center gap-2 font-medium text-foreground'>
						{!isDrawer && <MapPin className="w-4 h-4 text-muted-foreground hidden sm:block" />}
						<SelectValue placeholder='All Campuses' />
					</span>
				</SelectTrigger>
				<SelectContent className={selectContentClassName}>
					{filterOptions.campuses.map((campus) => (
						<SelectItem key={campus.value} value={campus.value}>
							{campus.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);

	{/* 3. Sorting Options Selector */}
	const sortSelect = (
		<div className={cn("min-w-0", isDrawer ? "w-full space-y-2" : "w-full flex-1 md:min-w-0")}>
			{isDrawer && <Label className='text-foreground'>Sort By</Label>}
			<Select value={filters.sortBy ?? undefined} onValueChange={(v) => updateFilter("sortBy", v)}>
				<SelectTrigger className={cn("h-11 w-full min-h-11 px-3 text-sm rounded-full", !isDrawer && "min-w-35 flex-1")}>
					<span className='flex items-center gap-2 font-medium'>
						<SelectValue placeholder='Sort By' />
					</span>
				</SelectTrigger>
				<SelectContent className={selectContentClassName}>
					{filterOptions.sortOptions.map((opt) => (
						<SelectItem key={opt.value} value={opt.value}>
							{opt.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);

	{/* 4. Price Range Inputs (Only visible in Drawer layout currently) */}
	const priceRange = (
		<div className={cn("min-w-0", isDrawer ? "w-full space-y-2" : "hidden")}>
			{isDrawer && <Label className='mb-1 block'>Price Range (₦)</Label>}
			<div className='flex items-center gap-3'>
				<Input
					type='number'
					placeholder='Min'
					value={filters.minPrice}
					onChange={(e) => updateFilter("minPrice", e.target.value)}
					className='h-11 rounded-full'
					min='1000'
					step='500'
				/>
				<span className='text-muted-foreground font-medium'>-</span>
				<Input
					type='number'
					placeholder='Max'
					value={filters.maxPrice}
					onChange={(e) => updateFilter("maxPrice", e.target.value)}
					className='h-11 rounded-full'
					min='1000'
					step='500'
				/>
			</div>
		</div>
	);

	// Desktop Layout: Render horizontally
	if (layout === "desktop") {
		return (
			<div className={cn("flex w-full flex-wrap gap-3 md:flex-nowrap", className)}>
				{typeSelect}
				{sortSelect}
			</div>
		);
	}

	// Drawer Layout: Render vertically
	return (
		<div className={cn("flex flex-col gap-6", className)}>
			{typeSelect}
			{campusSelect}
			{sortSelect}
			{priceRange}
		</div>
	);
}
