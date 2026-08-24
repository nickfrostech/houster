/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, MapPin, Building2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { RECENT_HOSTELS } from "@/lib/mock_data";
import { formatNaira } from "@/lib/utils";

/**
 * DashboardListings Component
 * 
 * Displays the properties an agent has posted, allowing them to edit, delete,
 * or add new properties.
 */
export function DashboardListings() {
	// Initialize with mock data to simulate an agent's listings
	const [listings, setListings] = useState(RECENT_HOSTELS.slice(0, 4));
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const handleDeleteConfirm = (id: string) => {
		// Mock delete functionality
		setListings((prev) => prev.filter((hostel) => hostel.id !== id));
		setDeletingId(null);
	};

	return (
		<div className='space-y-8 pb-12'>
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>My Listings</h1>
					<p className='text-muted-foreground mt-2'>
						Manage your posted properties, update details, or remove unavailable ones.
					</p>
				</div>
				<Link to='/dashboard/listings/new'>
					<Button className='rounded-full h-11 px-6 font-bold'>
						<Plus className='w-5 h-5 mr-2' />
						Add New Listing
					</Button>
				</Link>
			</div>

			{listings.length === 0 ? (
				<div className='flex flex-col items-center justify-center p-12 bg-background border border-dashed rounded-4xl text-center shadow-sm'>
					<div className='w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6'>
						<Building2 className='w-10 h-10 text-primary' />
					</div>
					<h3 className='text-2xl font-bold tracking-tight'>No listings yet</h3>
					<p className='text-muted-foreground mt-2 max-w-sm font-medium'>
						You haven't posted any hostels. Click the "Add New Listing" button to reach thousands of students today.
					</p>
				</div>
			) : (
				<div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
					{listings.map((hostel) => (
						<motion.div
							key={hostel.id}
							whileHover={{ y: -4 }}
							className='bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col'
						>
							<div className='relative aspect-video overflow-hidden bg-muted group'>
								<img
									src={hostel.images?.[0] || hostel.image}
									alt={hostel.title}
									className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
								/>
								<div className='absolute top-3 left-3 flex gap-2 flex-wrap'>
									<Badge
										variant='secondary'
										className='bg-background/90 backdrop-blur-sm text-foreground font-semibold shadow-sm rounded-md px-2 py-1'
									>
										{hostel.type}
									</Badge>
								</div>
								{hostel.negotiable && (
									<div className='absolute top-3 right-3'>
										<Badge className='bg-green-500/90 hover:bg-green-600/90 text-white backdrop-blur-sm shadow-sm border-none rounded-md px-2 py-1'>
											Negotiable
										</Badge>
									</div>
								)}
							</div>
							
							<div className='p-4 flex flex-col grow'>
								<div className='flex items-start justify-between gap-2 mb-1.5'>
									<h3 className='font-bold text-lg text-foreground line-clamp-1 hover:text-primary transition-colors'>
										{hostel.title}
									</h3>
								</div>
								<div className='flex items-center text-muted-foreground text-xs mb-3 font-medium'>
									<MapPin className='w-3.5 h-3.5 mr-1 text-primary shrink-0' />
									<span className='truncate'>{hostel.location} Campus</span>
								</div>
								<p className='text-muted-foreground text-sm line-clamp-2 mb-4 grow leading-relaxed'>
									{hostel.description}
								</p>
								
								<div className='mt-auto pt-4 border-t border-border/60 flex flex-col gap-4'>
									<div className='flex items-center justify-between'>
										<div className='flex flex-col'>
											<span className='text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-0.5'>
												Rent
											</span>
											<div className='flex items-baseline gap-1'>
												<span className='text-lg font-black text-primary'>
													{formatNaira(hostel.price)}
												</span>
												<span className='text-xs text-muted-foreground font-medium'>
													/{hostel.period}
												</span>
											</div>
										</div>
									</div>

									{/* Action Buttons */}
									<div className='flex items-center gap-3'>
										{deletingId === hostel.id ? (
											<div className='flex-1 flex items-center gap-2 bg-destructive/10 text-destructive p-2.5 rounded-2xl text-sm font-semibold h-11'>
												<AlertTriangle className='w-5 h-5 shrink-0' />
												<span className='flex-1 text-center'>Delete?</span>
												<Button
													size='sm'
													variant='ghost'
													className='h-8 px-3 hover:bg-destructive/20 text-destructive rounded-full'
													onClick={() => handleDeleteConfirm(hostel.id)}
												>
													Yes
												</Button>
												<Button
													size='sm'
													variant='ghost'
													className='h-8 px-3 hover:bg-muted text-foreground rounded-full'
													onClick={() => setDeletingId(null)}
												>
													No
												</Button>
											</div>
										) : (
											<>
												<Link to={`/dashboard/listings/${hostel.id}/edit`} className='flex-1'>
													<Button variant='outline' className='w-full rounded-full h-11 border-border/60 hover:bg-muted font-bold'>
														<Edit className='w-4 h-4 mr-2' />
														Edit Listing
													</Button>
												</Link>
												<Button
													variant='destructive'
													className='rounded-full h-11 w-11 p-0 shrink-0'
													onClick={() => setDeletingId(hostel.id)}
												>
													<Trash2 className='w-5 h-5' />
												</Button>
											</>
										)}
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
}
