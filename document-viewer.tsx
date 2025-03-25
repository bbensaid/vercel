"use client";

import type React from "react";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DocumentViewer({
  onTextExtracted,
}: {
  onTextExtracted: (text: string) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    // In a real implementation, we would use a PDF.js or similar library
    // to parse the PDF and extract text
    try {
      // Simulate PDF processing
      setTimeout(() => {
        // This is where we'd actually extract text from the PDF
        const sampleText =
          "Vermont's healthcare reform efforts aim to improve access to quality healthcare while controlling costs. The Green Mountain Care Board was established to regulate health insurance rates and hospital budgets. Vermont has implemented innovative payment models and expanded Medicaid coverage to more residents.";

        onTextExtracted(sampleText);
        setDocumentUrl(URL.createObjectURL(file));
        setTotalPages(5); // In a real app, we'd get this from the PDF
        setCurrentPage(1);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error processing PDF:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2 border-b">
        <h3 className="font-medium">Document Viewer</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload PDF
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileUpload}
          />
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center bg-muted/30 overflow-auto">
        {isLoading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">
              Processing document...
            </p>
          </div>
        ) : documentUrl ? (
          <div className="relative w-full h-full flex flex-col items-center">
            <div className="flex-1 w-full flex items-center justify-center">
              {/* In a real app, we'd render the PDF page here */}
              <div className="bg-white shadow-lg p-8 m-4 max-w-md">
                <h2 className="text-xl font-bold mb-4">
                  Vermont Healthcare Reform
                </h2>
                <p className="mb-2">
                  Page {currentPage} of {totalPages}
                </p>
                <p>
                  Vermont's healthcare reform efforts aim to improve access to
                  quality healthcare while controlling costs. The Green Mountain
                  Care Board was established to regulate health insurance rates
                  and hospital budgets.
                </p>
              </div>
            </div>

            <div className="p-2 flex items-center justify-center gap-2 w-full border-t">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <FileText className="h-12 w-12" />
            <p>Upload a PDF document to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}
