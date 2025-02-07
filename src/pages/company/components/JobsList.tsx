import React, { useEffect, useState } from "react";
import { Plus, MapPin, Users as UsersIcon, Briefcase } from "lucide-react";
import JobModal from "./JobModal";
import JobDetails from "./JobDetails";
import api from "../../../lib/api";
import { useNavigate } from "react-router-dom";

function JobsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const companyToken = localStorage.getItem("companyToken");
      if (!companyToken) {
        console.error("No company token found");
        return;
      }

      try {
        const { data } = await api.get("api/job/get-all", {
          headers: {
            Authorization: `Bearer ${companyToken}`,
          },
        });
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleSubmitJob = async (jobData: any) => {
    const companyToken = localStorage.getItem("companyToken");
    try {
      const { data } = await api.post("api/job/create", jobData, {
        headers: {
          Authorization: `Bearer ${companyToken}`,
        },
      });
      if (data) {
        // navigate("/company/dashboard");
        setJobs([...jobs, data]);
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  if (selectedJobId !== null) {
    return (
      <JobDetails jobId={selectedJobId} onBack={() => setSelectedJobId(null)} />
    );
  }

  // const filteredJobs = jobs.filter(
  //   (job) =>
  //     job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     job.location.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Open Positions</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search jobs..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
          >
            <Plus size={20} className="mr-2" />
            Post New Job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedJobId(job.id)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {job.jobName}
                  </h3>
                  <p className="text-gray-600 mt-1">{job.department}</p>
                </div>
                <div className="flex items-center text-green-600">
                  <UsersIcon size={16} className="mr-1" />
                  <span className="text-sm">{job.applicants}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {job.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  {job.location}
                </div>
                <span>Posted {new Date(job.posted).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitJob}
      />
    </div>
  );
}

export default JobsList;
