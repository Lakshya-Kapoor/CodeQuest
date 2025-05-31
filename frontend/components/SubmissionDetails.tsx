import { cookies } from "next/headers";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "./ui/dialog";

export default async function SubmissionDetails({
  submission_id,
}: {
  submission_id: string;
}) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/submissions/${submission_id}/code`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (!res.ok) {
    return <div>Error fetching submission details</div>;
  }
  const code = await res.json();

  return (
    <Dialog>
      <DialogTrigger className="underline underline-offset-4 hover:cursor-pointer">
        {submission_id}
      </DialogTrigger>
      <DialogContent className="lg:min-w-[70%] min-w-full bg-secondary p-4">
        <DialogTitle>Code</DialogTitle>
        <pre className="whitespace-pre-wrap font-mono text-sm overflow-auto max-h-[70vh]">
          {code}
        </pre>
      </DialogContent>
    </Dialog>
  );
}
