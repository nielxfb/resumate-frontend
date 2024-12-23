import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/handle-error";
import { toast } from "sonner";
import AnalyzeResultJob from "../analyze/analyze-result-job";
import AnalyzeResultResume from "../analyze/analyze-result-resume";
import {
  AnalyzeFileData,
  AnalyzeResultFeatures,
} from "@/lib/data/analyze/analyze-data";

interface AnalyzeResultProps {
  results: any; // JSON format
}

export default function DetailResult({
  results,
}: AnalyzeResultProps) {
  let jobFeatures: AnalyzeResultFeatures;
  let resumeFeatures: AnalyzeResultFeatures[];

  try {
    jobFeatures = results[0];
    resumeFeatures = results[1];
  } catch (err) {
    return toast.error(getErrorMessage(err));
  }


  const data: AnalyzeFileData[] = [
    {
      fileName: results[0].file_name,
      url: results[0].file_path,
      text: results[0].file_name,
    },
  ];

//   console.log(data)

  return (
    <div className="space-y-6">
      <AnalyzeResultJob jobFeatures={jobFeatures} />
      <AnalyzeResultResume resumeData={data} resumeFeatures={resumeFeatures} />
    </div>
  );
}
