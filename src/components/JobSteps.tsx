import React from "react";

const JobSteps = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          How JobPilot Works
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Create Account
            </h2>
            <p className="text-gray-600">
              Afegeam facilisis speciata agiben, nec tempori nec tristique at.
            </p>
          </div>

          {/* Step 2: Upload CV/Resume */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upload CV/Resume
            </h2>
            <p className="text-gray-600">
              Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sedates.
            </p>
          </div>

          {/* Step 3: Find Suitable Job */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Find Suitable Job
            </h2>
            <p className="text-gray-600">
              Phasellus utja eotienot ex. Motbi nec tingala rubu.
            </p>
          </div>

          {/* Step 4: Apply Job */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Apply Job
            </h2>
            <p className="text-gray-600">
              Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sedates
              purus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSteps;
