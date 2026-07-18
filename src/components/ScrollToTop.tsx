import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		// Scroll to the top of the document smoothly on route change
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant", // Use "instant" rather than "smooth" to prevent seeing the scroll happen during navigation
		});
	}, [pathname]);

	return null;
}
