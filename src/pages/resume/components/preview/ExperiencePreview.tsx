import { Building2, MapPin, Calendar } from "lucide-react";
import React from "react";
import { ResumeDataType } from "../../../../types/resume.type";
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}
interface ExperiencePreviewProps {
  resumeInfo: ResumeDataType;
}
const ExperiencePreview: React.FC<ExperiencePreviewProps> = ({
  resumeInfo,
}: any) => {
  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">სამუშაო გამოცდილება</h3>
      {resumeInfo.experiences.map((exp: any) => (
        <div key={exp.id} className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-medium">{exp.title}</h4>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                {exp.companyName && (
                  <>
                    <Building2 size={18} />
                    <span>{exp.companyName}</span>
                  </>
                )}

                {exp.companyName && exp.city && (
                  <span className="text-gray-400">|</span>
                )}

                {exp.city && (
                  <>
                    <MapPin size={18} />
                    <span>{exp.city}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              {exp.startDate && exp.endDate && (
                <>
                  <Calendar size={18} />
                  <span>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </>
              )}
            </div>
          </div>
          {exp.workSummary && (
            <p className="mt-3 text-gray-600">{exp.workSummary}</p>
          )}
        </div>
      ))}
    </section>
  );
};

export default ExperiencePreview;
