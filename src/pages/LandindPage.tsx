/** @format */
import { LandingSteps } from "@/components/landing/LandingSteps";
import { RecentHostel } from "@/components/landing/RecentHostel";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingFAQ } from "@/components/landing/LandingFAQ";
import { LandingCTA } from "@/components/landing/LandingCTA";
import Hero from "@/components/landing/Hero";

function LandingPage() {
	return (
		<>
			<Hero />
			<LandingSteps />
			<RecentHostel />
			<LandingFeatures />
			<LandingFAQ />
			<LandingCTA />
		</>
	);
}

export default LandingPage;
