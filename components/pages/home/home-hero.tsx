import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import DotPattern from "@/components/magicui/dot-pattern";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClerkLoaded, SignInButton } from "@clerk/nextjs";
import BlurFade from "@/components/magicui/blur-fade";

export default function HomeHero() {
  return (
    <section className="bg-backgroundl relative flex h-[500px] w-full flex-col items-center gap-y-8 overflow-hidden rounded-lg py-32">
      <div className="z-10 flex items-center justify-center">
        <Link href="/">
          <AnimatedGradientText>
            🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />
            &nbsp;
            <span
              className={cn(
                `animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              Introducing Sroomarizer
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </Link>
      </div>
      <div className="flex flex-col justify-center gap-y-2 lg:gap-y-4">
        <GradualSpacing
          className="font-display text-center text-4xl font-bold tracking-[-0.1em] text-primary dark:text-white md:leading-[5rem] lg:text-7xl"
          text="AI-Powered Resume Analyzer"
        />
        <p className="max-w-4xl text-center sm:text-lg lg:text-xl">
          <b>Optimize</b> your resume with <b>AI-driven insights</b>. Enhance
          your chances of landing your dream job by fine-tuning your resume to
          align with industry standards and job requirements.
        </p>
      </div>
      <div className="z-20 flex items-center justify-center">
        <BlurFade delay={0.5} inView>
          <ClerkLoaded>
            <SignInButton>
              <Button>Grade your Resume with AI</Button>
            </SignInButton>
          </ClerkLoaded>
        </BlurFade>
      </div>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(250px_circle_at_center,white,transparent)]",
        )}
      />
    </section>
  );
}
