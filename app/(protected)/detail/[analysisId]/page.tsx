'use client'

import { ContentLayout } from "@/components/base/protected/content-layout";
import DetailResult from "@/components/pages/detail/detail-result";
import { AnalyzeFileData } from "@/lib/data/analyze/analyze-data";
import { useAuth } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface AnalyzeResultProps {
  results: any; // JSON format
}

function splitString(str: string | null | undefined): string[] {
  if (!str) {
    return [];
  }
  return str.split(';');
}

const loadingContainerStyle : React.CSSProperties= {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const spinnerStyle : React.CSSProperties= {
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #3498db', 
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  animation: 'spin 1.5s linear infinite',
  marginBottom: '20px',
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default function DetailPage() {
  const [result, setResult] = useState<AnalyzeResultProps | null>(null); // Initialize as null
  const { analysisId } = useParams()

  useEffect(() => {
    const fetchResults = async () => {
      const url = `/api/service/cv/${analysisId}/`;
  
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }
  
        const res = await response.json();
  
        // Check if the response data is valid
        console.log(res)
        if (res && res.analysis && res.cvs && res.resumeFeatures) {
          const formattedData: AnalyzeResultProps = {
            results: [
              {
                educations: [res.analysis.education_target],
                experiences: splitString(res.analysis.experience_target),
                gpa: res.analysis.gpa_target,
                job_titles: splitString(res.analysis.job_target),
                languages: splitString(res.analysis.language_target),
                name: res.analysis.name,
                phone: res.analysis.phone,
                resume_idx: "",
                skills: splitString(res.analysis.skill_target),
                soft_skills: splitString(res.analysis.soft_skill_target),
                years_experiences: [res.analysis.years_target],
              },
              [
                {
                  educations: [res.resumeFeatures[0].education],
                  experiences: splitString(res.resumeFeatures[0].experience),
                  gpa: res.resumeFeatures[0].gpa,
                  job_titles: splitString(res.resumeFeatures[0].job),
                  languages: splitString(res.resumeFeatures[0].language),
                  name: res.resumeFeatures[0].name,
                  phone: res.resumeFeatures[0].phone,
                  rating: res.resumeFeatures[0].rating,
                  rating_details: {
                    educations: res.cvs[0].education_rating,
                    gpa: res.cvs[0].gpa_rating,
                    job_titles: res.cvs[0].job_rating,
                    years_experiences: res.cvs[0].years_rating,
                    experiences: res.cvs[0].experience_rating,
                    languages: res.cvs[0].language_rating,
                    skill: res.cvs[0].skill_rating,
                    soft_skills: res.cvs[0].soft_skill_rating,
                  },
                  resume_idx: res.resumeFeatures[0].id,
                  skills: splitString(res.resumeFeatures[0].skill),
                  soft_skills: splitString(res.resumeFeatures[0].soft_skill),
                  years_experiences: [],
                  file_name: res.cvs[0].file_name,
                  file_path: res.cvs[0].file_path,
                },
              ]
            ],
          };
  
          setResult(formattedData);
        } else {
          console.error('Response data is missing required properties');
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };
  
    fetchResults();
  }, [analysisId]);

  if (!result) {
    return (
      <div style={loadingContainerStyle}>
        <div style={spinnerStyle}></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <ContentLayout title="Detail">
      <DetailResult results={result.results}/>
    </ContentLayout>
  );
}
