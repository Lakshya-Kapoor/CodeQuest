export default function Badge({
  difficulty,
}: {
  difficulty: "easy" | "medium" | "hard";
}) {
  const baseClasses =
    "px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300";

  const difficultyClasses = {
    easy: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    medium: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    hard: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
  };

  return (
    <span className={`${baseClasses} ${difficultyClasses[difficulty]}`}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  );
}
