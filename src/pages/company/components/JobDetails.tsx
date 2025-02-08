import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Users as UsersIcon,
  Upload,
  X,
  Check,
} from "lucide-react";
import ApplyModal from "./ApplyModal";
import api from "../../../lib/api";

interface JobDetailsProps {
  jobId: number;
  onBack: () => void;
}

function JobDetails({ jobId, onBack }: JobDetailsProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [jobDetail, setJobDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchJobDetails = async () => {
      const companyToken = localStorage.getItem("companyToken");

      try {
        const { data } = await api.get(`/api/job/${jobId}`, {
          headers: {
            Authorization: `Bearer ${companyToken}`,
          },
        });
        setJobDetail(data);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);
  if (loading) return <p>Loading job details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!jobDetail) return <p>Job not found</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-green-600 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Jobs
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {jobDetail.jobName}
              </h1>
              <p className="text-gray-600 mb-4">{jobDetail.department}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2" />
                  {jobDetail.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign size={18} className="mr-2" />
                  {jobDetail.salary}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={18} className="mr-2" />
                  {jobDetail.type.replace("_", " ")}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center text-gray-500">
                <Calendar size={18} className="mr-2" />
                Posted {new Date(jobDetail.posted).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Job Description
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {jobDetail.jobDescription}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Requirements
            </h2>
            <div className="text-gray-700 whitespace-pre-wrap">
              {jobDetail.requirements}
            </div>
          </div>

          <div className="pt-6 border-t">
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Apply for this position
            </button>
          </div>
        </div>
      </div>

      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobTitle={jobDetail.title}
      />
    </div>
  );
}

export default JobDetails;
