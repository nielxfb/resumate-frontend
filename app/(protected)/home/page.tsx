"use client";

import { ContentLayout } from "@/components/base/protected/content-layout";
import { useState } from "react";

export default function DashboardPage() {
  const [activeSlide, setActiveSlide] = useState(1);

  const handleSlide = (slide: number) => {
    setActiveSlide(slide);
  };

  return (
    <ContentLayout title="Home">
      <section className="flex flex-col w-full min-h-screen bg-background">
        <div className="flex flex-col w-5/6 h-screen mx-auto gap-4 py-8">
          <h3 className="text-lg font-medium text-muted-foreground">How It Works</h3>
          <h2 className="text-2xl font-bold text-foreground">Check Your CV Easily with Resumate</h2>

          {/* Slider Navigation */}
          <div className="flex flex-row w-full min-h-12 justify-evenly gap-5 rounded-xl shadow-md mt-6 relative bg-secondary">
            <div
              className={`flex items-center justify-center w-full rounded-xl text-lg font-semibold cursor-pointer ${
                activeSlide == 1 ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
              onClick={() => handleSlide(1)}
            >
              <h3>1&emsp;Drop CV</h3>
            </div>
            <div
              className={`flex items-center justify-center w-full rounded-xl text-lg font-semibold cursor-pointer ${
                activeSlide == 2 ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
              onClick={() => handleSlide(2)}
            >
              <h3>2&emsp;Analyze CV</h3>
            </div>
            <div
              className={`flex items-center justify-center w-full rounded-xl text-lg font-semibold cursor-pointer ${
                activeSlide == 3 ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
              onClick={() => handleSlide(3)}
            >
              <h3>3&emsp;View Result</h3>
            </div>
            <div
              id="slider-indicator"
              className="absolute w-1/3 h-full rounded-xl z-0 bg-accent opacity-20"
              style={{ transform: `translateX(${(activeSlide - 2) * 100}%)` }}
            ></div>
          </div>

          {/* Slider Content */}
          <div className="flex w-full bg-muted mt-4 mb-2 shadow-md rounded-md" style={{ height: "75%" }}>
          {activeSlide == 1 && (
              <div className="flex w-full h-full">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/tpaweb-15667.appspot.com/o/2024-12-23%2007-17-24.gif?alt=media&token=e89c5e9c-2ee9-4413-af13-4e6559240d49"
                  className="object-cover w-full h-full rounded-md"
                  alt="Step 1"
                />
              </div>
            )}
            {activeSlide == 2 && (
              <div className="flex w-full h-full">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/tpaweb-15667.appspot.com/o/2024-12-23%2007-17-52.gif?alt=media&token=3f7ef06c-2406-4235-b770-7c9a08642aeb"
                  className="object-cover w-full h-full rounded-md"
                  alt="Step 2"
                />
              </div>
            )}
            {activeSlide == 3 && (
              <div className="flex w-full h-full">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/tpaweb-15667.appspot.com/o/2024-12-23%2007-18-07.gif?alt=media&token=11c858ba-8ba1-4d00-9d14-ca01735c3856"
                  className="object-cover w-full h-full rounded-md"
                  alt="Step 3"
                />
              </div>
            )}
          </div>

          {/* Slider Indicators */}
          <div className="flex items-center w-1/6 mx-auto justify-center gap-4">
            <div
              className={`w-4 h-4 rounded-full ${
                activeSlide == 1 ? "bg-primary" : "bg-muted-foreground"
              }`}
            ></div>
            <div
              className={`w-4 h-4 rounded-full ${
                activeSlide == 2 ? "bg-primary" : "bg-muted-foreground"
              }`}
            ></div>
            <div
              className={`w-4 h-4 rounded-full ${
                activeSlide == 3 ? "bg-primary" : "bg-muted-foreground"
              }`}
            ></div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
}
