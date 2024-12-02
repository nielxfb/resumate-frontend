export interface AnalyzeFileData {
  fileName: string;
  url: string;
  text: string;
}

export interface AnalyzeResultFeatures {
  resume_idx: number;
  educations: string[];
  gpa: string[];
  job_titles: string[];
  years_experiences: {
    text: string[];
  }[] ;
  experiences: string[];
  skills: string[];
  soft_skills: string[];
  languages: string[];
  rating_details?: {
    educations: number;
    gpa: number;
    job_titles: number;
    years_experiences: number;
    experiences: number;
    skills: number;
    soft_skills: number;
    languages: number;
  };
  rating?: number;
}

export interface RatingDetails {
  educations: number;
  gpa: number;
  job_titles: number;
  years_experiences: number;
  experiences: number;
  skills: number;
  soft_skills: number;
  languages: number;
}

export interface TransactionAnalyzeJob {
  userId: string;
  educations: string[];
  gpa: string[];
  jobTitles: string[];
  yearsExperiences: string[];
  experiences: string[];
  skills: string[];
  softSkills: string[];
  languages: string[];
}

export interface TransactionAnalyzeResume {
  fileName: string;
  fileURL: string;
  educationRating: number;
  gpaRating: number;
  jobRating: number;
  yearsRating: number;
  experienceRating: number;
  skillRating: number;
  softSkillRating: number;
  languageRating: number;
}

export const AnalyzeResultFeaturesMapping: Record<string, string> = {
  name: "Name",
  phone: "Phone",
  educations: "Education",
  gpa: "GPA",
  job_titles: "Job Titles",
  years_experiences: "Years Experience",
  experiences: "Experiences",
  skills: "Skills",
  soft_skills: "Soft Skills",
  languages: "Languages",
};
