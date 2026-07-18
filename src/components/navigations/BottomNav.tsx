import { Home, Building2, UserSearch, LayoutDashboard } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
	{ href: "/", label: "Home", icon: Home },
	{ href: "/hostels", label: "Hostels", icon: Building2 },
	{ href: "/agents", label: "Agents Search", icon: UserSearch },
	{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function BottomNav() {
	const pathname = window.location.pathname;
	const [optimisticPath, setOptimisticPath] = useState(pathname);

	useEffect(() => {
		setOptimisticPath(pathname);
	}, [pathname]);

	const handleNav = (href: string) => {
		if (optimisticPath === href) return;
		setOptimisticPath(href);
		window.location.href = href; // temporary until react-router
	};

	return (
		<nav className='md:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center z-50 w-full bg-background/80 backdrop-blur-md border-t border-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe'>
			{NAV_ITEMS.map(({ href, label, icon: Icon }) => {
				const isActive = optimisticPath === href;

				return (
					<button
						key={href}
						onClick={() => handleNav(href)}
						className={`relative flex flex-col items-center gap-1 py-3 transition-all flex-1 cursor-pointer`}
					>
						{isActive && (
							<motion.div
								layoutId='nav-pill'
								className='absolute inset-0'
								transition={{
									type: "spring",
									stiffness: 380,
									damping: 30,
								}}
							/>
						)}

						<motion.div
							animate={{
								scale: isActive ? 1.15 : 1,
								y: isActive ? -2 : 0,
							}}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 25,
							}}
							className='relative z-10'
						>
							<Icon
								className={`w-5 h-5 transition-colors box-content rounded-full px-4 py-1 ${
									isActive
										? "text-primary bg-primary/15"
										: "text-muted-foreground"
								}`}
							/>
						</motion.div>

						<span
							className={`relative z-10 text-[10px] font-bold transition-colors ${
								isActive ? "text-primary" : "text-muted-foreground"
							}`}
						>
							{label}
						</span>
					</button>
				);
			})}
		</nav>
	);
}
