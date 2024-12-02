"use client";

import pdfToText from "react-pdftotext";
import { Card } from "@/components/ui/card";
import { EmptyCard } from "./empty-card";
import { FileUploader } from "./file-uploader";
import { useUploadFile } from "@/hooks/use-upload-file";
import { FileUploaderDropOnly } from "./file-uploader-drop-only";
import { useEffect, useState } from "react";
import extractPdf from "@/lib/extract-pdf";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface JobDescriptionUploaderProps {
  jobText: string;
  handleJobText: (text: string) => void;
}

export function JobDescriptionUploader({
  jobText,
  handleJobText,
}: JobDescriptionUploaderProps) {
  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
    "fileUploader",
    { defaultUploadedFiles: [] },
  );

  useEffect(() => {
    const latestFile = uploadedFiles[uploadedFiles.length - 1]
    extractPdf([latestFile])
      .then((res) => handleJobText(res[0] ?? "")) // Get latest file text
      .catch((e) => console.log(e));
  }, [uploadedFiles]);

  return (
    <div className="space-y-6">
      <h1 className="font-bold">Job description</h1>
      <Card className="relative h-min">
        <Textarea
          className="pointer-events-auto h-52 w-full resize-none bg-transparent"
          value={jobText}
          onChange={(e) => handleJobText(e.target.value)}
        />

      </Card>
        <FileUploaderDropOnly
          maxFileCount={1}
          maxSize={4 * 1024 * 1024}
          progresses={progresses}
          onUpload={onUpload}
          disabled={isUploading}
          className={` ${jobText && ""}`}
        />
    </div>
  );
}
