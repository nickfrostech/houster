/** @format */

import { useState, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, UploadCloud, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RECENT_HOSTELS } from "@/lib/mock_data";

const MAX_FACILITIES = 8;
const MAX_DESCRIPTION_LENGTH = 500;
const MAX_MEDIA_FILES = 4;

/**
 * CreateListingPage Component
 *
 * Provides a multi-step-like form to create a new property listing or edit an existing one.
 */
export function CreateListingPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const isEditMode = Boolean(id);

	const [isLoading, setIsLoading] = useState(false);
	const [facilityInput, setFacilityInput] = useState("");

	// Expanded state for the form
	const [formData, setFormData] = useState({
		title: "",
		price: "",
		period: "yr",
		negotiable: false,
		type: "",
		campus: "",
		customCampus: "",
		units: "",
		facilities: [] as string[],
		description: "",
		landmark: "",
	});

	// Pre-fill if in edit mode
	useEffect(() => {
		if (isEditMode) {
			const hostel = RECENT_HOSTELS.find((h) => h.id === id);
			if (hostel) {
				const isDefaultCampus = ["Oye", "Ikole", "Ido"].includes(
					hostel.location,
				);
				setFormData({
					title: hostel.title,
					price: hostel.price.replace(/,/g, ""),
					period: hostel.period || "yr",
					negotiable: hostel.negotiable || false,
					type: hostel.type,
					campus: isDefaultCampus
						? hostel.location.toLowerCase()
						: "others",
					customCampus: isDefaultCampus ? "" : hostel.location,
					units: hostel.unitsAvailable?.toString() || "1",
					facilities: hostel.facilities || [],
					description: hostel.description || "",
					landmark: hostel.closestLandmark || "",
				});
			}
		}
	}, [id, isEditMode]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { id, value } = e.target;
		if (id === "description" && value.length > MAX_DESCRIPTION_LENGTH) return;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSelectChange = (key: string, value: string | null) => {
		if (value !== null) {
			setFormData((prev) => ({ ...prev, [key]: value }));
		}
	};

	const handleSwitchChange = (checked: boolean) => {
		setFormData((prev) => ({ ...prev, negotiable: checked }));
	};

	// Facilities Tag Logic
	const handleFacilityKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			addFacility();
		}
	};

	const addFacility = () => {
		const trimmed = facilityInput.trim();
		if (
			trimmed &&
			formData.facilities.length < MAX_FACILITIES &&
			!formData.facilities.includes(trimmed)
		) {
			setFormData((prev) => ({
				...prev,
				facilities: [...prev.facilities, trimmed],
			}));
			setFacilityInput("");
		}
	};

	const removeFacility = (indexToRemove: number) => {
		setFormData((prev) => ({
			...prev,
			facilities: prev.facilities.filter((_, idx) => idx !== indexToRemove),
		}));
	};

	/*
	 * BACKEND INTEGRATION NOTE:
	 * POST /api/hostels (Create) OR PUT /api/hostels/:id (Edit)
	 */
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Mock network delay
		setTimeout(() => {
			setIsLoading(false);
			navigate("/dashboard/listings");
		}, 1500);
	};

	return (
		<div className='max-w-4xl mx-auto space-y-8 pb-12'>
			{/* Header */}
			<div className='flex items-center gap-4'>
				<Link to='/dashboard/listings'>
					<Button
						variant='outline'
						size='icon'
						className='rounded-full h-11! w-11! shrink-0'
					>
						<ArrowLeft className='w-5 h-5' />
					</Button>
				</Link>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>
						{isEditMode ? "Edit Property" : "Create New Listing"}
					</h1>
					<p className='text-muted-foreground mt-1'>
						{isEditMode
							? "Update the details of your existing listing."
							: "Fill in the details below to post a new property."}
					</p>
				</div>
			</div>

			<form onSubmit={handleSubmit} className='space-y-6'>
				{/* Basic Info */}
				<Card className='rounded-4xl border-border/50'>
					<CardContent className='p-6 sm:p-8 space-y-5'>
						<div className='flex items-center gap-2 mb-2'>
							<div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold'>
								1
							</div>
							<h2 className='text-xl font-bold'>Basic Details</h2>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='title'>Property Title</Label>
							<Input
								id='title'
								placeholder='e.g. Sunshine Lodge Phase 2'
								value={formData.title}
								onChange={handleChange}
								required
								className='rounded-full h-11!'
							/>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							<div className='space-y-2'>
								<Label htmlFor='price'>Price (₦)</Label>
								<Input
									id='price'
									type='number'
									placeholder='e.g. 150000'
									value={formData.price}
									onChange={handleChange}
									required
									className='rounded-full h-11! flex-1 w-full'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='period'>Period</Label>
								<Select
									id='period'
									value={formData.period}
									onValueChange={(v) =>
										handleSelectChange("period", v)
									}
								>
									<SelectTrigger className='rounded-full h-11! w-full shrink-0'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='yr'>Per Year</SelectItem>
										<SelectItem value='mo'>Per Month</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='type'>Property Type</Label>
								<Select
									value={formData.type}
									onValueChange={(v) => handleSelectChange("type", v)}
									required
								>
									<SelectTrigger className='rounded-full h-11! w-full'>
										<SelectValue placeholder='Select type' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='self-con'>
											Self-Contain
										</SelectItem>
										<SelectItem value='single-room'>
											Single Room
										</SelectItem>
										<SelectItem value='flat'>Flat</SelectItem>
										<SelectItem value='shared'>
											Shared Room
										</SelectItem>
										<SelectItem value='others'>Others</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className='flex items-center justify-between border border-border/50 rounded-2xl py-3 px-4'>
							<div>
								<Label className='text-base font-bold'>
									Negotiable Price
								</Label>
								<p className='text-sm text-muted-foreground'>
									Are you willing to negotiate the rent amount?
								</p>
							</div>
							<Switch
								checked={formData.negotiable}
								onCheckedChange={handleSwitchChange}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Location & Features */}
				<Card className='rounded-4xl border-border/50'>
					<CardContent className='p-6 sm:p-8 space-y-5'>
						<div className='flex items-center gap-2 mb-2'>
							<div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold'>
								2
							</div>
							<h2 className='text-xl font-bold'>Location & Features</h2>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='space-y-2'>
								<Label htmlFor='campus'>Campus Location</Label>
								<Select
									value={formData.campus}
									onValueChange={(v) =>
										handleSelectChange("campus", v)
									}
									required
								>
									<SelectTrigger className='rounded-full h-11! w-full'>
										<SelectValue placeholder='Select campus' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='oye'>Oye Campus</SelectItem>
										<SelectItem value='ikole'>
											Ikole Campus
										</SelectItem>
										<SelectItem value='ido'>Ido Campus</SelectItem>
										<SelectItem value='others'>Others</SelectItem>
									</SelectContent>
								</Select>
								{formData.campus === "others" && (
									<Input
										id='customCampus'
										placeholder='Enter custom location...'
										value={formData.customCampus}
										onChange={handleChange}
										required
										className='rounded-full h-11! mt-2'
									/>
								)}
							</div>
							<div className='space-y-2'>
								<Label htmlFor='landmark'>Closest Landmark</Label>
								<Input
									id='landmark'
									placeholder='e.g. Beside First Bank, Phase 2'
									value={formData.landmark}
									onChange={handleChange}
									required
									className='rounded-full h-11!'
								/>
							</div>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='space-y-2'>
								<Label htmlFor='units'>Units Available</Label>
								<Input
									id='units'
									type='number'
									placeholder='e.g. 4'
									value={formData.units}
									onChange={handleChange}
									required
									className='rounded-full h-11!'
								/>
							</div>

							{/* Facilities Tag Input */}
							<div className='space-y-2'>
								<div className='flex justify-between items-end'>
									<Label>Facilities</Label>
									<span className='text-xs font-medium text-muted-foreground'>
										{formData.facilities.length}/{MAX_FACILITIES} Max
									</span>
								</div>
								<div className='border border-input bg-transparent rounded-3xl p-2 focus-within:ring-1 focus-within:ring-ring transition-shadow min-h-11'>
									<div className='flex flex-wrap gap-2 mb-2 px-2 pt-1'>
										{formData.facilities.map((fac, idx) => (
											<Badge
												key={idx}
												variant='secondary'
												className='px-2.5 py-1 text-sm bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-full flex items-center gap-1'
											>
												{fac}
												<button
													type='button'
													onClick={() => removeFacility(idx)}
													className='ml-1 hover:text-destructive'
												>
													<X className='w-3.5 h-3.5' />
												</button>
											</Badge>
										))}
									</div>
									<Input
										value={facilityInput}
										onChange={(e) => setFacilityInput(e.target.value)}
										onKeyDown={handleFacilityKeyDown}
										onBlur={addFacility}
										placeholder={
											formData.facilities.length < MAX_FACILITIES
												? "Type a facility & press Enter..."
												: "Limit reached"
										}
										disabled={
											formData.facilities.length >= MAX_FACILITIES
										}
										className='border-0 h-9! shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-3'
									/>
								</div>
							</div>
						</div>

						<div className='space-y-2'>
							<div className='flex justify-between items-end'>
								<Label htmlFor='description'>Full Description</Label>
								<span
									className={`text-xs font-medium ${formData.description.length === MAX_DESCRIPTION_LENGTH ? "text-destructive" : "text-muted-foreground"}`}
								>
									{formData.description.length}/
									{MAX_DESCRIPTION_LENGTH}
								</span>
							</div>
							<textarea
								id='description'
								rows={4}
								placeholder='Describe the hostel environment, distance to school, and any rules...'
								value={formData.description}
								onChange={handleChange}
								required
								className='w-full rounded-3xl border border-input bg-transparent px-5 py-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-20 max-h-[200px]'
							/>
						</div>
					</CardContent> 
				</Card>

				{/* Media Upload */}
				<Card className='rounded-3xl border-border/50 overflow-hidden'>
					<CardContent className='p-6 sm:p-8'>
						<div className='flex items-center gap-2 mb-6'>
							<div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold'>
								3
							</div>
							<div className='flex items-center justify-between flex-1'>
								<h2 className='text-xl font-bold'>Upload Media</h2>
								<span className='text-sm font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full'>
									Max {MAX_MEDIA_FILES} files (1 video max)
								</span>
							</div>
						</div>

						<div className='border-2 border-dashed border-border rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group'>
							<div className='w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
								<UploadCloud className='w-8 h-8 text-primary' />
							</div>
							<h3 className='font-bold text-lg mb-1'>
								Click or drag media to upload
							</h3>
							<p className='text-sm text-muted-foreground max-w-sm'>
								Upload high quality pictures (JPG, PNG, WEBP) or a short
								video walkthrough (MP4, max 50MB).
							</p>
						</div>

						<div className='mt-6 flex items-start gap-3 bg-blue-50/50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300 p-5 rounded-3xl border border-blue-100 dark:border-blue-800/30'>
							<Info className='w-5 h-5 shrink-0 mt-0.5 text-blue-500' />
							<p className='text-sm leading-relaxed'>
								<strong>Note for backend integration:</strong> You will
								use FormData to handle `multipart/form-data` uploads,
								looping through the local file list and validating
								limits before submission.
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Actions */}
				<div className='flex items-center justify-end gap-4'>
					<Link to='/dashboard/listings'>
						<Button
							type='button'
							variant='destructive'
							className='rounded-full h-11! px-6 font-bold'
						>
							Cancel
						</Button>
					</Link>
					<Button
						type='submit'
						className='rounded-full h-11! px-8 font-bold'
						disabled={isLoading}
					>
						{isLoading ? (
							<>
								<Loader2 className='w-5 h-5 mr-2 animate-spin' />
								{isEditMode ? "Updating..." : "Posting..."}
							</>
						) : isEditMode ? (
							"Update Property"
						) : (
							"Post Property"
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}
