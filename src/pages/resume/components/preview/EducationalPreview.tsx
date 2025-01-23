import React from "react";
import { GraduationCap, Calendar } from "lucide-react";
import { ResumeDataType } from "../../../../types/resume.type";
import { formatDate } from "./ExperiencePreview";

interface EducationalPreviewProps {
  resumeInfo: ResumeDataType;
}

const EducationalPreview: React.FC<EducationalPreviewProps> = ({
  resumeInfo,
}) => {
  if (!resumeInfo.education || resumeInfo.education.length === 0) {
    return (
      <section>
        <h3 className="text-2xl font-semibold mb-4">Education</h3>
        <div>
          {/* Skeleton Loader */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="mb-6 animate-pulse">
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <h3 className="text-xl font-semibold mb-2">განათლება</h3>
      {resumeInfo.education.map((edu) => (
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                {edu.universityName && (
                  <>
                    <GraduationCap size={18} />
                    <span className="text-lg ">{edu.universityName}</span>
                  </>
                )}
              </div>
              <h4 className="text-sm font-medium">
                {edu.degree && edu.major ? `${edu.degree},${edu.major}` : ""}
              </h4>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              {edu.startDate && edu.endDate && (
                <>
                  <Calendar size={18} />
                  <span>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </>
              )}
            </div>
          </div>
          {/* Conditionally render description */}
          {edu.description && (
            <p className="mt-3  text-gray-600">{edu.description}</p>
          )}
        </div>
      ))}
    </section>
  );
};

export default EducationalPreview;
