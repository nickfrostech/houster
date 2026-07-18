/** @format */

import { Routes, Route } from "react-router-dom";
import Header from "@/components/navigations/header";
import { BottomNav } from "@/components/navigations/BottomNav";
import Footer from "@/components/navigations/footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./App.css";
import LandingPage from "@/pages/LandindPage";
import { HostelPage } from "@/pages/HostelPage";
import { HostelDetailsPage } from "@/pages/HostelDetailsPage";
import { AgentPage } from "@/pages/AgentPage";
import { AgentProfilePage } from "@/pages/AgentProfilePage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignupPage";

// Dashboard
import { DashboardLayout } from "@/pages/dashboard/DashboardLayout";
import { DashboardOverview } from "@/pages/dashboard/DashboardOverview";
import { DashboardListings } from "@/pages/dashboard/DashboardListings";
import { CreateListingPage } from "@/pages/dashboard/CreateListingPage";
import { DashboardSettings } from "@/pages/dashboard/DashboardSettings";

/*
 * BACKEND INTEGRATION NOTE:
 * This is the main application entry point. React Router handles all the routing.
 * - Protect dashboard routes via a higher order component or layout check if `user` isn't authenticated.
 */

function App() {
	return (
		<div className='min-h-screen flex flex-col bg-background font-sans text-foreground'>
			<ScrollToTop />
			<Header />
			<main className='grow pb-24 md:pb-0'>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/hostels' element={<HostelPage />} />
					<Route path='/hostels/:id' element={<HostelDetailsPage />} />
					<Route path='/agents' element={<AgentPage />} />
					<Route path='/agent/:id' element={<AgentProfilePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/signup' element={<SignupPage />} />

					{/* Dashboard Routes */}
					<Route path='/dashboard' element={<DashboardLayout />}>
						<Route index element={<DashboardOverview />} />
						<Route path='listings' element={<DashboardListings />} />
						<Route path='listings/new' element={<CreateListingPage />} />
						<Route path='listings/:id/edit' element={<CreateListingPage />} />
						<Route path='settings' element={<DashboardSettings />} />
					</Route>
				</Routes>
			</main>
			<Footer />
			<BottomNav />
		</div>
	);
}

export default App;
