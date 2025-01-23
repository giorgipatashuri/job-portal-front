import { createContext, ReactNode, useState } from "react";
import { ResumeDataType } from "../types/resume.type";

export const ResumeInfoContext = createContext<any>([]);

interface ResumeInfoProviderProps {
  children: ReactNode;
}

export const ResumeInfoProvider: React.FC<ResumeInfoProviderProps> = ({
  children,
}) => {
  const [resumeInfo, setResumeInfo] = useState<ResumeDataType | null>(null);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {children}
    </ResumeInfoContext.Provider>
  );
};
