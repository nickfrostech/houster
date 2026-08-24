/** @format */

import type { Campus, HostelType, HostelSortBy } from "./types";

/** Known campuses (canonical). Shared by the filter bar and the create form. */
export const CAMPUSES: Campus[] = ["Oye", "Ikole", "Ido", "Ayegbaju", "Ifaki"];

/** Property categories (canonical). Shared by the filter bar and the create form. */
export const HOSTEL_TYPES: HostelType[] = [
	"Self Con",
	"Single Room",
	"Flat",
	"Shared",
	"Others",
];

/**
 * Option lists for the hostel filter bar. Values are typed against the
 * canonical unions (plus "All"), so a typo or a drifted value set fails the
 * build — keeping filter values, form values, and model values in lockstep.
 */
export const filterOptions: {
	types: { label: string; value: HostelType | "All" }[];
	campuses: { label: string; value: Campus | "All" }[];
	sortOptions: { label: string; value: HostelSortBy }[];
} = {
	types: [
		{ label: "All Types", value: "All" },
		{ label: "Self Contain", value: "Self Con" },
		{ label: "Single Room", value: "Single Room" },
		{ label: "Flat / Apartment", value: "Flat" },
		{ label: "Shared", value: "Shared" },
		{ label: "Others", value: "Others" },
	],
	campuses: [
		{ label: "All Campuses", value: "All" },
		{ label: "Oye Campus", value: "Oye" },
		{ label: "Ikole Campus", value: "Ikole" },
		{ label: "Ido Campus", value: "Ido" },
		{ label: "Ayegbaju Campus", value: "Ayegbaju" },
		{ label: "Ifaki Campus", value: "Ifaki" },
	],
	sortOptions: [
		{ label: "Newest First", value: "newest" },
		{ label: "Oldest First", value: "oldest" },
		{ label: "Price (Lowest)", value: "price_asc" },
		{ label: "Price (Highest)", value: "price_desc" },
	],
};

// HostelFilters now lives in the single source of truth; re-exported here so
// existing `@/lib/filter-schema` importers keep working.
export type { HostelFilters } from "./types";
