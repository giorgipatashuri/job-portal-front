import React, { useContext, useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

interface Skill {
  name: string;
  rating: number;
}

interface ResumeInfoContextType {
  resumeInfo: {
    skills?: Skill[];
  };
  setResumeInfo: React.Dispatch<React.SetStateAction<any>>;
}

const INITIAL_SKILL: Skill = {
  name: "",
  rating: 0,
};

function Skills() {
  const [skillsList, setSkillsList] = useState<Skill[]>([INITIAL_SKILL]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } =
    useContext<ResumeInfoContextType>(ResumeInfoContext);

  useEffect(() => {
    if (resumeInfo?.skills?.length) {
      setSkillsList(resumeInfo.skills);
    }
  }, [resumeInfo?.skills]);

  const handleChange = (
    index: number,
    name: keyof Skill,
    value: string | number
  ) => {
    setSkillsList((prevList) => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], [name]: value };
      return newList;
    });
  };

  const addNewSkill = () => {
    setSkillsList((prevList) => [...prevList, { ...INITIAL_SKILL }]);
  };

  const removeSkill = () => {
    if (skillsList.length <= 1) {
      toast.error("You must have at least one skill");
      return;
    }
    setSkillsList((prevList) => prevList.slice(0, -1));
  };

  const onSave = async () => {
    try {
      setLoading(true);

      // Validate skills
      const isValid = skillsList.every((skill) => skill.name.trim());
      if (!isValid) {
        toast.error("Please fill in all skill names");
        return;
      }

      // Example API call (uncomment and adjust when ready)
      // await saveSkills({ skills: skillsList });

      toast.success("Skills saved successfully");
    } catch (error) {
      toast.error("Failed to save skills");
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResumeInfo((prev: any) => ({
      ...prev,
      skills: skillsList,
    }));
  }, [skillsList, setResumeInfo]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-green border-t-4 mt-10">
      <h2 className="font-bold text-lg">უნარები</h2>
      <p className="text-gray-600 mb-4">
        დაამატე შენი პროფესიონალური უნარ ჩვევები
      </p>

      <div className="space-y-3">
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-end gap-4 border rounded-lg p-4"
          >
            <div className="flex-grow">
              <label className="block text-sm font-medium mb-1">
                უნარი <span className="text-red-500">*</span>
              </label>
              <Input
                value={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                placeholder="შეიყვანე უნარი"
                className="w-full"
                required
              />
            </div>
            <div className="min-w-[120px]">
              Rating component placeholder - uncomment when ready to use
              <label className="block text-sm font-medium mb-1">
                Proficiency
              </label>
              <Rating
                style={{ maxWidth: 120 }}
                value={item.rating}
                onChange={(v: any) => handleChange(index, "rating", v)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={addNewSkill}
            className="text-primary bg-green"
            type="button"
          >
            უნარის დამატება
          </Button>
          <Button
            variant="outline"
            onClick={removeSkill}
            className="text-primary bg-green"
            type="button"
            disabled={skillsList.length <= 1}
          >
            წაშლა
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Skills;
