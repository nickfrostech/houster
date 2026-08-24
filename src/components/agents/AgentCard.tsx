/** @format */

import { Link } from "react-router-dom";
import { ShieldCheck, Building, Phone } from "lucide-react";
import type { Agent } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AgentCardProps {
	agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
	return (
		<Card className='overflow-hidden rounded-3xl border-border/50 hover:shadow-md transition-shadow bg-background'>
			<CardContent className='p-6 flex flex-col h-full'>
				<div className='flex items-start gap-4 mb-4'>
					{/* Avatar */}
					<div className='relative w-16 h-16 shrink-0'>
						<img
							src={agent.avatar}
							alt={agent.name}
							className='w-full h-full object-cover rounded-full'
						/>
						{agent.verified && (
							<div className='absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full border-2 border-background'>
								<ShieldCheck className='w-3.5 h-3.5' />
							</div>
						)}
					</div>

					{/* Info */}
					<div className='flex-1 min-w-0'>
						<h3 className='font-bold text-lg line-clamp-1'>{agent.name}</h3>
						<p className='text-sm text-muted-foreground'>{agent.role}</p>
						<p className='text-xs text-muted-foreground mt-0.5'>Joined {formatRelativeTime(agent.joinedAt)}</p>
					</div>
				</div>

				{/* Stats & Quick Actions */}
				<div className='mt-auto pt-4 border-t border-border/50 space-y-4'>
					<div className='flex items-center gap-2 text-sm font-medium'>
						<Building className='w-4 h-4 text-primary' />
						<span>{agent.activePropertiesCount} Active Properties</span>
					</div>

					<div className='flex items-center gap-3'>
						<Link to={`/agent/${agent.id}`} className='flex-1'>
							<Button variant='secondary' className='w-full rounded-full font-bold h-10'>
								View Profile
							</Button>
						</Link>
						<Button variant='default' size='icon' className='rounded-full shrink-0 h-10 w-10'>
							<Phone className='w-4 h-4' />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
