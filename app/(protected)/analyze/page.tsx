import { ContentLayout } from "@/components/base/protected/content-layout";
import { AnalyzerUploader } from "@/components/pages/analyze/analyze-uploader";


export default function AnalyzePage() {
  return (
    <ContentLayout title="Analyze">
      <AnalyzerUploader />
    </ContentLayout>
  );
}
