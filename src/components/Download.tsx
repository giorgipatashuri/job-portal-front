import React, { useState } from "react";
import { DownloadCloud } from "lucide-react";
import { toast } from "../hooks/use-toast";
import { Button } from "./ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const formatFileName = (
  userName: string,
  jobPosition: string,
  useHyphen: boolean = true
) => {
  const delimiter = useHyphen ? "-" : "_";
  return (
    `${userName}${delimiter}${jobPosition}`.trim().replace(/\s+/g, delimiter) +
    ".pdf"
  );
};

const Download = ({
  username,
  jobPosition,
}: {
  username: string;
  jobPosition: string;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const resumeElement = document.getElementById("resume-preview-id");

    if (!resumeElement) {
      toast({
        description: "Could not find the resume to download",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const fileName = formatFileName(username, jobPosition);

    try {
      const canvas = await html2canvas(resumeElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(fileName);

      toast({ description: "Download successful", variant: "success" });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      className="bg-white border gap-1 dark:bg-gray-800 !p-2 min-w-9 lg:min-w-auto lg:p-4"
      onClick={handleDownload}
      disabled={loading}
    >
      <div className="flex items-center gap-1">
        <DownloadCloud className="w-[17px] h-[17px]" />
        <span className="hidden lg:flex">
          {loading ? "მუშავდება" : "რეზიუმეს ჩამოტვირთვა"}
        </span>
      </div>
    </Button>
  );
};

export default Download;
