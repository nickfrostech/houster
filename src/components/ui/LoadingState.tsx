/** @format */

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
	text?: string;
	className?: string;
}

export function LoadingState({ text = "Loading...", className }: LoadingStateProps) {
	return (
		<div className={cn("flex flex-col items-center justify-center p-12 min-h-[200px]", className)}>
			<Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
			<p className="text-muted-foreground font-medium animate-pulse">{text}</p>
		</div>
	);
}
