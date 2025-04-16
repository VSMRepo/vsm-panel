"use client";

import TopBar from "@/components/landing/TopBar";

export default function ErrorPage() {
  return (
    <>
      <TopBar />
      <div className="bg-base-200 min-h-screen flex flex-col items-center justify-center">
        <div className="text-5xl font-bold mb-4">Error</div>
        <p>Something went wrong</p>
      </div>
    </>
  );
}
