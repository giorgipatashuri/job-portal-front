import React, { useState, useEffect, useContext } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { Textarea } from "../../../../components/ui/textarea";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

interface Education {
  universityName: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ResumeInfoContextType {
  resumeInfo: {
    education?: Education[];
  };
  setResumeInfo: React.Dispatch<React.SetStateAction<any>>;
}

interface EducationProps {
  enabledNext: (value: boolean) => void;
}

const INITIAL_EDUCATION: Education = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

function Education({ enabledNext }: EducationProps) {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } =
    useContext<ResumeInfoContextType>(ResumeInfoContext);
  const [educationList, setEducationList] = useState<Education[]>([
    INITIAL_EDUCATION,
  ]);
  const [isFormValid, setIsFormValid] = useState(false);

  // Load initial data
  useEffect(() => {
    if (resumeInfo?.education?.length) {
      setEducationList(resumeInfo.education);
    }
  }, []);

  // Validate form and update next button state
  useEffect(() => {
    const isValid = educationList.every(
      (edu) =>
        edu.universityName.trim() &&
        edu.degree.trim() &&
        edu.startDate &&
        edu.endDate
    );
    setIsFormValid(isValid);
    enabledNext(isValid);
  }, [educationList, enabledNext]);

  // Update context when education list changes
  useEffect(() => {
    setResumeInfo((prev: any) => ({
      ...prev,
      education: educationList,
    }));
  }, [educationList, setResumeInfo]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    setEducationList((prevList) => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], [name]: value };
      return newList;
    });
  };

  const addNewEducation = () => {
    setEducationList((prevList) => [...prevList, { ...INITIAL_EDUCATION }]);
  };

  const removeEducation = () => {
    if (educationList.length <= 1) {
      toast.error("აუცილებელია მინიმუმ ერთი განათლების ჩანაწერი");
      return;
    }
    setEducationList((prevList) => prevList.slice(0, -1));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (!isFormValid) {
        toast.error("გთხოვთ შეავსოთ ყველა სავალდებულო ველი");
        return;
      }

      // Update context
      setResumeInfo((prev: any) => ({
        ...prev,
        education: educationList,
      }));

      toast.success("განათლების დეტალები წარმატებით შეინახა");
    } catch (error) {
      toast.error("განათლების დეტალების შენახვა ვერ მოხერხდა");
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-green">
        <h2 className="font-bold text-lg">განათლება</h2>
        <p className="text-gray-600 mb-4">დაამატე შენი განათლების დეტალები</p>

        <div className="space-y-6">
          {educationList.map((item, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    სასწავლებლის სახელი<span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="universityName"
                    onChange={(e) => handleChange(e, index)}
                    value={item.universityName}
                    required
                    placeholder="შეიყვანე უნივერსიტეტის სახელი"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    ხარისხი <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="degree"
                    onChange={(e) => handleChange(e, index)}
                    value={item.degree}
                    required
                    placeholder="შეიყვანე განათლების საფეხური"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    ფაკულტეტი
                  </label>
                  <Input
                    name="major"
                    onChange={(e) => handleChange(e, index)}
                    value={item.major}
                    placeholder="შეიყვანე ფაკულტეტი"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    დაწყების თარიღი <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(e) => handleChange(e, index)}
                    value={item.startDate}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    დასრულების თარიღი <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(e) => handleChange(e, index)}
                    value={item.endDate}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    აღწერა
                  </label>
                  <Textarea
                    name="description"
                    onChange={(e) => handleChange(e, index)}
                    value={item.description}
                    placeholder="აღწერე შენი გამოცდილება"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={addNewEducation}
              className="bg-green text-white hover:bg-green/90"
              type="button"
            >
              + დამატება
            </Button>
            <Button
              variant="outline"
              onClick={removeEducation}
              className="bg-green text-white hover:bg-green/90"
              type="button"
              disabled={educationList.length <= 1}
            >
              - წაშლა
            </Button>
          </div>
          <Button
            disabled={loading || !isFormValid}
            onClick={handleSave}
            className="bg-green text-white hover:bg-green/90 min-w-[100px]"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "შენახვა"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Education;
