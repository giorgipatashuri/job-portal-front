import React from "react";

interface Experience {
  title: string;
  companyName: string;
  city: string;
  startDate: string;
  endDate?: string;
  currentlyWorking?: boolean;
  workSummery?: string;
}

interface ResumeInfo {
  themeColor?: string;
  Experience?: Experience[];
}

interface ExperiencePreviewProps {
  resumeInfo: ResumeInfo;
}

const ExperiencePreview: React.FC<ExperiencePreviewProps> = ({
  resumeInfo,
}) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        გამოცდილება
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.Experience?.map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {experience.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {experience.companyName} {experience.city}
            <span>
              {experience.startDate}{" "}
              {experience.currentlyWorking ? "Present" : experience.endDate}
            </span>
          </h2>
          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{ __html: experience.workSummery || "" }}
          />
        </div>
      ))}
    </div>
  );
};

export default ExperiencePreview;
