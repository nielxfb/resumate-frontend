"use client";

import { ContentLayout } from "@/components/base/protected/content-layout";
import { DataTable } from "@/components/pages/payment/data-table";
import { result_columns } from "@/components/pages/result/result_columns";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface TransactionData {
  id: number;
  date: string;
  totalCVs: number;
  cvs: number;
}

const loadingContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const spinnerStyle: React.CSSProperties = {
  border: "4px solid #f3f3f3",
  borderTop: "4px solid #3498db",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  animation: "spin 1.5s linear infinite",
  marginBottom: "20px",
};

export default function AnalysisHistoryPage() {
  const [result, setResult] = useState<TransactionData[]>();
  const { userId } = useAuth();

  useEffect(() => {
    const fetchResults = async () => {
      const url = `/api/service/analyze/${userId}/`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const result = await response.json();
        const formattedData: TransactionData[] = result.map((item: any) => ({
          id: item.id,
          date: item.date,
          totalCVs: item.cvs.length,
        }));
        setResult(formattedData);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [userId]);

  useEffect(() => {
    console.log(result);
  }, [result]);
  
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `, styleSheet.cssRules.length);
  }, []);

  if (!result) {
    return (
      <div style={loadingContainerStyle}>
        <div style={spinnerStyle}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <ContentLayout title="History">
      <div className="flex h-full flex-1 flex-col space-y-8 p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Analyze Results
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all your analyze results.
            </p>
          </div>
        </div>
        {result !== null && result !== undefined && (
          <DataTable data={result} columns={result_columns} />
        )}
      </div>
    </ContentLayout>
  );
}
