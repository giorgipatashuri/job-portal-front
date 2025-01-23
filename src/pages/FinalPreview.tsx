import React, { useContext, useEffect } from "react";
import ResumePreview from "./resume/components/ResumePreview";
import Download from "../components/Download";
import { ResumeInfoContext } from "../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { ResumeDataType } from "../types/resume.type";
import api from "../lib/api";

const FinalPreview = () => {
  const { id } = useParams<{ id: string }>();

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

  if (!resumeInfo) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500">რეზიუმე არ მოიძებნა.</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto flex justify-end mt-4">
        <Download
          username={resumeInfo.firstName || ""}
          jobPosition={resumeInfo.jobTitle || ""}
        />
      </div>
      <ResumePreview />
    </>
  );
};

export default FinalPreview;
