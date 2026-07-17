/** @format */

export const filterOptions = {
	types: [
		{ label: "All Types", value: "All" },
		{ label: "Self Contain", value: "Self Con" },
		{ label: "Single Room", value: "Single Room" },
		{ label: "Flat / Apartment", value: "Flat" },
		{ label: "Shared", value: "Shared" },
		{ label: "Others", value: "Others" }
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

export interface HostelFilters {
	searchQuery: string;
	type: string;
	campus: string;
	minPrice: string;
	maxPrice: string;
	sortBy: string;
}
