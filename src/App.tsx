/** @format */

import { Routes, Route } from "react-router-dom";
import Header from "@/components/navigations/header";
import { BottomNav } from "@/components/navigations/BottomNav";
import Footer from "@/components/navigations/footer";
import "./App.css";
import LandingPage from "@/pages/LandindPage";
import { HostelPage } from "@/pages/HostelPage";
import { HostelDetailsPage } from "@/pages/HostelDetailsPage";

/*
 * BACKEND INTEGRATION NOTE:
 * This is the main application entry point. React Router handles all the routing.
 * When additional pages are created (e.g. LoginPage, SearchPage), they will be
 * added to the <Routes> block below.
 */

function App() {
	return (
		<div className='min-h-screen flex flex-col bg-background font-sans text-foreground'>
			<Header />
			<main className='grow pb-24 md:pb-0'>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/hostels' element={<HostelPage />} />
					<Route path='/hostels/:id' element={<HostelDetailsPage />} />
				</Routes>
			</main>
			<Footer />
			<BottomNav />
		</div>
	);
}

export default App;
