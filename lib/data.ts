/** @format */

"use client";
import { supabase } from "./supabase";

export type Profile = {
	id: string;
	email: string;
	role: "student" | "admin";
	full_name: string;
	matric_number?: string | null;
	[key: string]: any;
};

// Profile
export async function fetchProfile(userId: string) {
	const { data, error } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", userId)
		.single();

	if (error) {
		console.error("Failed to fetch profile for", userId, error.message, error.details, error.hint);
		throw error;
	}
	return data;
}

// Hostels
export async function fetchHostels() {
	const { data, error } = await supabase.from("hostels").select("*");
	if (error) throw error;
	return data;
}

export async function createHostel(hostelData: { name: string; location: string; gender: "male" | "female" | "mixed"; number_of_rooms?: number; description?: string }) {
	const { data, error } = await supabase.from("hostels").insert(hostelData).select().single();
	if (error) throw error;
	return data;
}

// Rooms
export async function fetchHostelRooms(hostelId: string) {
	const { data, error } = await supabase
		.from("rooms")
		.select("*")
		.eq("hostel_id", hostelId);
	if (error) throw error;
	return data;
}

// Applications
export async function applyForHostel(userId: string, hostelId: string) {
	const { data, error } = await supabase
		.from("applications")
		.insert({ student_id: userId, hostel_id: hostelId, status: "pending" })
		.select()
		.single();
	if (error) throw error;
	return data;
}

export async function fetchStudentApplication(userId: string) {
	const { data, error } = await supabase
		.from("applications")
		.select("*, hostels(*)")
		.eq("student_id", userId)
		.maybeSingle();
	if (error) throw error;
	return data;
}

// Admins
export async function fetchAllApplications() {
	const { data, error } = await supabase
		.from("applications")
		.select("*, profiles(*), hostels(*)");
	if (error) throw error;
	return data;
}
