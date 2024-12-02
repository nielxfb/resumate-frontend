import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/handle-error";
import { toast } from "sonner";
import AnalyzeResultJob from "./analyze-result-job";
import AnalyzeResultResume from "./analyze-result-resume";
import {
  AnalyzeFileData,
  AnalyzeResultFeatures,
} from "@/lib/data/analyze/analyze-data";

interface AnalyzeResultProps {
  results: any; // JSON format
  resumeData: AnalyzeFileData[];
  resetAnalyze: () => void;
}

export default function AnalyzeResult({
  results,
  resumeData,
  resetAnalyze,
}: AnalyzeResultProps) {
  let jobFeatures: AnalyzeResultFeatures;
  let resumeFeatures: AnalyzeResultFeatures[];

  try {
    jobFeatures = results[0];
    resumeFeatures = results[1];
  } catch (err) {
    return toast.error(getErrorMessage(err));
  }
  

  return (
    <div className="space-y-6">
      <AnalyzeResultJob jobFeatures={jobFeatures} />
      <AnalyzeResultResume resumeData={resumeData} resumeFeatures={resumeFeatures} />

      <Button variant={"destructive"} onClick={resetAnalyze}>
        Analyze again
      </Button>
    </div>
  );
}
