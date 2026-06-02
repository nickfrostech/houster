/** @format */

"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import {
	fetchHostels,
	fetchStudentApplication,
	applyForHostel,
} from "@/lib/data";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, CheckCircle, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function StudentDashboard() {
	const { user, profile } = useAuth();
	const [hostels, setHostels] = useState<any[]>([]);
	const [application, setApplication] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [applying, setApplying] = useState(false);

	async function loadData() {
		if (!user) return;
		try {
			const app = await fetchStudentApplication(user.id);
			setApplication(app);

			if (!app) {
				const hostelsData = await fetchHostels();
				setHostels(hostelsData || []);
			}
		} catch (e: any) {
			console.error("Dashboard Load Error:", e);
			toast.error(`Dashboard Error: ${e.message || JSON.stringify(e)}`);
		} finally {
			if (typeof window !== "undefined") {
				setTimeout(() => setLoading(false), 0);
			} else {
				setLoading(false);
			}
		}
	}

	useEffect(() => {
		loadData();
	}, [user]);

	const handleApply = async (hostelId: string) => {
		if (!user) return;
		setApplying(true);
		try {
			await applyForHostel(user.id, hostelId);
			toast.success("Application submitted successfully!");
			loadData();
		} catch (e: any) {
			toast.error(e.message || "Failed to apply");
		} finally {
			setApplying(false);
		}
	};

	if (loading)
		return (
			<div className='text-muted-foreground p-8'>Loading dashboard...</div>
		);

	return (
		<div className='space-y-6'>
			{profile?.full_name === "Student" && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
					<strong className="font-bold">Error loading profile!</strong>
					<span className="block sm:inline"> We couldn't fetch your profile data from Supabase. You are currently seeing a fallback state. Check your browser console or ensure PostgreSQL RLS/permissions are correct.</span>
				</div>
			)}
			<div className='flex items-center justify-between'>
				<h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
			</div>

			{application ? (
				<Card className='border-primary/20 shadow-md'>
					<CardHeader>
						<CardTitle>My Application Status</CardTitle>
						<CardDescription>
							View your current bed space allocation status.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-6'>
						<div className='flex items-center gap-4 bg-muted/50 p-4 rounded-xl border'>
							{application.status === "pending" && (
								<Clock className='h-8 w-8 text-yellow-500' />
							)}
							{application.status === "approved" && (
								<CheckCircle className='h-8 w-8 text-green-500' />
							)}
							{application.status === "rejected" && (
								<XCircle className='h-8 w-8 text-destructive' />
							)}
							<div>
								<p className='text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1'>
									Status
								</p>
								<div className='flex items-center gap-2'>
									<Badge
										variant={
											application.status === "approved"
												? "success"
												: application.status === "rejected"
													? "destructive"
													: "warning"
										}
										className='capitalize text-sm px-3 py-1'
									>
										{application.status}
									</Badge>
								</div>
							</div>
						</div>

						<div className='p-4 border rounded-xl bg-background space-y-4'>
							<h3 className='font-semibold text-lg flex items-center gap-2'>
								<Building className='h-5 w-5 text-primary' />
								Requested Hostel Details
							</h3>
							<div className='grid grid-cols-2 gap-4 text-sm mt-3'>
								<div>
									<p className='text-muted-foreground mb-1'>
										Hostel Name
									</p>
									<p className='font-medium'>
										{application.hostels?.name || "Assigned Hostel"}
									</p>
								</div>
								<div>
									<p className='text-muted-foreground mb-1'>
										Location
									</p>
									<p className='font-medium'>
										{application.hostels?.location || "Main Campus"}
									</p>
								</div>
								<div>
									<p className='text-muted-foreground mb-1'>
										Gender Restriction
									</p>
									<p className='font-medium capitalize'>
										{application.hostels?.gender ||
											profile?.gender ||
											"N/A"}
									</p>
								</div>
							</div>
						</div>

						{application.status === "approved" && (
							<div className='bg-primary/10 border-primary/20 border p-4 rounded-xl'>
								<h3 className='font-bold text-primary mb-2'>
									🎉 Congratulations!
								</h3>
								<p className='text-sm text-primary/80'>
									Your bed space has been allocated. Please proceed to
									the hostel porter&apos;s lodge for physical
									clearance.
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			) : (
				<>
					<div className='bg-primary/10 border-primary/20 border p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4'>
						<div>
							<h2 className='text-lg font-bold text-primary flex items-center gap-2'>
								<AlertCircle className='h-5 w-5' /> Active Application
								Period
							</h2>
							<p className='text-sm text-primary/80'>
								You have not applied for a hostel bed space for the
								current session. Select a hostel below.
							</p>
						</div>
					</div>

					<h3 className='text-xl font-bold tracking-tight mt-8 mb-4'>
						Available Hostels
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{hostels
							.filter(
								(h) =>
									h.gender === "mixed" ||
									h.gender === profile?.gender ||
									!profile?.gender,
							)
							.map((hostel: any) => (
								<Card
									key={hostel.id}
									className='flex flex-col hover:border-primary/50 transition-colors'
								>
									<CardHeader>
										<CardTitle className='flex items-start justify-between'>
											<span>{hostel.name}</span>
											<Badge
												variant='outline'
												className='capitalize'
											>
												{hostel.gender}
											</Badge>
										</CardTitle>
										<CardDescription className='flex items-center gap-1 mt-1'>
											<MapPin className='h-3 w-3' />{" "}
											{hostel.location}
										</CardDescription>
									</CardHeader>
									<CardContent className='flex-1'>
										<p className='text-sm text-muted-foreground line-clamp-3'>
											{hostel.description ||
												"Standard university hostel accommodation with basic amenities, reading rooms, and recreation areas."}
										</p>
										<div className='mt-4 flex items-center gap-4 text-sm font-medium'>
											<div className='bg-muted px-3 py-1.5 rounded-lg'>
												<span className='text-muted-foreground block text-xs'>
													Total Rooms
												</span>
												{hostel.number_of_rooms || 0}
											</div>
										</div>
									</CardContent>
									<CardFooter>
										<Button
											className='w-full'
											onClick={() => handleApply(hostel.id)}
											disabled={applying}
										>
											Apply for this Hostel
										</Button>
									</CardFooter>
								</Card>
							))}

						{hostels.length === 0 && (
							<div className='col-span-full text-center p-12 border border-dashed rounded-xl text-muted-foreground bg-muted/20'>
								No hostels available for your gender at this moment.
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}

import { AlertCircle } from "lucide-react";
