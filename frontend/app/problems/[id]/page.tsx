import { Problem } from "@/lib/custom-types";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/problems/${id}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return <div className="text-2xl">Error fetching problem</div>;
  }

  const problem: Problem = await res.json();

  return (
    <div>
      <h1>{problem.title}</h1>
    </div>
  );
}
