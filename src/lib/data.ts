/** @format */

/**
 * ============================================================================
 * data.ts — BACKEND DATA CONTRACT & SAMPLES
 * ============================================================================
 *
 * PURPOSE
 * -------
 * A single, human-readable guide for the backend engineer describing what the
 * real API must return / accept to replace the current mock data
 * (`src/lib/mock_data.ts`). It has three parts:
 *
 *   1. RE-EXPORTS — every shape, imported from the single source of truth
 *      (`src/lib/types.ts`). Import types from EITHER file; they are identical.
 *   2. ENDPOINT CONTRACTS — endpoint-by-endpoint request/response notes.
 *   3. SAMPLES — concrete, typed example objects you can copy as fixtures.
 *
 * CONVENTIONS (already applied across the frontend)
 * -------------------------------------------------
 *   • price  — a NUMBER in naira, e.g. 180000 (NOT "₦180,000"). The UI formats
 *     it with `formatNaira()` (`src/lib/utils.ts`). Search min/maxPrice are
 *     also plain integers.
 *   • dates  — raw ISO-8601 strings: `Hostel.postedAt`, `Agent.joinedAt`. The
 *     UI computes "2 hours ago" / "1 year ago" with `formatRelativeTime()`.
 *   • type / campus / period — ONE canonical value set is used by the read
 *     model, the search filters, AND the create/edit form (no slug-vs-label
 *     split anymore): type is "Self Con" | "Single Room" | "Flat" | "Shared" |
 *     "Others"; campus is "Oye" | "Ikole" | "Ido" | "Ayegbaju" | "Ifaki" (or a
 *     custom string); period is "year" | "month".
 *   • ids    — opaque STRINGS everywhere ("1", "a1"), incl. the user id.
 *   • `field?:` = optional/nullable (UI renders a fallback); `field:` = always
 *     present.
 *
 * BASE URL: all paths below are relative to the API root (e.g. `/api`).
 * ============================================================================
 */

/* ============================================================================
 * PART 1 — RE-EXPORTS (single source of truth: ./types)
 * ==========================================================================*/

export type {
	// shared value sets
	ID,
	ISODateString,
	HostelType,
	Campus,
	RentPeriod,
	UserRole,
	// core entities
	Agent,
	Hostel,
	AuthUser,
	UserProfile,
	DashboardStats,
	// API envelopes
	ApiError,
	Paginated,
	// auth
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
	// hostels
	HostelListResponse,
	HostelDetailsResponse,
	ListingFormValues,
	ListingFormPayload,
	CreateListingResponse,
	UpdateListingResponse,
	// agents
	AgentListResponse,
	AgentProfileResponse,
	// dashboard / account
	DashboardStatsResponse,
	UpdateProfileRequest,
	DeleteAccountResponse,
	// query params
	HostelSortBy,
	HostelSearchQuery,
	AgentRoleFilter,
	AgentVerifiedFilter,
	AgentSortBy,
	AgentSearchQuery,
	// client-side filter UI state
	HostelFilters,
	AgentFilters,
} from "./types";

import type {
	Agent,
	Hostel,
	LoginResponse,
	RegisterResponse,
	DashboardStats,
	HostelSearchQuery,
	ListingFormPayload,
} from "./types";

/* ============================================================================
 * PART 2 — ENDPOINT CONTRACTS
 * ============================================================================
 *
 * AUTH
 *   POST /auth/login     body: LoginRequest      -> 200 LoginResponse | 401 ApiError
 *   POST /auth/register  body: RegisterRequest   -> 201 RegisterResponse | 400 ApiError
 *     (`confirmPassword` is validated on the client only and is NOT sent.)
 *     Return a JWT `token` (or set an HTTP-only session cookie and omit it).
 *
 * HOSTELS
 *   GET    /hostels        query: HostelSearchQuery -> Hostel[] (or Paginated<Hostel>)
 *     Cards need only the always-present Hostel fields. The backend performs
 *     filtering, sorting, and (recommended) pagination. `agentId` narrows to
 *     one agent's listings (used by the agent profile page).
 *   GET    /hostels/:id    -> Hostel (MUST include images, video, facilities,
 *     unitsAvailable, distanceToSchool, closestLandmark AND a populated agent)
 *     | 404 ApiError.
 *   POST   /hostels        body: ListingFormPayload (multipart/form-data) -> Hostel
 *   PUT    /hostels/:id     body: ListingFormPayload (multipart/form-data) -> Hostel
 *   DELETE /hostels/:id    -> 204 (the UI just removes the card)
 *     Media: up to 4 files (MAX 1 video). Images JPG/PNG/WEBP; video MP4 <=50MB.
 *     Appended to FormData separately from the JSON fields.
 *
 * AGENTS
 *   GET /agents      query: AgentSearchQuery -> Agent[] (or Paginated<Agent>)
 *   GET /agents/:id  -> Agent (+ that agent's listings via GET /hostels?agentId=:id)
 *     | 404 ApiError.
 *
 * DASHBOARD / ACCOUNT
 *   GET    /dashboard/stats -> DashboardStats (overview cards)
 *   PUT    /user/profile    body: UpdateProfileRequest -> UserProfile
 *     (password fields sent only when changing the password)
 *   DELETE /user/account    -> DeleteAccountResponse (UI redirects home)
 *
 * NOTES
 *   • Media URLs (image, images[], avatar, video) must be ABSOLUTE, publicly
 *     reachable URLs — relative storage paths will not render.
 *   • phone builds `tel:` and `https://wa.me/<digits>` links; for WhatsApp,
 *     prefer full international digits without "+" (e.g. "2348012345678").
 *   • Dashboard routes are meant to be auth-protected.
 * ==========================================================================*/

/* ============================================================================
 * PART 3 — SAMPLE FIXTURES (typed against ./types)
 * ==========================================================================*/

/** Example agent — as returned by GET /agents/:id and embedded in a hostel. */
export const SAMPLE_AGENT: Agent = {
	id: "a1",
	name: "Okafor Chibuike",
	avatar: "https://cdn.example.com/avatars/a1.jpg",
	joinedAt: "2025-03-14T08:30:00Z",
	verified: true,
	phone: "2348012345678",
	role: "Agent",
	activePropertiesCount: 12,
};

/** Example hostel — the full detail shape returned by GET /hostels/:id. */
export const SAMPLE_HOSTEL: Hostel = {
	id: "1",
	title: "Sunshine Lodge",
	description:
		"A very clean and secure self contain with running water and 24/7 solar electricity.",
	image: "https://cdn.example.com/hostels/1/cover.jpg",
	type: "Self Con",
	price: 180000,
	period: "year",
	negotiable: false,
	location: "Oye",
	images: [
		"https://cdn.example.com/hostels/1/1.jpg",
		"https://cdn.example.com/hostels/1/2.jpg",
	],
	video: "https://cdn.example.com/hostels/1/walkthrough.mp4",
	views: 124,
	postedAt: "2026-08-24T08:00:00Z",
	facilities: ["Running Water", "Solar Electricity", "POP Ceiling"],
	unitsAvailable: 2,
	distanceToSchool: "5 minutes walk",
	closestLandmark: "Main Campus Gate",
	agent: SAMPLE_AGENT,
};

/** Example POST /auth/login success body. */
export const SAMPLE_LOGIN_RESPONSE: LoginResponse = {
	token: "jwt_token_here",
	user: { id: "1", name: "John Doe", email: "user@example.com", role: "Agent" },
};

/** Example POST /auth/register success body. */
export const SAMPLE_REGISTER_RESPONSE: RegisterResponse = {
	message: "Registration successful",
	token: "jwt_token_here",
	user: { id: "1", name: "John Doe", role: "Agent" },
};

/** Example GET /dashboard/stats body. */
export const SAMPLE_DASHBOARD_STATS: DashboardStats = {
	totalListings: 12,
	totalListingsDelta: "+2 from last month",
	activeViews: 1245,
	activeViewsDelta: "+18% from last month",
	inquiries: 48,
	inquiriesDelta: "+12 new this week",
	conversionRate: 3.8,
	conversionRateNote: "Steady growth",
};

/** Example query the search UI sends to GET /hostels. */
export const SAMPLE_HOSTEL_SEARCH_QUERY: HostelSearchQuery = {
	search: "sunshine",
	type: "Self Con",
	campus: "Oye",
	minPrice: 50000,
	maxPrice: 200000,
	sort: "newest",
	page: 1,
	limit: 8,
};

/** Example body the create/edit form sends to POST /hostels. */
export const SAMPLE_LISTING_PAYLOAD: ListingFormPayload = {
	title: "Sunshine Lodge Phase 2",
	price: 150000,
	period: "year",
	negotiable: false,
	type: "Self Con",
	location: "Oye",
	units: 4,
	facilities: ["Running Water", "POP Ceiling"],
	description: "Describe the hostel environment, distance to school, and rules...",
	landmark: "Beside First Bank",
};
