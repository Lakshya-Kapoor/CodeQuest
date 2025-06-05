import ProblemDetailsNav from "@/components/problem/ProblemDetailsNav";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProblemDetailsNav />
      {children}
    </>
  );
}
