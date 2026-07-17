import { useState } from "react";
import {
	Home,
	Search,
	X,
	Building2,
	UserSearch,
	LogIn,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "../ThemeToggle";

const APP_NAME = import.meta.env.VITE_APP_NAME || "Houster";

/* 
 * BACKEND INTEGRATION NOTE:
 * The frontend will handle navigation state. If the user logs in, the backend should return 
 * a JWT or set an HTTP-only session cookie. Once logged in, the "Login" link should dynamically 
 * change to "Dashboard" or "Profile". For now, it's statically set to Login.
 */

export default function Header() {
	const [searchOpen, setSearchOpen] = useState(false);
	const [query, setQuery] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (!query.trim()) return;
		console.log("Searching for:", query.trim());
		setSearchOpen(false);
		setQuery("");
	};

	const pathname = window.location.pathname;

	const NAV_ITEMS = [
		{ href: "/", label: "Home", icon: Home },
		{ href: "/hostels", label: "Hostels", icon: Building2 },
		{ href: "/agents", label: "Agents Search", icon: UserSearch },
	];

	return (
		<header className='sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md px-4 lg:px-15 py-3 border-b border-border shadow-sm'>
			<div className='max-w-full mx-auto flex items-center justify-between gap-4'>
				{/* Left: Logo & Nav */}
				<div className='flex items-center gap-10'>
					<a href='/' className='flex items-center gap-2 text-primary'>
						{/* <Building2 className='w-8 h-8 text-primary' /> */}
						<h2 className='text-2xl text-foreground font-black capitalize tracking-tight'>
							{APP_NAME}
						</h2>
					</a>

					<nav className='hidden md:flex items-end justify-stretch gap-2'>
						{NAV_ITEMS.map(({ href, label, icon: Icon }) => {
							const isActive = pathname === href;

							return (
								<a
									key={href}
									href={href}
									tabIndex={1}
									className={`flex items-center gap-2 px-4 py-2 font-semibold transition-all ${
										isActive
											? "text-primary bg-primary/10 rounded-full"
											: "text-muted-foreground hover:text-foreground hover:bg-muted rounded-full"
									}`}
								>
									<Icon className='w-4 h-4' />
									{label}
								</a>
							);
						})}
					</nav>
				</div>

				{/* Right: Search, Theme Toggle, Login */}
				<div className='flex items-center gap-3'>
					<AnimatePresence initial={false} mode='wait'>
						{searchOpen ? (
							<motion.form
								key='search-input'
								initial={{ width: 40, opacity: 0 }}
								animate={{ width: 220, opacity: 1 }}
								exit={{ width: 40, opacity: 0 }}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 28,
								}}
								onSubmit={handleSearch}
								className='flex items-center gap-2 px-3 py-2 bg-muted border border-border rounded-full overflow-hidden shadow-inner'
							>
								<Search className='w-4 h-4 text-muted-foreground shrink-0' />
								<input
									autoFocus
									type='text'
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder='Search hostels...'
									className='flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground min-w-0'
								/>
								<button
									title='Cancel Search'
									type='button'
									onClick={() => { setSearchOpen(false); setQuery(""); }}
									className='text-muted-foreground hover:text-foreground transition-colors shrink-0'
								>
									<X className='w-4 h-4' />
								</button>
							</motion.form>
						) : (
							<motion.button
								key='search-button'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={() => setSearchOpen(true)}
								className='flex items-center gap-2 px-4 py-2 bg-background border border-border shadow-sm rounded-full text-muted-foreground text-sm font-medium hover:text-foreground hover:bg-muted/50 transition-colors'
							>
								<Search className='w-4 h-4' />
								<span className='hidden md:inline'>Search...</span>
							</motion.button>
						)}
					</AnimatePresence>

					<ThemeToggle />

					<a 
						href="/login"
						className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
					>
						<LogIn className="w-4 h-4" />
						Login
					</a>
				</div>
			</div>
		</header>
	);
}
