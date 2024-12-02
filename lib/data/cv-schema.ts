import { z } from 'zod';

export const cvSchema = z.object({
  id: z.number().int().optional(), 
  analysisId: z.number().int(), 
  fileName: z.string(),
  fileURL: z.string().url("Invalid URL format"),
  educationRating: z.number().refine(val => val >= 0 && val <= 100, "Rating must be between 0 and 100"),
  gpaRating: z.number().refine(val => val >= 0 && val <= 100, "Rating must be between 0 and 100"),
  jobRating: z.number().refine(val => val >= 0 && val <= 100, "Rating must be between 0 and 100"),
  yearsRating: z.number().refine(val => val >= 0 && val <= 100, "Rating must be between 0 and 100"),
  experienceRating: z.number().refine(val => val >= 0 && val <= 100, "Rating must be between 0 and 100"),
  skillRating: z.number().refine(val => val >= 0 && val <= 100, "Rating must be between 0 and 100"),
  softSkillRating: z.number().refine(val => val >= 0 && val <= 100, "Rating must be between 0 and 100"),
  languageRating: z.number().refine(val => val >= 0 && val <= 100, "Rating must be between 0 and 100"),
});

export type CV = z.infer<typeof cvSchema>;
