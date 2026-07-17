/** @format */

import { useState, useEffect, useCallback, useMemo } from "react";
import type { Hostel } from "@/lib/types";
import type { HostelFilters } from "@/lib/filter-schema";
import { RECENT_HOSTELS } from "@/lib/mock_data";

const LOAD_MORE_COUNT = 8;

// We use the mock data from RecentHostels for now. 
// In production, this hook will send `filters` to the PHP backend.
const MOCK_DATA: Hostel[] = [...RECENT_HOSTELS, ...RECENT_HOSTELS.map(h => ({...h, id: h.id + "_copy"}))];

export function useHostelsExplorer() {
	const [hostels, setHostels] = useState<Hostel[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [visibleCount, setVisibleCount] = useState(LOAD_MORE_COUNT);

	// Filter States
	const [filters, setFilters] = useState<HostelFilters>({
		searchQuery: "",
		type: "All",
		campus: "All",
		minPrice: "",
		maxPrice: "",
		sortBy: "newest",
	});

	const [filtersDrawerOpen, setFiltersDrawerOpen] = useState(false);

	const fetchHostels = useCallback(async () => {
		setLoading(true);
		setError(null);
		
		try {
			// Simulate API call to PHP Backend
			await new Promise((resolve) => setTimeout(resolve, 800));
			
			// Backend Simulation: Filtering
			let result = [...MOCK_DATA];

			if (filters.searchQuery) {
				const query = filters.searchQuery.toLowerCase();
				result = result.filter(
					(h) =>
						h.title.toLowerCase().includes(query) ||
						h.description.toLowerCase().includes(query)
				);
			}

			if (filters.type !== "All") {
				result = result.filter((h) => h.type === filters.type);
			}

			if (filters.campus !== "All") {
				result = result.filter((h) => h.location === filters.campus);
			}

			if (filters.minPrice) {
				const min = parseInt(filters.minPrice, 10);
				result = result.filter((h) => parseInt(h.price.replace(/\D/g, "")) >= min);
			}

			if (filters.maxPrice) {
				const max = parseInt(filters.maxPrice, 10);
				result = result.filter((h) => parseInt(h.price.replace(/\D/g, "")) <= max);
			}

			// Backend Simulation: Sorting
			if (filters.sortBy === "price_asc") {
				result.sort((a, b) => parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, "")));
			} else if (filters.sortBy === "price_desc") {
				result.sort((a, b) => parseInt(b.price.replace(/\D/g, "")) - parseInt(a.price.replace(/\D/g, "")));
			}
			// newest and oldest can be mock sorted by ID since we don't have dates in mock yet

			setHostels(result);
			setVisibleCount(LOAD_MORE_COUNT);
		} catch {
			setError("Failed to load hostels. Please check your connection.");
		} finally {
			setLoading(false);
		}
	}, [filters]);

	// Fetch when filters change
	useEffect(() => {
		fetchHostels();
	}, [fetchHostels]);

	const updateFilter = useCallback((key: keyof HostelFilters, value: string | null) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	}, []);

	const resetFilters = useCallback(() => {
		setFilters({
			searchQuery: "",
			type: "All",
			campus: "All",
			minPrice: "",
			maxPrice: "",
			sortBy: "newest",
		});
		setFiltersDrawerOpen(false);
	}, []);

	const hasActiveFilters = useMemo(() => {
		return (
			filters.type !== "All" ||
			filters.campus !== "All" ||
			filters.minPrice !== "" ||
			filters.maxPrice !== "" ||
			filters.sortBy !== "newest"
		);
	}, [filters]);

	const visibleHostels = hostels.slice(0, visibleCount);
	const hasMore = visibleCount < hostels.length;
	const remaining = hostels.length - visibleCount;

	return {
		hostels,
		loading,
		error,
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
		setVisibleCount,
	};
}
