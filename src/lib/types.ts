/** @format */

/**
 * types.ts — SINGLE SOURCE OF TRUTH for every shape in the app.
 *
 * All interfaces, type aliases, and enums live here. The runtime mock data
 * (`mock_data.ts`), the backend contract doc + samples (`data.ts`), the UI
 * components, hooks, and forms all import their types from this file.
 *
 * Values are stored RAW and formatted in the UI:
 *   • price  — a NUMBER in naira (e.g. 180000). Format with `formatNaira()`.
 *   • dates  — ISO-8601 strings (postedAt, joinedAt). Format with `formatRelativeTime()`.
 *   • type / campus / period — canonical values shared by the model, the
 *     filters, and the create form (no more slug-vs-label mismatch).
 */

/* ------------------------------------------------------------------ *
 * Shared value sets (enums)
 * ------------------------------------------------------------------ */

/** Opaque resource id. Read from URLs, so always a string ("1", "a1"). */
export type ID = string;

/** ISO-8601 timestamp, e.g. "2026-08-24T14:30:00Z". */
export type ISODateString = string;

/** Property category — the canonical value shown on cards, filters, and the form. */
export type HostelType =
	| "Self Con"
	| "Single Room"
	| "Flat"
	| "Shared"
	| "Others";

/** Known campuses. `Hostel.location` is a string so custom campuses are allowed. */
export type Campus = "Oye" | "Ikole" | "Ido" | "Ayegbaju" | "Ifaki";

/** Billing period for the rent price. */
export type RentPeriod = "year" | "month";

/** Account / person type. */
export type UserRole = "Agent" | "Landlord" | "Student" | "Others";

/* ------------------------------------------------------------------ *
 * Core entities
 * ------------------------------------------------------------------ */

/** Agent / landlord / property owner. */
export interface Agent {
	id: ID;
	name: string;
	avatar: string; // absolute image URL
	joinedAt: ISODateString; // when they joined; UI shows "1 year ago"
	verified: boolean;
	phone: string; // digits, used for tel: and wa.me links
	role: UserRole;
	activePropertiesCount: number;
}

/** Hostel / property listing — the central resource of the app. */
export interface Hostel {
	// ---- Always present (cards + detail page) ----
	id: ID;
	title: string;
	description: string;
	image: string; // featured/cover image URL
	type: HostelType;
	price: number; // naira, raw number (e.g. 180000) — format with formatNaira()
	period: RentPeriod;
	negotiable: boolean;
	location: string; // campus name (see Campus) or a custom location

	// ---- Detail page (optional on cards) ----
	images?: string[]; // gallery URLs
	video?: string; // walkthrough video URL
	views?: number;
	postedAt?: ISODateString; // when posted; UI shows "2 hours ago"
	facilities?: string[];
	unitsAvailable?: number;
	distanceToSchool?: string;
	closestLandmark?: string;
	agent?: Agent; // populated on the details page
}

/** Authenticated user returned by login/register. */
export interface AuthUser {
	id: ID;
	name: string;
	email?: string; // present on login; omitted in the register response
	role: UserRole;
}

/** Full profile edited in Dashboard → Settings. */
export interface UserProfile {
	id: ID;
	fullName: string;
	email: string;
	phone: string;
	role: UserRole;
	verified?: boolean;
}

/* ------------------------------------------------------------------ *
 * Dashboard analytics
 * ------------------------------------------------------------------ */

/** Dashboard overview stat cards (GET /dashboard/stats). */
export interface DashboardStats {
	totalListings: number;
	totalListingsDelta: string;
	activeViews: number;
	activeViewsDelta: string;
	inquiries: number;
	inquiriesDelta: string;
	conversionRate: number; // percentage value; UI appends "%"
	conversionRateNote: string;
}

/* ------------------------------------------------------------------ *
 * API envelopes
 * ------------------------------------------------------------------ */

/** Generic error body for every non-2xx response. */
export interface ApiError {
	error: string;
}

/** Pagination envelope for list endpoints. */
export interface Paginated<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
	hasMore: boolean;
}

/* ------------------------------------------------------------------ *
 * Auth contracts
 * ------------------------------------------------------------------ */

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string; // JWT (or set an HTTP-only cookie instead)
	user: AuthUser;
}

export interface RegisterRequest {
	fullName: string;
	email: string;
	phone: string;
	password: string;
	role: UserRole;
	// confirmPassword is validated client-side only and NOT sent.
}

export interface RegisterResponse {
	message: string;
	token: string;
	user: AuthUser;
}

/* ------------------------------------------------------------------ *
 * Hostel contracts
 * ------------------------------------------------------------------ */

/** GET /hostels — list & search. Cards need only the always-present fields. */
export type HostelListResponse = Hostel[]; // or Paginated<Hostel>

/** GET /hostels/:id — full details incl. optional fields + populated agent. */
export type HostelDetailsResponse = Hostel;

/**
 * Create/edit form STATE (CreateListingPage `formData`).
 * Uses the canonical enums so the form emits exactly what the model + filters
 * use. "" means "not yet selected"; campus "Others" reveals `customCampus`.
 * `price`/`units` are numeric text from <input type="number">, parsed on submit.
 */
export interface ListingFormValues {
	title: string;
	price: string;
	period: RentPeriod;
	negotiable: boolean;
	type: HostelType | "";
	campus: Campus | "Others" | "";
	customCampus: string;
	units: string;
	facilities: string[];
	description: string;
	landmark: string;
}

/**
 * Request body sent to POST /hostels or PUT /hostels/:id (multipart/form-data).
 * Derived from ListingFormValues on submit: price/units parsed to numbers, and
 * `location` resolved from campus (campus === "Others" ? customCampus : campus).
 */
export interface ListingFormPayload {
	title: string;
	price: number;
	period: RentPeriod;
	negotiable: boolean;
	type: HostelType;
	location: string;
	units: number;
	facilities: string[]; // max 8
	description: string; // max 500 chars
	landmark: string; // maps to closestLandmark
	// media: File[] — up to 4 files (1 video max), appended to FormData separately.
}

/** POST /hostels, PUT /hostels/:id — return the saved hostel so the UI can update. */
export type CreateListingResponse = Hostel;
export type UpdateListingResponse = Hostel;

/* ------------------------------------------------------------------ *
 * Agent contracts
 * ------------------------------------------------------------------ */

/** GET /agents — list & search. */
export type AgentListResponse = Agent[]; // or Paginated<Agent>

/** GET /agents/:id — single agent profile. */
export type AgentProfileResponse = Agent;

/* ------------------------------------------------------------------ *
 * Dashboard / account contracts
 * ------------------------------------------------------------------ */

export type DashboardStatsResponse = DashboardStats;

/** PUT /user/profile — password fields sent only when changing password. */
export interface UpdateProfileRequest {
	fullName: string;
	email: string;
	phone: string;
	role: UserRole;
	currentPassword?: string;
	newPassword?: string;
}

/** DELETE /user/account. */
export interface DeleteAccountResponse {
	message?: string;
}

/* ------------------------------------------------------------------ *
 * Search / filter query params (sent to the backend)
 * ------------------------------------------------------------------ */

export type HostelSortBy = "newest" | "oldest" | "price_asc" | "price_desc";

/** GET /hostels query params. "All"/"" means no filter. */
export interface HostelSearchQuery {
	search?: string;
	type?: HostelType | "All";
	campus?: Campus | "All";
	minPrice?: number;
	maxPrice?: number;
	sort?: HostelSortBy;
	page?: number;
	limit?: number;
	agentId?: ID;
}

export type AgentRoleFilter = "all" | "agent" | "landlord" | "student";
export type AgentVerifiedFilter = "all" | "verified" | "unverified";
export type AgentSortBy = "newest" | "oldest";

/** GET /agents query params. "all"/"" means no filter. */
export interface AgentSearchQuery {
	search?: string;
	role?: AgentRoleFilter;
	verified?: AgentVerifiedFilter;
	sort?: AgentSortBy;
	page?: number;
	limit?: number;
}

/* ------------------------------------------------------------------ *
 * Client-side filter UI state (not sent verbatim; see *SearchQuery above)
 * ------------------------------------------------------------------ */

/** Hostel filter bar state. minPrice/maxPrice are raw <input> text. */
export interface HostelFilters {
	searchQuery: string;
	type: string;
	campus: string;
	minPrice: string;
	maxPrice: string;
	sortBy: string;
}

/** Agent filter bar state. */
export interface AgentFilters {
	searchQuery: string;
	role: string;
	verified: string;
	sortBy: string;
}
