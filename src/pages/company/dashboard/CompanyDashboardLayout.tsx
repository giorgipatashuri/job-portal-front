import { Router, MenuIcon, Route } from "lucide-react";
import { useState } from "react";
import { Outlet, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../../../components/Header";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-20 px-4 py-2 border-b">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-green-600"
          >
            <MenuIcon size={24} />
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30">
            <div className="bg-white w-64 h-full">
              <Sidebar onLinkClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        )}
        <div className="flex-1 container mt-14 md:mt-0">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
