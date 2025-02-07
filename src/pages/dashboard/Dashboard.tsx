import { Briefcase, Eye, ScrollText, Trash, User } from "lucide-react";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import api from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "../../hooks/use-toast";

// Skeleton component
const Skeleton = ({ className }: any) => (
  <div className={`animate-pulse bg-gray-300 ${className}`} />
);

function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const navigation = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate a 2-second delay
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await api.get("/api/cv/get-all");
        if (Array.isArray(response.data)) {
          setResumes(response.data);
        } else {
          console.error("Error: Response data is not an array");
          setResumes([]);
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
        setResumes([]);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await api.get("/api/applications/user");
        if (Array.isArray(response.data)) {
          const formattedApplications = response.data.map((app) => ({
            id: app.id,
            company: app.job.company.companyName,
            position: app.job.jobName,
            status: app.status,
            appliedDate: new Date(app.appliedAt).toLocaleDateString(),
          }));
          setApplications(formattedApplications);
        } else {
          console.error("Error: Response data is not an array");
          setApplications([]);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]);
      }
    };

    fetchResumes();
    fetchApplications();
  }, []);
  const handleDelete = async (cvId: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await api.delete(`/api/cv/${cvId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes((prevResumes) =>
        prevResumes.filter((resume) => resume.id !== cvId)
      );
    } catch (error) {
      console.error("Error deleting CV:", error);
    }
  };

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                    სულ განაცხადები
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {applications.length}
                  </p>
                </div>
              </div>
            )}
          </div>

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
                  <p className="text-2xl font-semibold text-gray-900">
                    {resumes.length}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              უახლესი განცხადებები
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
                      {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        სტატუსი
                      </th> */}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        განაცხადის თარიღი
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {application.appliedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() =>
                              navigation(`/job/${application.job?.id}`)
                            }
                            className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-2 py-2 rounded-md"
                          >
                            <Eye size={18} /> ვაკანსიის ნახვა
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                შენი რეზიუმეები
              </h2>
              {loading ? (
                <Skeleton className="h-10 w-32 rounded" />
              ) : (
                <button
                  onClick={() => navigation("/resume/edit")}
                  className="px-4 py-2 bg-green text-white rounded-md  transition-colors"
                >
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
                          {resume.jobTitle}
                        </h3>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        className="flex items-center gap-2 px-3 py-1 text-sm text-green-600 hover:bg-blue-50 rounded"
                        onClick={() => navigation(`/resume/${resume.id}`)}
                      >
                        <Eye size={16} /> ნახვა
                      </button>

                      <button
                        className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                        onClick={() => handleDelete(resume.id)}
                      >
                        <Trash size={16} /> წაშლა
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">თქვენი რეზიუმების სია ცარიელია</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
