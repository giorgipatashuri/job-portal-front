import { useState, useEffect } from "react";
import { format } from "date-fns";
import { FileText, CheckCircle } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import api from "../../lib/api";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { cn } from "../../lib/utils";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: number;
  jobTitle: string;
}

interface CV {
  id: number;
  name: string;
  jobTitle: string;
  lastUpdated: string;
}

export function ApplyModal({
  isOpen,
  onClose,
  jobId,
  jobTitle,
}: ApplyModalProps) {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [selectedCV, setSelectedCV] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState("");
  const { toast } = useToast();
  const [step, setStep] = useState<"cv" | "cover-letter" | "success">("cv");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const { data } = await api.get("/api/cv/get-all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCvs(data);
      } catch (error) {
        console.error("Error fetching CVs:", error);
      }
    };

    if (isOpen) fetchCVs();
  }, [isOpen]);

  const handleNext = () => {
    if (!selectedCV) {
      toast({
        title: "Please select a CV",
        variant: "destructive",
      });
      return;
    }
    setStep("cover-letter");
  };

  const handleSubmit = async () => {
    if (!coverLetter.trim()) {
      toast({
        title: "Please write a cover letter",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await api.post(
        "/api/applications/apply",
        { jobId, cvId: selectedCV, coverLetter },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStep("success");

      setTimeout(() => {
        setSelectedCV("");
        setCoverLetter("");
        setStep("cv");
        onClose();
      }, 2000); // Close modal after success animation
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Failed to submit application",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => setStep("cv");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            გააგზავნე ვაკანსია {jobTitle} - ის პოზიციაზე
          </DialogTitle>
        </DialogHeader>

        {step === "cv" && (
          <>
            <div className="py-4">
              <h3 className="text-lg font-medium mb-4">აირჩიე შენი რეზიუმე</h3>
              <RadioGroup
                value={selectedCV}
                onValueChange={setSelectedCV}
                className="space-y-4"
              >
                {cvs.map((cv) => (
                  <div
                    key={cv.id}
                    className="flex items-center space-x-4 rounded-lg border p-4"
                  >
                    <RadioGroupItem
                      value={cv.id.toString()}
                      id={cv.id.toString()}
                    />
                    <Label
                      htmlFor={cv.id.toString()}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-emerald-500" />
                          <span>{cv.jobTitle}</span>
                        </div>
                        {/* <span className="text-sm text-muted-foreground">
                          {cv.lastUpdated &&
                          !isNaN(new Date(cv.lastUpdated).getTime())
                            ? format(new Date(cv.lastUpdated), "MMM d, yyyy")
                            : "Unknown Date"}
                        </span> */}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                უარყოფა
              </Button>
              <Button
                onClick={handleNext}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                შემდეგი
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "cover-letter" && (
          <>
            <div className="py-4">
              <h3 className="text-lg font-medium mb-4">
                აკრიფეთ სამოტივაციო წერილი
              </h3>
              <Textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="min-h-[200px] resize-none"
              />
            </div>
            <DialogFooter>
              <div className="flex justify-between w-full">
                <Button variant="outline" onClick={handleBack}>
                  უკან
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={onClose}>
                    უარყოფა
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-emerald-600 hover:bg-emerald-700"
                    disabled={loading}
                  >
                    {loading ? "მიმდინარეობს წარდგენა..." : "წარადგინე"}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-16 w-16 text-emerald-600" />
            <h3 className="text-xl font-bold text-gray-900 mt-4">
              რეზიუმე წარმატებით გაიგზავნა!
            </h3>
            <p className="text-gray-500 text-center mt-2">
              შენ წარმატებით გააგზავნე რეზიუმე <strong>{jobTitle}</strong> ის
              პოზიციაზე.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
