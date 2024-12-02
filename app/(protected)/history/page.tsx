'use client'

import { ContentLayout } from "@/components/base/protected/content-layout";
import { DataTable } from "@/components/pages/payment/data-table";
import { result_columns } from "@/components/pages/result/result_columns";
import { auth } from "@clerk/nextjs/server";
import { useEffect, useState } from "react";

interface TransactionData {
  id: number;
  date: string;
  totalCVs: number;
}


export default function AnalysisHistoryPage() {
  const [result, setResult] = useState<TransactionData[]>();
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/service/analyze/user123/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }
  
        const result = await response.json();
        const formattedData: TransactionData[] = result.map((item: any) => ({
          id: item.id,
          date: item.date,
          totalCVs: item.cvs.length,
        }));
        setResult(formattedData);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };
  
    fetchResults();
  }, []); 
  
  useEffect(() => {
    console.log(result);
  }, [result]);
  


  return (
    <ContentLayout title="History">
       <div className="flex h-full flex-1 flex-col space-y-8 p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Analyze Results
            </h2>
            <p className="text-muted-foreground">
              Here's a list of all your analyze results.
            </p>
          </div>
        </div>
        {
          result !== null && result !== undefined && <DataTable data={result} columns={result_columns} />
        }
      </div>
    </ContentLayout>
  );
}
