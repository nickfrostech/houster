import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		const isDark = document.documentElement.classList.contains("dark");
		setTheme(isDark ? "light" : "dark");
	};

	const isDarkTheme = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors border border-border cursor-pointer"
			aria-label="Toggle theme"
		>
			{isDarkTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
		</button>
	);
}
