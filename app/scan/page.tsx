"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ChatInterface from "@/components/ChatInterface";

function ScanContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") as "moros" | "soros" | null;

  return <ChatInterface initialTab={tab === "soros" ? "soros" : "moros"} />;
}

export default function ScanPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-[calc(100vh-64px)]"><div className="text-gray-500 font-dm-mono">Loading...</div></div>}>
      <ScanContent />
    </Suspense>
  );
}
