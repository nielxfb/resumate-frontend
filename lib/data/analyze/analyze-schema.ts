import { z } from "zod";

export const analyzeSchema = z.object({
  jobText: z
    .array(z.string().min(1, "Fill in the job description"))
    .nonempty("Fill in the job description"),
  resumeData: z
    .array(
      z.object({
        fileName: z.string().min(1, "File name cannot be empty"),
        url: z.string().url("Invalid URL format"),
        text: z.string().min(1, "Resume text cannot be empty"),
      }),
    )
    .nonempty("Please upload the resumes"),
});
