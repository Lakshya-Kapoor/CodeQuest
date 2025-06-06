import { useRouter } from "next/navigation";
import { Problem } from "@/lib/custom-types";
import Badge from "../DifficultyBadge";
import AccuracyBar from "../ui/AccuracyBar";

export default function ProblemTableRow({ problem }: { problem: Problem }) {
  const router = useRouter();

  return (
    <tr
      className="hover:bg-popover transition-colors duration-200 group hover:cursor-pointer"
      onClick={() => router.push(`/problems/${problem._id}`)}
      role="button"
    >
      <td className="px-6 py-4 w-[60%]">
        <div className="font-medium text-primary transition-colors duration-200">
          {problem.title}
        </div>
      </td>
      <td className="px-6 py-4 w-[15%]">
        <Badge difficulty={problem.difficulty} />
      </td>
      <td className="px-6 py-4 w-[15%] text-sm text-muted-foreground">
        <AccuracyBar accuracy={problem.accuracy!} />
      </td>
    </tr>
  );
}
