import { PageProps } from "@/.next/types/app/page";
import SubmissionsTable from "@/components/SubmissionsTable";
import SubmitSolCard from "@/components/ui/SubmitSolCard";
import { Submission } from "@/lib/custom-types";
import { cookies } from "next/headers";

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/problems/${id}/submissions`,
    {
      headers: {
        Cookie: `access_token=${access_token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div className="text-2xl">Error fetching submissions</div>;
  }
  const submissions: Submission[] = await res.json();

  return (
    <>
      <SubmitSolCard problemId={id} />
      <SubmissionsTable submissions={submissions} />
    </>
  );
}
