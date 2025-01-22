import React, { useContext, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import PersonalDetail from "./forms/PersonalDetail";
import Summery from "./forms/Summery";
import Skills from "./forms/Skills";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import { useNavigate } from "react-router-dom";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { useCreateResumeQuery } from "../../../api/resumeQueries";
import { axiosInstance } from "../../../lib/api";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeInfo } = useContext(ResumeInfoContext);
  // const { data, error, isLoading } = useCreateResumeQuery();
  const navigate = useNavigate();

  // Define form sections array for easier management
  const formSections = [
    { id: 1, component: PersonalDetail, title: "Personal Details" },
    { id: 2, component: Summery, title: "Summary" },
    { id: 3, component: Experience, title: "Experience" },
    { id: 4, component: Education, title: "Education" },
    { id: 5, component: Skills, title: "Skills" },
  ];

  const isLastStep = activeFormIndex === formSections.length;
  const isFirstStep = activeFormIndex === 1;

  const handleNext = () => {
    if (activeFormIndex < formSections.length) {
      setActiveFormIndex(activeFormIndex + 1);
    } else {
      navigate("/resume");
    }
  };

  const handlePrevious = () => {
    if (activeFormIndex > 1) {
      setActiveFormIndex(activeFormIndex - 1);
    }
  };
  const submit = async () => {
    console.log("test", resumeInfo);
    try {
      const { data } = await axiosInstance.post("/cv", resumeInfo);
      return data;
    } catch (error: any) {
      throw {
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to create resume",
        status: error?.response?.status || 500,
      };
    }
  };
  // Get current form component
  const CurrentForm = formSections.find(
    (section) => section.id === activeFormIndex
  )?.component;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          {/* Step {activeFormIndex} of {formSections.length}:
          {
            formSections.find((section) => section.id === activeFormIndex)
              ?.title
          } */}
        </div>
        <div className="flex gap-2">
          {!isFirstStep && (
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              უკან
            </Button>
          )}
          <Button
            disabled={!enableNext}
            size="sm"
            onClick={isLastStep ? submit : handleNext}
            className="flex items-center gap-2"
          >
            {isLastStep ? "დასასრული" : "შემდეგ"}
            {!isLastStep && <ArrowRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="mt-6">
        {CurrentForm && (
          <CurrentForm enabledNext={(value: boolean) => setEnableNext(value)} />
        )}
      </div>
    </div>
  );
};

export default FormSection;
