"use client";

import { useUploadFile } from "@/hooks/use-upload-file";
import { FileUploader } from "@/components/pages/analyze/file-uploader";

import { UploadedFilesCard } from "./uploaded-files-card";
import { useEffect } from "react";
import extractPdf from "@/lib/extract-pdf";
import { AnalyzeFileData } from "@/lib/data/analyze/analyze-data";

interface ResumeUploaderProps {
  handleResumeData: (resumeData: AnalyzeFileData[]) => void;
}

export function ResumeUploader({ handleResumeData }: ResumeUploaderProps) {
  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
    "fileUploader",
    { defaultUploadedFiles: [] },
  );

  const getResumeData = (arr_text: string[]) => {
    const resumeData: AnalyzeFileData[] = uploadedFiles.map((file, idx) => ({
      fileName: file.name,
      url: file.url,
      text: arr_text[idx],
    }));

    return resumeData;
  };

  useEffect(() => {
    extractPdf(uploadedFiles)
      .then((res) => handleResumeData(getResumeData(res)))
      .catch((e) => console.log(e));
  }, [uploadedFiles]);

  return (
    <div className="space-y-6">
      <h1 className="font-bold">Resume to compare</h1>

      <FileUploader
        maxFileCount={4}
        maxSize={4 * 1024 * 1024}
        progresses={progresses}
        onUpload={onUpload}
        disabled={isUploading}
        multiple={true}
      />
      <UploadedFilesCard uploadedFiles={uploadedFiles} />
    </div>
  );
}
