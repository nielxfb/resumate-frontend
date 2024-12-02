import { UploadedFile } from "@/types";
import pdfToText from "react-pdftotext";
import { toast } from "sonner";
import { getErrorMessage } from "./handle-error";

export default async function extractPdf(
  uploadedFiles: UploadedFile<unknown>[],
): Promise<string[]> {
  const extractTextFromPDF = async (file: Blob): Promise<string> => {
    try {
      const text = await pdfToText(file);
      return text.replace(/\s+/g, " ").trim();
    } catch (err) {
      toast.error(getErrorMessage(err));
      return "";
    }
  };

  if (uploadedFiles.length > 0) {
    const extractedTexts = await Promise.all(
      uploadedFiles.map(async (file) => {
        try {
          if (!file.url) {
            throw new Error("File URL is missing");
          }

          const response = await fetch(file.url);

          if (!response.ok) {
            toast.error(getErrorMessage(response.statusText));
          }

          const blob = await response.blob();
          return await extractTextFromPDF(blob);
        } catch (err) {
          toast.error(getErrorMessage(err));
          return "";
        }
      }),
    );

    return extractedTexts;
  }

  return [];
}
