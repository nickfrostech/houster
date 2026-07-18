/** @format */

import { Link, Outlet, useLocation } from "react-router-dom";
import {
	LayoutDashboard,
	List,
	Settings,
	LogOut,
	Menu,
	X,
   Plus,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const APP_NAME = import.meta.env.VITE_APP_NAME || "Houster";

const NAV_LINKS = [
	{ name: "Overview", path: "/dashboard", icon: LayoutDashboard },
	{ name: "New List", path: "/dashboard/listings/new", icon: Plus },
	{ name: "My Listings", path: "/dashboard/listings", icon: List },
	{ name: "Settings", path: "/dashboard/settings", icon: Settings },
];

/**
 * DashboardLayout Component
 * 
 * The main layout wrapper for the authenticated agent/user dashboard.
 * It provides a responsive sidebar for navigation and a main content area.
 */

export function DashboardLayout() {
	const location = useLocation();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const closeMobileMenu = () => setIsMobileMenuOpen(false);

	return (
		<div className='min-h-screen bg-muted/30 flex'>
			{/* Mobile Header / Navbar */}
			<div className='lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b z-50 flex items-center justify-between px-4'>
				<Link to='/' className='flex items-center gap-2 text-primary'>
					<h2 className='text-foreground text-xl font-black capitalize tracking-tight'>
						{APP_NAME} <span className="text-sm font-medium text-muted-foreground ml-1">Agent</span>
					</h2>
				</Link>
				<Button
					variant='ghost'
					size='icon'
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					{isMobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
				</Button>
			</div>

			{/* Sidebar */}
			<aside
				className={`fixed lg:static inset-y-0 right-0 lg:left-0 lg:right-auto z-40 w-64 bg-background border-l lg:border-l-0 lg:border-r transform transition-transform duration-200 ease-in-out flex flex-col ${
					isMobileMenuOpen ? "translate-x-0 pt-16" : "translate-x-full lg:translate-x-0"
				}`}
			>
				<div className='hidden lg:flex items-center h-16 px-6 border-b'>
					<Link to='/' className='flex items-center gap-2 text-primary'>
						<h2 className='text-foreground text-xl font-black capitalize tracking-tight'>
							{APP_NAME} <span className="text-sm font-medium text-muted-foreground ml-1">Agent</span>
						</h2>
					</Link>
				</div>

				<nav className='flex-1 py-6 px-4 space-y-2 overflow-y-auto'>
					{NAV_LINKS.map((link) => {
						const isActive = location.pathname === link.path;
						const Icon = link.icon;
						return (
							<Link
								key={link.path}
								to={link.path}
								onClick={closeMobileMenu}
								className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all font-semibold ${
									isActive
										? "bg-primary text-primary-foreground"
										: "text-muted-foreground hover:bg-muted hover:text-foreground"
								}`}
							>
								<Icon className='w-5 h-5 shrink-0' />
								{link.name}
							</Link>
						);
					})}
					{/* Logout Button directly in nav list */}
					<div className='pt-2 mt-2 border-t border-border/50'>
						<Link to='/' onClick={closeMobileMenu}>
							<Button
								variant='ghost'
								className='w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full px-4 py-3 h-auto font-semibold transition-all'
							>
								<LogOut className='w-5 h-5 mr-3 shrink-0' />
								Logout
							</Button>
						</Link>
					</div>
				</nav>
			</aside>

			{/* Main Content */}
			<main className='flex-1 flex flex-col min-w-0 pt-16 lg:pt-0'>
				<div className='flex-1 p-4 md:p-8 overflow-y-auto'>
					<Outlet />
				</div>
			</main>

			{/* Mobile Overlay */}
			{isMobileMenuOpen && (
				<div
					className='fixed inset-0 bg-black/50 z-30 lg:hidden'
					onClick={closeMobileMenu}
				/>
			)}
		</div>
	);
}
