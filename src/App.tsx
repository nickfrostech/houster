import { Routes, Route } from "react-router-dom";
import Header from "./components/navigations/header";
import Hero from "./components/navigations/Hero";
import { BottomNav } from "./components/navigations/BottomNav";
import Footer from "./components/navigations/footer";
import "./App.css";

/*
 * BACKEND INTEGRATION NOTE:
 * This is the main application entry point. React Router handles all the routing.
 * When additional pages are created (e.g. LoginPage, SearchPage), they will be 
 * added to the <Routes> block below.
 */

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <Header />
      <main className="flex-grow pb-24 md:pb-0">
        <Routes>
          <Route path="/" element={<Hero />} />
          {/* We will add other routes here later */}
          <Route path="*" element={<Hero />} />
        </Routes>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

export default App;
