import React, { useContext, useEffect } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummeryPreview from "./preview/SummeryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";

interface Skill {
  name: string;
  rating: number;
}

interface Experience {
  title: string;
  companyName: string;
  city: string;
  startDate: string;
  endDate?: string;
  currentlyWorking?: boolean;
  workSummery?: string;
}

interface Education {
  universityName: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description?: string;
}

interface ResumeInfo {
  themeColor?: string;
  skills?: Skill[];
  Experience?: Experience[];
  education?: Education[];
}

const ResumePreview: React.FC = () => {
  const { resumeInfo } = useContext(ResumeInfoContext) as {
    resumeInfo: ResumeInfo;
  };

  useEffect(() => {
    console.log("resume", resumeInfo);
  }, []);

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]  text-wrap"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal Detail  */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {/* Summery  */}
      <SummeryPreview resumeInfo={resumeInfo} />
      {/* Professional Experience  */}
      {(resumeInfo?.Experience?.length ?? 0) > 0 && (
        <ExperiencePreview resumeInfo={resumeInfo} />
      )}
      {/* Educational  */}
      {(resumeInfo?.education?.length ?? 0) > 0 && (
        <EducationalPreview resumeInfo={resumeInfo} />
      )}
      {/* Skills  */}
      {(resumeInfo?.skills?.length ?? 0) > 0 && (
        <SkillsPreview resumeInfo={resumeInfo} />
      )}
    </div>
  );
};

export default ResumePreview;
