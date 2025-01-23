import React from "react";
import { ResumeDataType, Skill } from "../../../../types/resume.type";
import { Star } from "lucide-react";

interface SkillsPreviewProps {
  resumeInfo: ResumeDataType;
}

const SkillsPreview: React.FC<SkillsPreviewProps> = ({ resumeInfo }) => {
  return (
    <section className="mb-8">
      <h3 className="text-2xl font-semibold mb-4">Skills</h3>
      <div className="flex flex-wrap gap-3">
        {resumeInfo.skills?.map(
          (skill, skillIndex) =>
            skill?.name &&
            skill?.rating !== null && (
              <div
                key={skillIndex}
                className="bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2"
              >
                <span>{skill.name}</span>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index < (skill?.rating ?? 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default SkillsPreview;
