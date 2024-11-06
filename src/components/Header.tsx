import React from "react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow sticky ">
      <div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8  flex justify-between items-center">
        <div className="flex items-center">
          <a href="/">LOGO</a>
        </div>
        <nav className="flex space-x-4 items-center">
          <a
            className="border-b-4 border-transparent py-[25px] hover:border-green"
            href="/vacancy/"
          >
            <p className="text-secondary-100 font-tbcx-regular text-2sm">
              ვაკანსიები
            </p>
          </a>
          <a
            className="border-b-4 border-transparent py-[25px] hover:border-green"
            href="/resume/edit"
          >
            <p className="text-secondary-100 font-tbcx-regular text-2sm">
              რეზიუმე
            </p>
          </a>
          <Button
            variant="ghost"
            className="flex items-center justify-center gap-2 rounded-xl bg-green/10 px-5 py-3 transition-all hover:bg-green/20"
          >
            <span className="text-green">ვაკანსიის დამატება</span>
          </Button>
          <Button variant="outline" className="rounded-xl">
            შესვლა
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
