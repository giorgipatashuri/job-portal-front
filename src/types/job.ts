export type JobType = 'Full-time' | 'Part-time' | 'Remote' | 'Hybrid';

export interface Job {
  id: string;
  jobName: string;
  company: {
    companyName: String
  }
  location: string;
  salary?: string;
  jobDescription: string;
  type: JobType;
  requirements: string;
  datePosted: string;
}

export interface CV {
  id: string;
  name: string;
  lastUpdated: string;
  fileUrl: string;
}

export interface JobFilter {
  search: string;
  type: JobType | 'All';
  location: string;
  sortBy: 'date' | 'salary' | 'relevance';
}