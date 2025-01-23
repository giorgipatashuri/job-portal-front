import React, { useContext, useEffect } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummeryPreview from "./preview/SummeryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import api from "../../../lib/api";
import { ResumeDataType } from "../../../types/resume.type";

interface ResumePreviewProps {}
const ResumePreview: React.FC<ResumePreviewProps> = () => {
  let { id } = useParams<{ id: string }>();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext) as {
    resumeInfo: ResumeDataType;
    setResumeInfo: (info: ResumeDataType) => void;
  };
  const fetchResume = async () => {
    try {
      const { data } = await api.get(`/api/cv/${id}`);
      setResumeInfo(data);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchResume();
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchResume();
    }
  }, [id, setResumeInfo]);

  return (
    <div className="min-h-screen  py-8 px-4 " style={{}}>
      <div
        id="resume-preview-id"
        className="max-w-4xl mx-auto min-h-[800px]  bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <PersonalDetailPreview resumeInfo={resumeInfo} />
        <div className="p-8">
          <SummeryPreview resumeInfo={resumeInfo} />

          {(resumeInfo?.experiences?.length ?? 0) > 0 && (
            <ExperiencePreview resumeInfo={resumeInfo} />
          )}

          {(resumeInfo?.education?.length ?? 0) > 0 && (
            <EducationalPreview resumeInfo={resumeInfo} />
          )}

          {(resumeInfo?.skills?.length ?? 0) > 0 && (
            <SkillsPreview resumeInfo={resumeInfo} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
