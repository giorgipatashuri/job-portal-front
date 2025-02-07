import { motion } from "framer-motion";
import { Building2, MapPin, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Job } from "../../types/job";

interface JobCardProps {
  job: Job;
  index: number;
}
export const jobTypeTranslations: Record<string, string> = {
  FULL_TIME: "Სრული განაკვეთი",
  PART_TIME: "ნახევარი განაკვეთი",
  CONTRACT: "კონტრაქტი",
  INTERNSHIP: "სტაჟირება",
};
export function JobCard({ job, index }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{job.jobName}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Building2 className="mr-1 h-4 w-4" />
              {job.company.companyName}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-sm">
              <MapPin className="mr-1 h-4 w-4 text-emerald-500" />
              {job.location}
            </div>
            <div className="flex items-center text-sm">
              <Timer className="mr-1 h-4 w-4 text-emerald-500" />
              {jobTypeTranslations[job.type] || job.type}
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {job.jobDescription}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Link to={`/jobs/${job.id}`} className="w-full">
            <Button
              variant="outline"
              className="w-full hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
            >
              იხილეთ დეტალურად
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
