import React from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Plus,
  Briefcase,
  FileText,
  LogOut,
  Building2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";

const Header = () => {
  const { isAuthenticated, user, logout, company } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  console.log(company);
  const navLinkClasses =
    "relative flex items-center gap-2 font-medium text-gray-600 px-4 py-2 rounded-lg transition-all hover:text-green-600 group";
  const iconClasses = "w-5 h-5 transition-colors";
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center transform transition-all group-hover:rotate-12">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                TalentHub
              </span>
            </a>
          </div>

          <nav className="flex items-center gap-4">
            <div className="flex items-center gap-2 mr-4">
              <a href="/jobs/" className={navLinkClasses}>
                {/* <Briefcase className={`${iconClasses} text-green-500`} /> */}
                <span className="text-base">ვაკანსიები</span>
                <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-green-500 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full" />
              </a>

              <a href="/resume/edit" className={navLinkClasses}>
                {/* <FileText className={`${iconClasses} text-emerald-500`} /> */}
                <span className="text-base">რეზიუმე</span>
                <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-emerald-500 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full" />
              </a>
            </div>

            {company && (
              <Button
                onClick={() => navigate("/company/dashboard")}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-100 hover:shadow-emerald-200 hover:scale-[1.02] transition-all"
              >
                <Plus className="w-5 h-5" />
                <span className="text-sm font-medium">ახალი ვაკანსია</span>
              </Button>
            )}

            {!isAuthenticated ? (
              <Button
                variant="outline"
                onClick={() => navigate("/user/login")}
                className="px-6 py-2 rounded-lg border-2 border-emerald-100 bg-white/90 text-green-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all font-medium shadow-sm hover:shadow-md"
              >
                შესვლა
              </Button>
            ) : company ? ( // 🔹 Show this for company users
              <div className="relative group">
                <div
                  className="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50/80 transition-all border border-transparent hover:border-emerald-100"
                  onClick={() => navigate("/company/dashboard")}
                >
                  <span className="font-medium text-gray-700">
                    {company.companyName}
                  </span>
                  <div className="w-9 h-9 bg-gradient-to-r from-blue-100 to-green-200 rounded-full flex items-center justify-center shadow-inner">
                    <Building2 className="w-5 h-5 text-green-600" />
                  </div>
                </div>

                <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <div className="border-t my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50/50 rounded-md transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      გასვლა
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <div
                  className="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50/80 transition-all border border-transparent hover:border-emerald-100"
                  onClick={() => navigate("/user/dashboard")}
                >
                  <span className=" font-medium text-gray-700">
                    {user.name}
                  </span>
                  <div className="w-9 h-9 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-inner">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                </div>

                <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <div className="border-t my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50/50 rounded-md transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      გასვლა
                    </button>
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
