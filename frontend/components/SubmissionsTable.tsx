import { Submission } from "@/lib/custom-types";
import StatusBadge from "./ui/StatusBadge";
import LanguageBadge from "./ui/LanguageBadge";
import SubmissionDetails from "./SubmissionDetails";

export default function SubmissionsTable({
  submissions,
}: {
  submissions: Submission[];
}) {
  const headerClasses = "text-left px-6 py-4 font-semibold";

  const dataClasses =
    "px-6 py-4 text-muted-foreground  group-hover:text-foreground transition-colors duration-200";
  return (
    <div className="rounded-lg shadow-lg border border-border">
      <table className="table-auto w-full text-sm ">
        <thead className="border-b border-border">
          <tr>
            <th className={headerClasses}>Submission ID</th>
            <th className={headerClasses}>Language</th>
            <th className={headerClasses}>Submitted At</th>
            <th className={headerClasses}>Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {submissions.map((submission) => (
            <tr
              key={submission._id}
              className="hover:bg-popover transition-colors duration-200 group"
            >
              <td className={dataClasses}>
                <SubmissionDetails submission_id={submission._id} />
              </td>
              <td className={dataClasses}>
                <LanguageBadge language={submission.language} />
              </td>
              <td className={dataClasses}>
                {new Date(submission.submittedAt).toLocaleString()}
              </td>
              <td className={dataClasses}>
                <StatusBadge status={submission.status} />
              </td>
            </tr>
          ))}
          {submissions.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-8 text-center text-muted-foreground"
              >
                No submissions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
