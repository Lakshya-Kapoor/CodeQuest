export default function AccuracyBar({ accuracy }: { accuracy: number }) {
  // Determine color based on accuracy
  const getColor = () => {
    if (accuracy >= 80) return "bg-emerald-500";
    if (accuracy >= 50) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="flex items-center space-x-2 w-full">
      <div className="w-full h-2 bg-accent rounded-full overflow-hidden min-w-16">
        <div
          className={`h-full ${getColor()} transition-all duration-500 ease-out `}
          style={{ width: `${accuracy}%` }}
        ></div>
      </div>
      <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
        {accuracy.toFixed(1)}%
      </span>
    </div>
  );
}
