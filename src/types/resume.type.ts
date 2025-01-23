export interface Education {
  universityName: string | null;
  degree: string | null;
  major: string | null;
  startDate: string | null;
  endDate: string | null;   
  description?: string | null; 
  cvId?: number | null; 
}

export interface Skill {
  name: string | null;
  rating: number | null; 
  cvId?: number | null;  
}

export interface Experience {
  title: string | null;
  companyName: string | null;
  city: string | null;
  startDate: string | null; 
  endDate?: string | null;  
  currentlyWorking?: boolean | null; 
  workSummary?: string | null; 
  cvId?: number | null; 
}

export interface ResumeDataType {
  title: string | null,
  firstName: string | null;
  lastName: string | null;
  jobTitle: string | null;
  phone: string | null;
  email: string | null;
  summary:string | null;
  skills: Skill[] | null;
  experiences: Experience[] | null;
  education: Education[] | null;
  userId: number | null; 
  createdAt: string | null; 
  updatedAt: string | null; 
  deleted: boolean | null;
}