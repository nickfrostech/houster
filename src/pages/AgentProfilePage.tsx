/** @format */

import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Phone, Building, CalendarDays } from "lucide-react";
import { MOCK_AGENTS, RECENT_HOSTELS } from "@/lib/mock_data";
import { HostelCard } from "@/components/hostels/HostelCard";
import { Button } from "@/components/ui/button";
import { cn, formatRelativeTime } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function AgentProfilePage() {
	const { id } = useParams<{ id: string }>();

	// Fetch Agent
	const agent = MOCK_AGENTS.find((a) => a.id === id);

	// Mock fetch agent's listings
	// In a real app we'd fetch hostels filtered by agentId
	const agentListings = RECENT_HOSTELS.slice(0, agent?.activePropertiesCount || 4);

	if (!agent) {
		return (
			<div className='min-h-[60vh] flex flex-col items-center justify-center p-4 text-center'>
				<h2 className='text-2xl font-bold mb-2'>Agent Not Found</h2>
				<p className='text-muted-foreground mb-6'>
					The agent profile you are looking for does not exist or has been removed.
				</p>
				<Link to='/agents'>
					<Button className='rounded-full'>Back to Agents</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className='min-h-screen pb-20'>
			{/* Cover & Biodata Section */}
			<section className='bg-secondary/20 border-b border-border/50'>
				<div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16'>
					{/* Back Button */}
					<Link to='/agents' className='inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors'>
						<ArrowLeft className='w-4 h-4 mr-2' />
						Back to Search
					</Link>

					<div className='flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10'>
						{/* Avatar */}
						<div className='relative w-32 h-32 md:w-40 md:h-40 shrink-0'>
							<img
								src={agent.avatar}
								alt={agent.name}
								className='w-full h-full object-cover rounded-full border-4 border-background'
							/>
							{agent.verified && (
								<div className='absolute bottom-1 right-1 bg-green-500 text-white p-2 rounded-full border-4 border-background'>
									<ShieldCheck className='w-5 h-5' />
								</div>
							)}
						</div>

						{/* Details */}
						<div className='flex-1 space-y-4'>
							<div>
								<div className='flex items-center gap-3 mb-1'>
									<h1 className='text-3xl md:text-4xl font-black tracking-tight'>{agent.name}</h1>
									{agent.verified && (
										<span className='hidden sm:inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md'>
											Verified
										</span>
									)}
								</div>
								<p className='text-lg text-muted-foreground font-medium'>{agent.role}</p>
							</div>

							<div className='flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground'>
								<div className='flex items-center gap-1.5'>
									<CalendarDays className='w-4 h-4 shrink-0' />
									Joined {formatRelativeTime(agent.joinedAt)}
								</div>
								<div className='flex items-center gap-1.5'>
									<Building className='w-4 h-4 shrink-0 text-primary' />
									{agent.activePropertiesCount} Active Listings
								</div>
							</div>
						</div>

						{/* Action */}
						<div className='w-full md:w-auto shrink-0'>
							<a href={`tel:${agent.phone}`}>
								<Button size='lg' className='w-full md:w-auto rounded-full h-14 px-8 font-bold text-base'>
									<Phone className='w-5 h-5 mr-2' />
									Contact Agent
								</Button>
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Listings Section */}
			<section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16'>
				<div className='mb-8'>
					<h2 className='text-2xl font-bold tracking-tight'>Active Listings by {agent.name.split(' ')[0]}</h2>
					<p className='text-muted-foreground mt-1'>
						Browse all available properties posted by this {agent.role.toLowerCase()}.
					</p>
				</div>

				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{agentListings.map((hostel) => (
						<HostelCard key={hostel.id} hostel={hostel} />
					))}
				</div>

				{agentListings.length === 0 && (
					<div className='text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border'>
						<Building className='w-12 h-12 mx-auto text-muted-foreground/50 mb-4' />
						<h3 className='text-lg font-bold'>No active listings</h3>
						<p className='text-muted-foreground'>This agent currently has no properties available.</p>
					</div>
            )}
            
            <div className='mt-10 flex justify-center gap-2 flex-wrap'>
                        <Link
                           to='/agents'
                           className={cn(
                              buttonVariants({ variant: "default", size: "lg" }),
                              "rounded-full px-8 py-6 font-bold",
                           )}
                        >
                           View All Agents
                        </Link>
                        <Link
                           to='/hostels'
                           className={cn(
                              buttonVariants({ variant: "secondary", size: "lg" }),
                              "rounded-full px-8 py-6 font-bold",
                           )}
                        >
                           View All Hostels
                        </Link>
                     </div>
			</section>
		</div>
	);
}
