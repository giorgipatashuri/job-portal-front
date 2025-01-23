import { Briefcase, ScrollText, User } from "lucide-react";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import api from "../../lib/api";

// Skeleton component
const Skeleton = ({ className }: any) => (
  <div className={`animate-pulse bg-gray-300 ${className}`} />
);

const applications = [
  {
    id: 1,
    company: "Tech Corp",
    position: "Senior Developer",
    status: "In Review",
    appliedDate: "2024-03-15",
  },
  {
    id: 2,
    company: "Digital Solutions",
    position: "Frontend Engineer",
    status: "Interviewed",
    appliedDate: "2024-03-10",
  },
];

function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState<any[]>([]);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate a 2-second delay
    return () => clearTimeout(timer);
  }, []);

  // Fetch CVs from the API
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await api.get("/api/cv/get-all");

        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setResumes(response.data);
        } else {
          console.error("Error: Response data is not an array");
          setResumes([]); // Reset to empty array if data is not valid
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
        setResumes([]); // Reset to empty array on error
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          {loading ? (
            <Skeleton className="h-8 w-2/3 rounded" />
          ) : (
            <h1 className="text-2xl font-bold text-gray-900">
              კეთილი იყოს შენი მობრძანება, {user?.name || "Guest"}
            </h1>
          )}
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Applications */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {loading ? (
              <Skeleton className="h-20" />
            ) : (
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Briefcase className="h-6 w-6 text-green" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Applications
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">12</p>
                </div>
              </div>
            )}
          </div>

          {/* Interviews */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {loading ? (
              <Skeleton className="h-20" />
            ) : (
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    ინტერვიუები
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">3</p>
                </div>
              </div>
            )}
          </div>

          {/* Active Resumes */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {loading ? (
              <Skeleton className="h-20" />
            ) : (
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <ScrollText className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    აქტიური რეზიუმები
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">2</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Applications
            </h2>
            <div className="overflow-x-auto">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-10 w-full rounded mb-2" />
                ))
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        კომპანია
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        პოზიცია
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        სტატუსი
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {applications.map((application) => (
                      <tr key={application.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {application.company}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {application.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              application.status === "In Review"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {application.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {application.appliedDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Resumes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                შენი რეზიუმეები
              </h2>
              {loading ? (
                <Skeleton className="h-10 w-32 rounded" />
              ) : (
                <button className="px-4 py-2 bg-green text-white rounded-md  transition-colors">
                  შექმენი ახალი რეზიუმე
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loading ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <Skeleton key={index} className="h-24 rounded" />
                ))
              ) : resumes.length > 0 ? (
                resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="border rounded-lg p-4 hover:border-green transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {resume.jobTitle} {/* Update to jobTitle */}
                        </h3>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="px-3 py-1 text-sm text-green hover:bg-blue-50 rounded">
                        ნახვა
                      </button>
                      <button className="px-3 py-1 text-sm text-green hover:bg-blue-50 rounded">
                        ჩამოტვირთვა
                      </button>
                      <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                        წაშლა
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No resumes available</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
