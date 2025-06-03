import { Submission } from "@/lib/custom-types";

export default function LanguageBadge({
  language,
}: {
  language: Submission["language"];
}) {
  const baseClasses =
    "px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300";

  const languageClasses = {
    python: "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
    cpp: "bg-cyan-500/20 text-cyan-500 border border-cyan-500/30",
  };

  return (
    <span className={`${baseClasses} ${languageClasses[language]}`}>
      {language}
    </span>
  );
}
