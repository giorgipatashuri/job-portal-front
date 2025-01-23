import { Mail, Phone } from "lucide-react";
import React from "react";
import { ResumeDataType } from "../../../../types/resume.type";

interface PersonalDetailPreviewProps {
  resumeInfo: ResumeDataType; // Replace ResumeDataType with the correct type
}

function PersonalDetailPreview({ resumeInfo }: PersonalDetailPreviewProps) {
  return (
    <div className="bg-green text-white px-8 py-12">
      {/* Header Section */}
      <div className="">
        <h1 className="text-2xl font-bold">
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h1>
        <h2 className="text-xl mt-2 text-blue-100">{resumeInfo?.jobTitle}</h2>

        <div className="mt-4 flex flex-wrap gap-4">
          {resumeInfo?.phone && (
            <div className="flex items-center gap-2">
              <Phone size={18} />
              <span>{resumeInfo?.phone}</span>
            </div>
          )}
          {resumeInfo?.email && (
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <span>{resumeInfo?.email}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalDetailPreview;
