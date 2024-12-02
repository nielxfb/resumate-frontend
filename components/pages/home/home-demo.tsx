import ShineBorder from "@/components/magicui/shine-border";

export default function HomeDemo() {
  return (
    <ShineBorder
      className="relative flex h-[48rem] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
    >
      AI-Powered Resume Analyzer Demo
    </ShineBorder>
  );
}
