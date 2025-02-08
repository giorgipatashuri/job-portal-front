import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, MapPin, Timer } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ApplyModal } from "./ApplyModal";
import api from "../../lib/api";
import { Job } from "../../types/job";
import { jobTypeTranslations } from "./JobCard";

export function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/api/job/${id}`);
        setJob(response.data);
      } catch (err) {
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">იტვირთება...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">ვაკანსიები ვერ მოიძებნა</h1>
        <Button
          variant="link"
          onClick={() => navigate("/jobs")}
          className="mt-4"
        >
          უკან დაბრუნება
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/jobs")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            უკან დაბრუნება
          </Button>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex items-start space-x-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {job.jobName}
                  </h1>
                  {/* <div className="flex items-center mt-2 text-gray-600">
                    <Building2 className="mr-1 h-4 w-4" />
                    {job.company}
                  </div> */}
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="mr-1 h-4 w-4 text-emerald-500" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Timer className="mr-1 h-4 w-4 text-emerald-500" />
                      {jobTypeTranslations[job.type] || job.type}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="bg-white lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white  shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold mb-4">სამუსაოს აღწერა</h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {job.jobDescription}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white  shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold mb-4">მოთხოვნები </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {job.requirements}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Fixed Apply Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
          <div className="container mx-auto px-4 flex justify-end">
            <Button
              onClick={() => setIsApplyModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 w-full md:w-auto"
            >
              რეზიუმეს გაგზავნა
            </Button>
          </div>
        </div>

        <ApplyModal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          jobTitle={job.jobName}
          jobId={+job.id}
        />
      </div>
    </div>
  );
}
