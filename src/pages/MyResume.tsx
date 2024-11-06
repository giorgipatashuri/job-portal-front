import React, { useContext, useEffect } from "react";
import { ResumeInfoContext } from "../context/ResumeInfoContext";
import EducationalPreview from "./resume/components/preview/EducationalPreview";
import ExperiencePreview from "./resume/components/preview/ExperiencePreview";
import PersonalDetailPreview from "./resume/components/preview/PersonalDetailPreview";
import SkillsPreview from "./resume/components/preview/SkillsPreview";
import SummeryPreview from "./resume/components/preview/SummeryPreview";
import Header from "../components/Header";

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

const MyResume: React.FC = () => {
  const { resumeInfo } = useContext(ResumeInfoContext) as {
    resumeInfo: ResumeInfo;
  };

  useEffect(() => {
    console.log("resume", resumeInfo);
  }, []);

  return (
    <>
      <Header />
      <div
        className="shadow-lg h-full p-14 border-t-[20px] w-[50%] mx-auto mt-3 min-h-[]"
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
    </>
  );
};

export default MyResume;
