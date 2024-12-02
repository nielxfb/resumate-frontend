import { HomeFeatures } from "@/components/pages/home/home-features";
import HomeHero from "@/components/pages/home/home-hero";
import HomeDemo from "@/components/pages/home/home-demo";
import HomeFAQ from "@/components/pages/home/home-faq";
import HomeHIW from "@/components/pages/home/home-hiw";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { sessionId } = auth();

  if (sessionId) {
    redirect("/dashboard");
  }

  return (
    <main className="container mx-auto flex flex-col gap-y-12">
      <HomeHero />
      <HomeDemo />
      <HomeFeatures />
      <HomeHIW />
      <HomeFAQ />
    </main>
  );
}
