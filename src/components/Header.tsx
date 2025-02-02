import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";

const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const navLinkClasses =
    "relative font-medium text-gray-600 py-6 px-2 transition-colors hover:text-green-600 group";
  const navLinkUnderlineClasses =
    "absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="text-2xl font-bold text-gray-800 hover:text-green-600 transition-colors"
            >
              LOGO
            </a>
          </div>
          <nav className="flex items-center space-x-6">
            <a href="/vacancy/" className={navLinkClasses}>
              <span className="text-base">ვაკანსიები</span>
              <div className={navLinkUnderlineClasses} />
            </a>

            <a href="/resume/edit" className={navLinkClasses}>
              <span className="text-base">რეზიუმე</span>
              <div className={navLinkUnderlineClasses} />
            </a>
            {isAuthenticated && user.role === "HR" && (
              <Button
                variant="ghost"
                className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 px-4 py-2 rounded-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">ვაკანსიის დამატება</span>
              </Button>
            )}

            {!isAuthenticated ? (
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="px-6 py-2 rounded-lg border-2 border-green-600 text-green-600 hover:bg-green-50 transition-colors font-medium"
              >
                შესვლა
              </Button>
            ) : (
              <div
                className="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => navigate("/dashboard")}
              >
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
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
