/** @format */

import { AlertCircle } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
	title?: string;
	message?: string;
	onRetry?: () => void;
	className?: string;
}

export function ErrorState({ 
	title = "Something went wrong", 
	message = "We encountered an error while loading the data. Please try again.", 
	onRetry,
	className 
}: ErrorStateProps) {
	return (
		<div className={cn("flex flex-col items-center justify-center p-12 text-center border border-destructive/20 bg-destructive/5 rounded-3xl min-h-[200px]", className)}>
			<AlertCircle className="w-11 h-11 text-destructive mb-4" />
			<h3 className="text-lg font-bold mb-2">{title}</h3>
			<p className="text-muted-foreground max-w-sm mb-6">{message}</p>
			{onRetry && (
				<Button onClick={onRetry} variant="outline" className="rounded-full">
					Try Again
				</Button>
			)}
		</div>
	);
}
