import { Submission } from "@/lib/custom-types";

export default function StatusBadge({
  status,
}: {
  status: Submission["status"];
}) {
  const baseClasses =
    "px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300";

  const statusClasses = {
    accepted: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    pending: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  };

  return (
    <span
      className={`${baseClasses} ${
        status in statusClasses
          ? statusClasses[status as keyof typeof statusClasses]
          : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
      }`}
    >
      {status}
    </span>
  );
}
