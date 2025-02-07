import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../lib/api";
import { Job } from "../../types/job";
import { JobCard } from "./JobCard";
import Header from "../../components/Header";

export function JobListingPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get("/api/job/get-all");
        console.log(data);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">
                ვაკანსიები არ მოიძებნა
              </h3>
              <p className="text-gray-500">გთხოვთ ნახოთ მოგვიანებით.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
