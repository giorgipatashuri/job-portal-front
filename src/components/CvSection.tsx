import Lottie from "lottie-react";
import React from "react";
import animationSvg from "../assets/Animation - 1730967007876-LugLl.json";

const CvSection = () => {
  return (
    <div className="max-w-6xl mx-auto py-3 px-3">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            შექმენი შენი რეზიუმე მარტივად
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600  mb-10">
            შექმენი შენი პროფესიონალური რესიუმე უფასოდ და სწრაფად!
          </h2>
          <a href="/resume/edit">
            <button className="bg-green hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
              შექმენი ეხლავე
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </a>
        </div>

        {/* Right Content - Resume Preview */}
        <div className="flex-1 relative">
          <Lottie animationData={animationSvg} loop={true} />
          {/* Decorative Background */}
          <div className="absolute top-4 right-4 bottom-4 -z-10 w-full bg-red-900/20 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default CvSection;
