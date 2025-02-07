import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "../hooks/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import api from "../lib/api";

// Skeleton Loader Component
const JobCardSkeleton = () => (
  <div className="animate-pulse max-w-md p-4 border rounded-lg shadow">
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
  </div>
);

const JobApplicationFlow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [userCVs, setUserCVs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Tracks API loading state

  // Fetch all jobs
  const fetchJobs = async () => {
    setIsFetching(true); // Start loading
    try {
      const response = await api.get("/api/job/get-all");
      console.log("Jobs API response:", response.data);
      setJobs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]); // Prevents .map() errors
      toast({
        title: "Error",
        description: "Failed to fetch jobs",
        variant: "destructive",
      });
    } finally {
      setIsFetching(false); // Stop loading
    }
  };

  // Fetch user's CVs
  const fetchUserCVs = async () => {
    try {
      const response = await api.get("/api/cv/get-all");
      setUserCVs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching CVs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch your CVs",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchUserCVs();
  }, []);

  const handleApply = async (jobId: string) => {
    if (!selectedCV) {
      toast({
        title: "Error",
        description: "Please select a CV",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await api.post(`/api/applications/apply`, null, {
        params: { jobId, cvId: selectedCV },
      });

      toast({
        title: "Success",
        description: "Application submitted successfully",
      });
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: error.response?.data || "Failed to submit application",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Show skeletons while fetching */}
      {isFetching ? (
        <>
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
        </>
      ) : (
        jobs.map((job) => (
          <Card
            key={job.id}
            className="max-w-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setIsModalOpen(true)}
          >
            <CardHeader>
              <h3 className="text-lg font-semibold">{job.jobName}</h3>
              <p className="text-sm text-gray-600">
                {job.company?.companyName}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{job.location}</p>
              <p className="mt-2">{job.jobDescription}</p>
              {job.salary && <p className="mt-2">Salary: {job.salary}</p>}
              {job.type && <p className="mt-1">Type: {job.type}</p>}
            </CardContent>
            <CardFooter>
              <Button variant="outline">View Details</Button>
            </CardFooter>
          </Card>
        ))
      )}

      {/* Application Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Application</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* CV Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Select your CV
              </label>
              <Select value={selectedCV} onValueChange={setSelectedCV}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a CV" />
                </SelectTrigger>
                <SelectContent>
                  {userCVs.map((cv) => (
                    <SelectItem key={cv.id} value={cv.id.toString()}>
                      {cv.title || `CV #${cv.id}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => handleApply(jobs[0]?.id)}
              disabled={!selectedCV || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobApplicationFlow;
