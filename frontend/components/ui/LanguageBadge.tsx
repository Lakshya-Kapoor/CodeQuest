import { Submission } from "@/lib/custom-types";

export default function LanguageBadge({
  language,
}: {
  language: Submission["language"];
}) {
  const baseClasses =
    "px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300";

  const languageClasses = {
    python: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  };

  return (
    <span className={`${baseClasses} ${languageClasses[language]}`}>
      {language}
    </span>
  );
}
