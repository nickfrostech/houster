/** @format */

import { useState } from "react";
import { Loader2, AlertTriangle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * DashboardSettings Component
 * 
 * Allows the user (agent/landlord/student) to update their personal information,
 * change their password, and permanently delete their account.
 */
export function DashboardSettings() {
	const [isLoading, setIsLoading] = useState(false); // Tracks profile update loading state
	const [isDeleting, setIsDeleting] = useState(false); // Tracks account deletion loading state
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Toggles the danger zone confirmation view

	// Mock initialized data representing the user's current profile settings
	const [formData, setFormData] = useState({
		fullName: "John Doe",
		email: "john@example.com",
		phone: "08012345678",
		role: "Agent",
		currentPassword: "",
		newPassword: "",
	});

	// Handles changes for standard input fields (text, email, password)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	// Handles changes specifically for the Role select dropdown
	const handleRoleChange = (value: string | null) => {
		if (value !== null) setFormData((prev) => ({ ...prev, role: value }));
	};

	/*
	 * BACKEND INTEGRATION NOTE: UPDATE PROFILE
	 * Expected API Endpoint: PUT /api/user/profile
	 */
	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Mock network request
		setTimeout(() => {
			setIsLoading(false);
			alert("Profile updated successfully!");
		}, 1000);
	};

	/*
	 * BACKEND INTEGRATION NOTE: DELETE ACCOUNT
	 * Expected API Endpoint: DELETE /api/user/account
	 */
	const handleDeleteAccount = () => {
		setIsDeleting(true);

		// Mock network request
		setTimeout(() => {
			setIsDeleting(false);
			window.location.href = "/";
		}, 1500);
	};

	return (
		<div className='max-w-4xl mx-auto space-y-8 pb-12'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Settings</h1>
				<p className='text-muted-foreground mt-2'>
					Manage your account details and preferences.
				</p>
			</div>

			<form onSubmit={handleSave}>
				{/* Personal Information Section */}
				<Card className='rounded-3xl border-border/50'>
					<CardHeader className='pb-4 border-b border-border/50 mb-6'>
						<CardTitle className='text-xl'>Personal Information</CardTitle>
						<CardDescription>Update your profile details below.</CardDescription>
					</CardHeader>
					<CardContent className='space-y-6'>
						{/* Grid for grouping inputs in 2 columns on medium screens and above */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{/* Full Name Input */}
							<div className='space-y-2'>
								<Label htmlFor='fullName'>Full Name</Label>
								<Input
									id='fullName'
									value={formData.fullName}
									onChange={handleChange}
									required
									className='rounded-full h-11!'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email Address</Label>
								<Input
									id='email'
									type='email'
									value={formData.email}
									onChange={handleChange}
									required
									className='rounded-full h-11!'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='phone'>Phone Number</Label>
								<Input
									id='phone'
									type='tel'
									value={formData.phone}
									onChange={handleChange}
									required
									className='rounded-full h-11!'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='role'>Role</Label>
								<Select value={formData.role} onValueChange={handleRoleChange} required>
									<SelectTrigger className='rounded-full h-11! w-full'>
										<SelectValue placeholder='Select your role' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='Agent'>Agent</SelectItem>
										<SelectItem value='Landlord'>Landlord</SelectItem>
										<SelectItem value='Student'>Student</SelectItem>
										<SelectItem value='Others'>Others</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* Verified Badge */}
						<div className='flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 w-fit px-5 py-2.5 rounded-full mt-4 border border-emerald-200 dark:border-emerald-800/50'>
							<ShieldCheck className='w-5 h-5' />
							<span className='text-sm font-bold'>Verified Agent</span>
						</div>
					</CardContent>
				</Card>

				{/* Security & Password Section */}
				<Card className='rounded-3xl border-border/50 mt-8'>
					<CardHeader className='pb-4 border-b border-border/50 mb-6'>
						<CardTitle className='text-xl'>Security</CardTitle>
						<CardDescription>Update your password. Leave blank if you don't want to change it.</CardDescription>
					</CardHeader>
					<CardContent className='space-y-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='space-y-2'>
								<Label htmlFor='currentPassword'>Current Password</Label>
								<Input
									id='currentPassword'
									type='password'
									placeholder='••••••••'
									value={formData.currentPassword}
									onChange={handleChange}
									className='rounded-full h-11!'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='newPassword'>New Password</Label>
								<Input
									id='newPassword'
									type='password'
									placeholder='••••••••'
									value={formData.newPassword}
									onChange={handleChange}
									className='rounded-full h-11!'
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Submit Form Action */}
				<div className='mt-8 flex justify-end'>
					<Button
						type='submit'
						className='rounded-full h-11! px-8 font-bold'
						disabled={isLoading}
					>
						{isLoading ? (
							<>
								<Loader2 className='w-5 h-5 mr-2 animate-spin' />
								Saving...
							</>
						) : (
							"Save Changes"
						)}
					</Button>
				</div>
			</form>

			{/* Danger Zone: Account Deletion Section */}
			<Card className='rounded-3xl border-destructive/20 mt-12 bg-destructive/5'>
				<CardHeader className='pb-4'>
					<CardTitle className='text-xl text-destructive flex items-center gap-2'>
						<AlertTriangle className='w-5 h-5' />
						Danger Zone
					</CardTitle>
					<CardDescription className='text-destructive/80'>
						Permanently delete your account and all of your listings.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{/* Toggle between the initial delete button and the confirmation view */}
					{!showDeleteConfirm ? (
						<Button
							variant='destructive'
							className='rounded-full h-11 px-6 font-bold'
							onClick={() => setShowDeleteConfirm(true)}
						>
							Delete Account
						</Button>
					) : (
						<div className='bg-destructive/10 border border-destructive/20 p-6 rounded-3xl'>
							<p className='font-bold text-destructive mb-4'>
								Are you absolutely sure? This action cannot be undone.
							</p>
							<div className='flex items-center gap-3'>
								<Button
									variant='destructive'
									className='rounded-full h-11 px-6 font-bold'
									onClick={handleDeleteAccount}
									disabled={isDeleting}
								>
									{isDeleting ? (
										<Loader2 className='w-4 h-4 mr-2 animate-spin' />
									) : null}
									Yes, delete my account
								</Button>
								<Button
									variant='outline'
									className='rounded-full h-11 px-6 font-bold border-destructive/30 hover:bg-destructive/10 text-destructive'
									onClick={() => setShowDeleteConfirm(false)}
									disabled={isDeleting}
								>
									Cancel
								</Button>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
