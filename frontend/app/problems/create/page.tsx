import ProblemForm from "@/components/problem/ProblemForm";
import ProblemPage from "@/components/problem/ProblemPage";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth";
import { Problem } from "@/lib/custom-types";
import { DownloadIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

const sampleProblem: Problem = {
  _id: "123",
  title: "Sample Problem",
  author: "author",
  acceptedCount: 10,
  submissionCount: 13,
  accuracy: 76.92,
  difficulty: "easy",
  createdAt: new Date().toISOString(),
  memoryLimit: 256,
  timeLimit: 2,
  tags: ["math", "implementation"],
  problemStatement: `
## Problem Statement
Sum two numbers a and b
## Input
Two integers a and b, where 1 ≤ a, b ≤ 10^9
## Output
The sum of a and b
## Example
**Input:**
\`\`\`plaintext
1 2
\`\`\`
**Output:**
\`\`\`plaintext
3
\`\`\`
`,
};

export default async function Page() {
  const user = await getUser();
  if (!user || user.role !== "admin") {
    return <div>Login as an admin to create problems</div>;
  }

  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Problems</h1>
          <p className="text-muted-foreground">
            Create and share coding problems
          </p>
        </div>
        <ProblemForm accessToken={access_token} />
      </div>
      <ProblemPage problem={sampleProblem} />
      <Button className="group" asChild>
        <Link href="/sample/problem.zip" download>
          <DownloadIcon className="transition-transform duration-200 group-hover:translate-y-0.5" />{" "}
          Download Template
        </Link>
      </Button>
    </>
  );
}
