import ProblemsTable from "@/components/ProblemsTable";
import { Problem } from "@/lib/custom-types";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/problems`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return <div className="text-2xl">Error fetching problems</div>;
  }

  const problems: Problem[] = await res.json();

  problems.forEach((problem) => (problem.accuracy = 60));

  return (
    <main className="mt-10 flex-grow flex justify-center items-start">
      <ProblemsTable problems={problems} />
    </main>
  );
}
