import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  AnalyzeFileData,
  AnalyzeResultFeatures,
  AnalyzeResultFeaturesMapping,
  RatingDetails,
} from "@/lib/data/analyze/analyze-data";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnalyzeResultResume {
  resumeData: AnalyzeFileData[];
  resumeFeatures: AnalyzeResultFeatures[];
}

export default function AnalyzeResultResume({
  resumeData,
  resumeFeatures,
}: AnalyzeResultResume) {
  const num_resume = resumeData.length;
  let num_top_resume = 5;

  if (num_resume < 5) {
    num_top_resume = num_resume;
  }

  return (
    <>
      <div className="flex w-full flex-row justify-between">
        <h1 className="font-bold">Showing top {num_top_resume} resumes</h1>
        {/* <div className="flex flex-row whitespace-nowrap gap-x-2 items-center text-sm">
          <span>Edit top</span>
          <Input type="number" min={1} max={num_resume}  />
        </div> */}
      </div>
      {num_resume > 1 ? (
        <Accordion type="multiple">
          {resumeFeatures.map(
            (resume, idx) =>
              idx < num_top_resume && (
                <AccordionItem key={idx} value={`resume-${idx}`}>
                  <AccordionTrigger>
                    <DisplayResumeRating
                      key={idx}
                      fileName={resumeData[resume.resume_idx].fileName}
                      rating={resume.rating ?? 0}
                    />
                  </AccordionTrigger>
                  <AccordionContent>
                    {resume.rating_details && (
                      <DisplayResumeRatingDetails
                        ratingDetails={resume.rating_details!}
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              ),
          )}
        </Accordion>
      ) : (
        <div>
          <DisplayResumeRating
            fileName={resumeData[0].fileName}
            rating={resumeFeatures[0].rating ?? 0}
          />
          <DisplayResumeRatingDetails
            ratingDetails={resumeFeatures[0].rating_details!}
            single={true}
          />
        </div>
      )}
    </>
  );
}

interface DisplayResumeRatingProps {
  fileName: string;
  rating: number;
  single?: boolean;
}

function DisplayResumeRating({ fileName, rating }: DisplayResumeRatingProps) {
  return (
    <div
      className={`flex w-full flex-row justify-between px-4 text-lg font-bold`}
    >
      <span>{fileName}</span>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {(rating * 100).toFixed(2)}%
      </motion.div>
    </div>
  );
}

interface DisplayResumeRatingDetailsProps {
  ratingDetails: RatingDetails;
  single?: boolean;
}

function DisplayResumeRatingDetails({
  ratingDetails,
  single = false,
}: DisplayResumeRatingDetailsProps) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: "some",
  });

  return (
    <div
      className={`flex h-full w-full flex-col gap-y-4 px-8 py-4 ${single ?? "mt-4"} `}
    >
      {Object.entries(ratingDetails).map(([key, value]) => (
        <div key={key} ref={ref} className="flex flex-col gap-y-2">
          <div className="flex w-full flex-row justify-between">
            <h3 className="font-semibold">
              {AnalyzeResultFeaturesMapping[key] ?? key}
            </h3>
            {(value * 100).toFixed(2)}%
          </div>
          <Progress value={inView ? value * 100 : 0} />
        </div>
      ))}
    </div>
  );
}
