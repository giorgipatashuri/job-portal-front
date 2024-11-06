import React from "react";

const HrBanner = () => {
  return (
    <div className="bg-gradient-to-r from-lime-500 to-green h-64 p-16">
      <h1 className="text-4xl font-bold text-white">
        გამოცადე HRM-ის შესაძლებლობები
      </h1>
      <p className="text-lg text-white mt-4">
        შექმენი ვაკანსია მარტივად და მიიღე შენზე მორგებული კანდიდატები
      </p>
      <div className="flex mt-8">
        <button className="bg-white text-black font-bold py-2 px-4 rounded-md mr-4">
          დაწყება
        </button>
        <button className="bg-white text-black font-bold py-2 px-4 rounded-md">
          ინსტრუქცია
        </button>
      </div>
    </div>
  );
};

export default HrBanner;
