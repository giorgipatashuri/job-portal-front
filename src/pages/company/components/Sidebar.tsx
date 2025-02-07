import React from "react";
import { Briefcase, LogOut, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "../../../components/ui/button";

function Sidebar({ onLinkClick }: any) {
  const { company, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="w-64 bg-white h-full border-r flex flex-col justify-between">
      <nav>
        <div className="flex items-center m-5">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center transform transition-all group-hover:rotate-12">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
              TalentHub
            </span>
          </a>
        </div>
        <ul className="space-y-2 p-4">
          <li>
            <Link
              to="jobs"
              onClick={onLinkClick}
              className="flex items-center p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded"
            >
              <Briefcase size={20} className="mr-2" />
              Jobs
            </Link>
          </li>
          <li>
            <Link
              to="applicants"
              onClick={onLinkClick}
              className="flex items-center p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded"
            >
              <Users size={20} className="mr-2" />
              Applicants
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="mb-4">
          {/* {bottomMenuItems.map((item) => (
            <MenuLink key={item.path} item={item} isBottom />
          ))} */}
          <div
            onClick={handleLogout}
            className={
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all  text-red-400 cursor-pointer opacity-75 hover:opacity-100"
            }
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">გამოსვლა</span>
          </div>
        </div>
        <div className="flex items-center gap-3 px-3 py-2">
          {/* <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&dpr=2&q=80" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar> */}
          test
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">
              John Doe
            </p>
            <p className="text-xs text-gray-500 truncate">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
