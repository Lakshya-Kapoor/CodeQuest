import ProblemsTable from "@/components/ProblemsTable";
import { Problem } from "@/lib/custom-types";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/problems`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return <div>Error fetching problems</div>;
  }

  const problems: Problem[] = await res.json();

  problems.forEach(
    (problem) =>
      (problem.accuracy =
        (problem.acceptedCount / problem.submissionCount) * 100 || 0)
  );

  return <ProblemsTable problems={problems} />;
}
