/** @format */
import { LandingSteps } from "@/components/landing/LandingSteps";
import { RecentHostel } from "@/components/landing/RecentHostel";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingFAQ } from "@/components/landing/LandingFAQ";
import { LandingCTA } from "@/components/landing/LandingCTA";
import Hero from "@/components/landing/Hero";

/**
 * LandingPage Component
 * 
 * The root component for the homepage (/).
 * It acts as a wrapper that sequentially renders the various landing page sections.
 * Each section is isolated in its own component within `src/components/landing/`.
 */
function LandingPage() {
	return (
		<>
			{/* 1. The top header with background image and main call to action */}
			<Hero />
			
			{/* 2. Three simple steps explaining how to use the platform */}
			<LandingSteps />
			
			{/* 3. A simulated fetch of the most recently added hostel properties */}
			<RecentHostel />
			
			{/* 4. Core features and benefits grid */}
			<LandingFeatures />
			
			{/* 5. Frequently Asked Questions accordion */}
			<LandingFAQ />
			
			{/* 6. The bottom, vibrant Call to Action section */}
			<LandingCTA />
		</>
	);
}

export default LandingPage;
