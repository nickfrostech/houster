/** @format */

import { BarChart3, Building, Eye, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * DashboardOverview Component
 * 
 * Shows high-level statistics and performance metrics for the agent's properties.
 */
export function DashboardOverview() {
	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Dashboard Overview</h1>
				<p className='text-muted-foreground mt-2'>
					Welcome back! Here's a quick summary of your property performance.
				</p>
			</div>

			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
				<Card className='rounded-3xl border-border/50 bg-linear-to-br from-background to-muted/30 overflow-hidden relative group'>
					<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500" />
					<CardHeader className='flex flex-row items-center justify-between pb-2 relative z-10'>
						<CardTitle className='text-sm font-semibold text-muted-foreground'>
							Total Listings
						</CardTitle>
						<div className="p-2.5 bg-primary/10 rounded-full">
							<Building className='w-4 h-4 text-primary' />
						</div>
					</CardHeader>
					<CardContent className="relative z-10">
						<div className='text-4xl font-black'>12</div>
						<p className='text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1'>
							<span className="bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full">+2</span> from last month
						</p>
					</CardContent>
				</Card>

				<Card className='rounded-3xl border-border/50 bg-linear-to-br from-background to-muted/30 overflow-hidden relative group'>
					<div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500" />
					<CardHeader className='flex flex-row items-center justify-between pb-2 relative z-10'>
						<CardTitle className='text-sm font-semibold text-muted-foreground'>
							Active Views
						</CardTitle>
						<div className="p-2.5 bg-blue-500/10 rounded-full">
							<Eye className='w-4 h-4 text-blue-500' />
						</div>
					</CardHeader>
					<CardContent className="relative z-10">
						<div className='text-4xl font-black'>1,245</div>
						<p className='text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1'>
							<span className="bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full">+18%</span> from last month
						</p>
					</CardContent>
				</Card>

				<Card className='rounded-3xl border-border/50 bg-linear-to-br from-background to-muted/30 overflow-hidden relative group'>
					<div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500" />
					<CardHeader className='flex flex-row items-center justify-between pb-2 relative z-10'>
						<CardTitle className='text-sm font-semibold text-muted-foreground'>
							Inquiries
						</CardTitle>
						<div className="p-2.5 bg-emerald-500/10 rounded-full">
							<MessageSquare className='w-4 h-4 text-emerald-500' />
						</div>
					</CardHeader>
					<CardContent className="relative z-10">
						<div className='text-4xl font-black'>48</div>
						<p className='text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1'>
							<span className="bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full">+12</span> new this week
						</p>
					</CardContent>
				</Card>

				<Card className='rounded-3xl border-border/50 bg-linear-to-br from-background to-muted/30 overflow-hidden relative group'>
					<div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500" />
					<CardHeader className='flex flex-row items-center justify-between pb-2 relative z-10'>
						<CardTitle className='text-sm font-semibold text-muted-foreground'>
							Conversion Rate
						</CardTitle>
						<div className="p-2.5 bg-orange-500/10 rounded-full">
							<BarChart3 className='w-4 h-4 text-orange-500' />
						</div>
					</CardHeader>
					<CardContent className="relative z-10">
						<div className='text-4xl font-black'>3.8%</div>
						<p className='text-xs font-medium text-orange-600 mt-2 flex items-center gap-1'>
							Steady growth
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Placeholder for future charts or recent activity */}
			<div className='grid gap-6 md:grid-cols-2'>
				<Card className='rounded-3xl border-border/50'>
					<CardHeader>
						<CardTitle className="text-xl">Recent Activity</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex items-center justify-center h-56 text-muted-foreground text-sm bg-muted/30 border border-dashed border-border/50 rounded-2xl'>
							Activity feed will appear here
						</div>
					</CardContent>
				</Card>
				<Card className='rounded-3xl border-border/50'>
					<CardHeader>
						<CardTitle className="text-xl">Performance Chart</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex items-center justify-center h-56 text-muted-foreground text-sm bg-muted/30 border border-dashed border-border/50 rounded-2xl'>
							Analytics charts will appear here
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
