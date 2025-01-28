import React, { useCallback, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { DownloadCloud } from "lucide-react";
import { toast } from "../hooks/use-toast";
import { Button } from "./ui/button";

export const formatFileName = (
  userName: string,
  jobPosition: string,
  useHyphen: boolean = true
) => {
  const delimiter = useHyphen ? "-" : "_";
  return `${userName}${jobPosition}`.trim().replace(/\s+/g, delimiter) + "pdf";
};

const Download = (props: { username: string; jobPosition: string }) => {
  const { username, jobPosition } = props;
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    const resumeElement = document.getElementById("resume-preview-id");
    if (!resumeElement) {
      toast({
        description: "Could not download",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    const fileName = formatFileName(username, jobPosition);
    try {
      const canvas = await html2canvas(resumeElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210; //A4 size in mm
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Error generating PDF:",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [username]);

  return (
    <Button
      variant="secondary"
      className="bg-white border gap-1
                   dark:bg-gray-800 !p-2
                    min-w-9 lg:min-w-auto lg:p-4"
      onClick={handleDownload}
    >
      <div className="flex items-center gap-1">
        <DownloadCloud size="17px" />
        <span className="hidden lg:flex">
          {loading ? "მუშავდება" : "რეზიუმეს ჩამოტვირთვა"}
        </span>
      </div>
    </Button>
  );
};

export default Download;
