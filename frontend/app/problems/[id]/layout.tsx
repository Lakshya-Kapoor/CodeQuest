import ProblemDetailsNav from "@/components/ProblemDetailsNav";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProblemDetailsNav />
      {children}
    </>
  );
}
