import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import FormSection from "../../components/FormSection";
// import ResumePreview from "";
import { ResumeInfoContext } from "../../context/ResumeInfoContext";
import ResumePreview from "./components/ResumePreview";
import FormSection from "./components/FormSection";
import Header from "../../components/Header";

function EditResume() {
  //   const { resumeId } = useParams();
  //   useEffect(() => {
  //     GetResumeInfo();
  //   }, []);

  //   const GetResumeInfo = () => {
  //     GlobalApi.GetResumeById(resumeId).then((resp) => {
  //       console.log(resp.data.data);
  //       setResumeInfo(resp.data.data);
  //     });
  //   };

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10 container mx-auto min-h-[1000px]">
        {/* Form Section  */}
        <FormSection />
        {/* Preview Section  */}
        <ResumePreview />
      </div>
    </>
  );
}

export default EditResume;
