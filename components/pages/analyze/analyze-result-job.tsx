import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AnalyzeResultFeatures,
  AnalyzeResultFeaturesMapping,
} from "@/lib/data/analyze/analyze-data";

interface AnalyzeResultJob {
  jobFeatures: AnalyzeResultFeatures;
}

export default function AnalyzeResultJob({ jobFeatures }: AnalyzeResultJob) {
  return (
    <Card>
      <CardHeader>
        <Tabs defaultValue={Object.keys(jobFeatures)[1]} className="w-full">
          <TabsList>
            {Object.keys(jobFeatures)
              .filter((key) => key !== "resume_idx")
              .map((key) => (
                <TabsTrigger key={key} value={key}>
                  {AnalyzeResultFeaturesMapping[key] ?? key}
                </TabsTrigger>
              ))}
          </TabsList>
          {Object.entries(jobFeatures).map(([key, value]) => (
            <TabsContent key={key} value={key}>
              <div className="space-y ms-4 mt-4 font-mono">
                {Array.isArray(value) && value.length >= 1 ? (
                  value.length > 1 ? (
                    value.map((item, index) =>
                      typeof item === "object" && 'text' in item ? (
                        <div key={index} className="relative flex">
                          <span className="absolute top-0 h-2 w-2 translate-y-full rounded-full bg-gray-500"></span>
                          <p className="ms-4">{item.text}</p>
                        </div>
                      ) : (
                        <div key={index} className="relative flex">
                          <span className="absolute top-0 h-2 w-2 translate-y-full rounded-full bg-gray-500"></span>
                          <p className="ms-4">{item}</p>
                        </div>
                      ),
                    )
                  ) : (
                    <p>{value}</p>
                  )
                ) : (
                  <div>No items to display</div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardHeader>
    </Card>
  );
}
