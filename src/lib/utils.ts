/** @format */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Format a raw naira amount for display, e.g. 180000 -> "₦180,000".
 * The model stores `Hostel.price` as a number; the UI formats it here.
 */
export function formatNaira(amount: number): string {
	return "₦" + amount.toLocaleString("en-NG");
}

/**
 * Format an ISO-8601 timestamp as a short relative time, e.g. "2 hours ago",
 * "3 months ago", "1 year ago". Falls back to "recently" for a missing or
 * invalid value. Used for `Hostel.postedAt` and `Agent.joinedAt`.
 */
export function formatRelativeTime(iso?: string): string {
	if (!iso) return "recently";
	const then = new Date(iso).getTime();
	if (Number.isNaN(then)) return "recently";

	const seconds = Math.round((Date.now() - then) / 1000);
	if (seconds < 60) return "just now";

	const units: Array<{ label: string; secs: number }> = [
		{ label: "year", secs: 31536000 },
		{ label: "month", secs: 2592000 },
		{ label: "week", secs: 604800 },
		{ label: "day", secs: 86400 },
		{ label: "hour", secs: 3600 },
		{ label: "minute", secs: 60 },
	];

	for (const { label, secs } of units) {
		const value = Math.floor(seconds / secs);
		if (value >= 1) return `${value} ${label}${value > 1 ? "s" : ""} ago`;
	}
	return "just now";
}
