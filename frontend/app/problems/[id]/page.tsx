import { Problem } from "@/lib/custom-types";
import { PageProps } from "@/.next/types/app/page";
import ProblemPage from "@/components/problem/ProblemPage";

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/problems/${id}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return <div className="text-2xl">Error fetching problem</div>;
  }

  const problem: Problem = await res.json();
  problem.accuracy =
    (problem.acceptedCount / problem.submissionCount) * 100 || 0;

  return <ProblemPage problem={problem} />;
}
