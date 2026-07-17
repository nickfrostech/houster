import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		const isDark = document.documentElement.classList.contains("dark");
		setTheme(isDark ? "dark" : "light");
	}, []);

	const toggleTheme = () => {
		if (theme === "light") {
			document.documentElement.classList.add("dark");
			setTheme("dark");
		} else {
			document.documentElement.classList.remove("dark");
			setTheme("light");
		}
	};

	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:text-foreground transition-colors border border-border shadow-sm"
			aria-label="Toggle theme"
		>
			{theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
		</button>
	);
}
