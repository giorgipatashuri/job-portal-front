import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { useState, useContext, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import RichTextEditor from "../RichTextEditor";
import { Textarea } from "../../../../components/ui/textarea";

type ExperienceType = {
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  workSummary: string;
};

const initialFormField: ExperienceType = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

function Experience({
  enabledNext,
}: {
  enabledNext: (value: boolean) => void;
}) {
  const [experienceList, setExperienceList] = useState<ExperienceType[]>([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    if (resumeInfo?.experiences?.length > 0) {
      setExperienceList(resumeInfo.experiences);
    } else {
      // Initialize with one empty experience if none exists
      setExperienceList([{ ...initialFormField }]);
    }
  }, []);

  // Validate form and enable/disable next button
  useEffect(() => {
    const isValid = experienceList.every(
      (experience) =>
        experience.title && experience.companyName && experience.startDate
    );
    enabledNext(isValid);
  }, [experienceList, enabledNext]);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setExperienceList((prevList) => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], [name]: value };
      return newList;
    });
  };

  const AddNewExperience = () => {
    setExperienceList((prevList) => [...prevList, { ...initialFormField }]);
  };

  const RemoveExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList((prevList) => prevList.slice(0, -1));
    }
  };

  // Update context when experience list changes
  useEffect(() => {
    setResumeInfo((prevInfo: any) => ({
      ...prevInfo,
      experiences: experienceList,
    }));
  }, [experienceList, setResumeInfo]);

  const handleSave = () => {
    setLoading(true);
    // Save to context
    setResumeInfo((prevInfo: any) => ({
      ...prevInfo,
      experiences: experienceList,
    }));

    toast.success("გამოცდილება შენახულია");
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-green">
        <h2 className="font-bold text-lg">პროფესიონალური გამოცდილება</h2>
        <p className="text-gray-600 mb-5">
          დამატე შენი წინა პროფესიული გამოცდილება
        </p>

        <div className="space-y-4">
          {experienceList.map((item, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    პოზიციის დასახელება *
                  </label>
                  <Input
                    name="title"
                    value={item.title}
                    onChange={(event) => handleChange(index, event)}
                    placeholder="შეიყვანეთ პოზიცია"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    კომპანიის სახელი *
                  </label>
                  <Input
                    name="companyName"
                    value={item.companyName}
                    onChange={(event) => handleChange(index, event)}
                    placeholder="შეიყვანეთ კომპანიის სახელი"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">ქალაქი</label>
                  <Input
                    name="city"
                    value={item.city}
                    onChange={(event) => handleChange(index, event)}
                    placeholder="შეიყვანეთ ქალაქი"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    დაწყების თარიღი *
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    value={item.startDate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    დასრულების თარიღი
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    value={item.endDate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    აღწერა
                  </label>
                  <Textarea
                    name="workSummary"
                    onChange={(event) => handleChange(index, event)}
                    value={item.workSummary}
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
              onClick={AddNewExperience}
              className="bg-green text-white hover:bg-green/90"
            >
              + დაამატე გამოცდილება
            </Button>
            <Button
              variant="outline"
              onClick={RemoveExperience}
              disabled={experienceList.length <= 1}
              className="bg-green text-white hover:bg-green/90"
            >
              - წაშლა
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
