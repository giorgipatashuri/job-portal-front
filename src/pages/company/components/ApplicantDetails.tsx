import React from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
} from "lucide-react";

interface ApplicantDetailsProps {
  applicantId: any;
  onBack: () => void;
}

// This would typically come from an API
const applicantDetail = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.j@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  position: "Senior Software Engineer",
  status: "In Review",
  appliedDate: "2024-02-15",
  experience: "8 years",
  education: "Master's in Computer Science",
  skills: ["React", "Node.js", "TypeScript", "AWS", "Python"],
  resume: "https://example.com/resume.pdf",
  coverLetter:
    "Dear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Software Engineer position. With 8 years of experience in full-stack development...",
};

const statusColors = {
  New: "bg-blue-100 text-blue-800",
  "In Review": "bg-yellow-100 text-yellow-800",
  Interviewed: "bg-green-100 text-green-800",
};

function ApplicantDetails({ applicant, onBack }: any) {
  console.log(applicant);
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-green-600 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        უკან დაბრუნება
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {applicant.user.name}
              </h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-gray-600">
                  <Mail size={18} className="mr-2" />
                  {applicant.user.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone size={18} className="mr-2" />
                  {/* {applicant.applicant.phone} */}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center text-gray-500 mt-2">
                <Calendar size={18} className="mr-2" />
                Applied{" "}
                {new Date(applicantDetail.appliedDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              სამოტივაციო წერილი
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {applicant.coverLetter}
            </p>
          </div>

          <div className="pt-6 border-t flex justify-between">
            <a
              href={`/resume/${applicant.cv.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              რეზიუმეს ნახვა
            </a>
            <div className="space-x-3">
              <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">
                უარყოფა
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                გასაუბრების დანიშნვა
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicantDetails;
