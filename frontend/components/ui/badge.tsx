export default function Badge({ text }: { text: string }) {
  const baseClasses =
    "px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300";

  const badgeClasses = {
    easy: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    medium: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    hard: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
    python: "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
    cpp: "bg-cyan-500/20 text-cyan-500 border border-cyan-500/30",
    accepted: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    pending: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  };
}
