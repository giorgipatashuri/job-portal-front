import { useState } from "react";
import Circles from "../components/ui/circles/Circles";

function Registration() {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div className=" flex items-center justify-center w-screen h-screen">
      {/* <Circles /> */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveTab("user")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "user"
                ? "border-b-2 border-emerald-500 text-emerald-500"
                : "text-gray-600"
            }`}
          >
            იუზერის რეგისტრაცია
          </button>
          <button
            onClick={() => setActiveTab("company")}
            className={`ml-4 px-4 py-2 font-semibold ${
              activeTab === "company"
                ? "border-b-2 border-emerald-500 text-emerald-500"
                : "text-gray-600"
            }`}
          >
            კომპანიის რეგისტრაცია
          </button>
        </div>

        {activeTab === "user" && (
          <form>
            <h2 className="text-xl font-bold mb-4">იუზერის რეგისტრაცია</h2>
            <div className="mb-4">
              <label className="block text-gray-700">იუზერნეიმი</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">ელ. ფოსტა</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">პასვორდი</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button className="bg-green hover:bg-emerald-500 py-2 px-8 text-white w-full rounded ">
              რეგისტრაცია
            </button>
          </form>
        )}

        {activeTab === "company" && (
          <form>
            <h2 className="text-xl font-bold mb-4">კომპანიის რეგისტრაცია</h2>
            <div className="mb-4">
              <label className="block text-gray-700">კომპანიის სახელი</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">ელ. ფოსტა</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">პასვორდი</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">კომპანიის ID</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button className="bg-green hover:bg-emerald-500 py-2 px-8 text-white w-full rounded ">
              რეგისტრაცია
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Registration;
