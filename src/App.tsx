import { useState } from "react";
import "./App.css";

import JobCategories from "./components/JobCategories";
import Banner from "./components/Banner";
import Header from "./components/Header";
import HrBanner from "./components/HrBanner";
import { Outlet } from "react-router-dom";
import Benefits from "./components/Benefits";
import Login from "./pages/Login";
import CvSection from "./components/CvSection";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Outlet />
      <div className="max-w-screen-2xl container mx-auto py-20 xl:px-24 px-4 md:py-20 py-14 ">
        <Banner />
      </div>
      <JobCategories />
      <CvSection />
      <div className="max-w-screen-2xl container mx-auto py-20 xl:px-24 px-4 md:py-20 py-14 ">
        <HrBanner />
      </div>
      <Benefits />
    </div>
  );
}

export default App;
