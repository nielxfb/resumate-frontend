import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import { SignUp } from "@clerk/nextjs";
import BlurFade from "@/components/magicui/blur-fade";

export default function AuthSignUpPage() {
  return (
    <main className="flex min-h-screen justify-center">
      <section className="bg-backgroundl relative flex h-[800px] w-full flex-col items-center gap-y-8 overflow-hidden rounded-l p-12">
        <div className="z-20 flex items-center justify-center">
          <BlurFade delay={0.75} inView>
            <SignUp />
          </BlurFade>
        </div>
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          )}
        />
      </section>
    </main>
  );
}
