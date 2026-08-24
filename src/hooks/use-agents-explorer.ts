/** @format */

import { useState, useEffect, useMemo, useCallback } from "react";
import type { Agent, AgentFilters } from "@/lib/types";
import { MOCK_AGENTS } from "@/lib/mock_data";

// AgentFilters now lives in the single source of truth; re-exported here so
// existing `@/hooks/use-agents-explorer` importers keep working.
export type { AgentFilters };

const initialFilters: AgentFilters = {
	searchQuery: "",
	role: "all",
	verified: "all",
	sortBy: "newest",
};

export function useAgentsExplorer() {
	const [agents, setAgents] = useState<Agent[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [visibleCount, setVisibleCount] = useState(8);
	const [filters, setFilters] = useState<AgentFilters>(initialFilters);
	const [filtersDrawerOpen, setFiltersDrawerOpen] = useState(false);

	// In a real app, this would fetch from an API
	const fetchAgents = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			// Simulate network delay
			await new Promise((resolve) => setTimeout(resolve, 800));
			setAgents(MOCK_AGENTS);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to load agents"
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAgents();
	}, [fetchAgents]);

	const updateFilter = useCallback(
		<K extends keyof AgentFilters>(key: K, value: AgentFilters[K]) => {
			setFilters((prev) => ({ ...prev, [key]: value }));
			setVisibleCount(8); // Reset pagination on filter change
		},
		[]
	);

	const resetFilters = useCallback(() => {
		setFilters(initialFilters);
		setVisibleCount(8);
	}, []);

	const filteredAgents = useMemo(() => {
		let result = [...agents];

		// Search Query Filter
		if (filters.searchQuery) {
			const query = filters.searchQuery.toLowerCase();
			result = result.filter((agent) =>
				agent.name.toLowerCase().includes(query)
			);
		}

		// Role Filter
		if (filters.role !== "all") {
			result = result.filter(
				(agent) =>
					agent.role.toLowerCase() === filters.role.toLowerCase()
			);
		}

		// Verification Filter
		if (filters.verified !== "all") {
			const isVerified = filters.verified === "verified";
			result = result.filter(
				(agent) => agent.verified === isVerified
			);
		}

		// Sorting
		if (filters.sortBy === "newest") {
			// Mock newest/oldest by active properties count or arbitrary sorting since we don't have joined timestamps
			result.sort((a, b) => b.activePropertiesCount - a.activePropertiesCount);
		} else if (filters.sortBy === "oldest") {
			result.sort((a, b) => a.activePropertiesCount - b.activePropertiesCount);
		}

		return result;
	}, [agents, filters]);

	const visibleAgents = useMemo(() => {
		return filteredAgents.slice(0, visibleCount);
	}, [filteredAgents, visibleCount]);

	const hasMore = visibleCount < filteredAgents.length;
	const remaining = filteredAgents.length - visibleCount;
	const hasActiveFilters = JSON.stringify(filters) !== JSON.stringify(initialFilters);

	return {
		agents,
		loading,
		error,
		visibleCount,
		setVisibleCount,
		filters,
		updateFilter,
		fetchAgents,
		resetFilters,
		hasActiveFilters,
		visibleAgents,
		hasMore,
		remaining,
		filtersDrawerOpen,
		setFiltersDrawerOpen,
	};
}
