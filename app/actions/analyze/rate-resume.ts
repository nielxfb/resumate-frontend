"use server";

import {
  AnalyzeFileData,
  AnalyzeResultFeatures,
  TransactionAnalyzeResume,
} from "@/lib/data/analyze/analyze-data";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

interface RateResumeProps {
  jobText: string[];
  resumeData: AnalyzeFileData[];
}

const prisma = new PrismaClient()

export default async function rateResumeAction({
  jobText,
  resumeData,
}: RateResumeProps) {
  const URL = process.env.AI_MODEL_URL + "/rate";
  const resumeText = resumeData.map((resume) => resume.text);

  try {
    const response = await fetch(URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job_description_text: jobText,
        resume_text: resumeText,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const jobFeatures: AnalyzeResultFeatures = data[0];
    const resumeFeatures: AnalyzeResultFeatures[] = data[1];

    const transactionResumeData: TransactionAnalyzeResume[] = resumeData.map(
      (data, index) => {
        const resumeFeature = resumeFeatures[index].rating_details;

        console.log(data.fileName);

        return {
          fileName: data.fileName,
          fileURL: data.url,
          educationRating: resumeFeature?.educations ?? 0,
          gpaRating: resumeFeature?.gpa ?? 0,
          jobRating: resumeFeature?.job_titles ?? 0,
          yearsRating: resumeFeature?.years_experiences ?? 0,
          experienceRating: resumeFeature?.experiences ?? 0,
          skillRating: resumeFeature?.skills ?? 0,
          softSkillRating: resumeFeature?.soft_skills ?? 0,
          languageRating: resumeFeature?.languages ?? 0,
        };
      },
    );

    const { userId } = auth();

    if (!userId) {
      return;
    }

    const analyzeTransactionBody = {
      userId: userId,
      educationTarget: jobFeatures.educations,
      gpaTarget: jobFeatures.gpa,
      jobTarget: jobFeatures.job_titles,
      yearsTarget: jobFeatures.years_experiences.flatMap((obj) => obj.text),
      experienceTarget: jobFeatures.experiences,
      skillTarget: jobFeatures.skills,
      softSkillTarget: jobFeatures.soft_skills,
      languageTarget: jobFeatures.languages,
      cvs: transactionResumeData.map((cv: TransactionAnalyzeResume) => ({
        fileName: cv.fileName,
        fileURL: cv.fileURL,
        educationRating: cv.educationRating,
        gpaRating: cv.gpaRating,
        jobRating: cv.jobRating,
        yearsRating: cv.yearsRating,
        experienceRating: cv.experienceRating,
        skillRating: cv.skillRating,
        softSkillRating: cv.softSkillRating,
        languageRating: cv.languageRating,
      })),
    };

    // Pass the `analyzeTransactionBody` directly to Prisma `create` method
    try {
        const analysis = await prisma.analysis.create({
          data: {
            userId: analyzeTransactionBody.userId,
            date: new Date(),
            educationTarget: analyzeTransactionBody.educationTarget,
            gpaTarget: analyzeTransactionBody.gpaTarget,
            jobTarget: analyzeTransactionBody.jobTarget,
            yearsTarget: analyzeTransactionBody.yearsTarget,
            experienceTarget: analyzeTransactionBody.experienceTarget,
            skillTarget: analyzeTransactionBody.skillTarget,
            softSkillTarget: analyzeTransactionBody.softSkillTarget,
            languageTarget: analyzeTransactionBody.languageTarget,
            cvs: {
              create: analyzeTransactionBody.cvs,
            },
          },
          include: {
            cvs: true,
          },
        });

    } catch (error) {
      console.error("Error creating analysis with CVs:", error);
    } finally {
      await prisma.$disconnect();
    }

    return data;
  } catch (err) {
    console.log(err);
  }
}
