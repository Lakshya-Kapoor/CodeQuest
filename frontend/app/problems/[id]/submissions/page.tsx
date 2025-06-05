import { PageProps } from "@/.next/types/app/page";
import SubmissionsTable from "@/components/submission/SubmissionsTable";
import SubmitSolutionButton from "@/components/submission/SubmissionForm";
import { getUser } from "@/lib/auth";
import { Submission } from "@/lib/custom-types";
import { cookies } from "next/headers";

export default async function Page({ params }: PageProps) {
  const user = await getUser();
  if (!user) {
    return <div>Login to create and view submissions</div>;
  }

  const { id } = await params;
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/problems/${id}/submissions`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div>Error fetching submissions</div>;
  }
  const submissions: Submission[] = await res.json();

  submissions.sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  return (
    <>
      <SubmitSolutionButton problemId={id} accessToken={access_token} />
      <SubmissionsTable submissions={submissions} />
    </>
  );
}
