/** @format */

import { MessageSquare, ShieldCheck, Flag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Hostel } from "@/lib/types";

export function HostelSidebar({ hostel }: { hostel: Hostel }) {
	return (
		<div className='flex flex-col gap-6 sticky top-24'>
			{/* Price Card */}
			<Card className='p-6 rounded-2xl shadow-sm border-border/50'>
				<div className='text-3xl font-black text-foreground mb-4 tracking-tight'>
					{hostel.price}
				</div>
			</Card>

			{/* Agent Card */}
			<Card className='p-6 rounded-2xl shadow-sm border-border/50'>
				<div className='flex items-center gap-4 mb-6'>
					<Avatar className='w-16 h-16 border-2 border-primary/20'>
						<AvatarImage
							src={hostel.agent?.avatar}
							alt={hostel.agent?.name || "Agent"}
						/>
						<AvatarFallback className='text-lg font-bold'>
							{hostel.agent?.name?.charAt(0) || "A"}
						</AvatarFallback>
					</Avatar>
					<div>
						<h3 className='font-bold text-lg text-foreground'>
							{hostel.agent?.name || "Verified Agent"}
						</h3>
						<div className='text-sm text-muted-foreground mt-0.5 space-y-0.5'>
							<div>{hostel.agent?.joined || "Recently joined"}</div>
							{hostel.agent?.verified && (
								<div className='flex items-center gap-1 text-emerald-600 font-medium'>
									<ShieldCheck className='w-4 h-4' />
									Verified ID
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='flex flex-col gap-3'>
					<Button className='w-full rounded-full h-12 font-bold gap-2'>
						<MessageSquare className='w-5 h-5' />
						WhatsApp Agent
					</Button>
					<Button
						variant='outline'
						className='w-full rounded-full h-12 font-bold gap-2'
					>
						<Eye className='w-5 h-5' />
						View Agent
					</Button>
				</div>
			</Card>

			{/* Actions Row */}
			<div className='flex items-center justify-between px-2 text-sm'>
				<Button
					variant='link'
					className='text-destructive hover:text-destructive/80 h-auto p-0 gap-1.5'
				>
					<Flag className='w-4 h-4' />
					Report Abuse
				</Button>
			</div>

			{/* Safety Tips */}
			<Card className='p-6 rounded-2xl shadow-sm border-border/50 bg-secondary/20'>
				<h3 className='font-bold text-lg text-foreground mb-4 text-center'>
					Safety tips
				</h3>
				<ul className='text-sm text-muted-foreground space-y-3 list-disc pl-4 marker:text-primary'>
					<li>Avoid paying in advance, even for securing a room</li>
					<li>Meet the agent or landlord at a safe public place</li>
					<li>Inspect the hostel and ensure it's exactly what you want</li>
					<li>Ensure the previous tenant has cleared all bills</li>
					<li>Only pay if you're satisfied and documents are signed</li>
				</ul>
			</Card>

			<Button
				variant='outline'
				className='w-full rounded-full h-12 font-bold border-green-600 text-green-600 hover:bg-green-50'
			>
				Post Ad Like This
			</Button>
		</div>
	);
}
