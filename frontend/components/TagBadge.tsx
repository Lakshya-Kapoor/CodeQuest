import React from "react";

const TagBadge = ({ tag }: { tag: string }) => {
  return (
    <span className="px-2 py-1 bg-indigo-500/20 text-xs rounded-md text-indigo-400 font-medium">
      {tag}
    </span>
  );
};

export default TagBadge;
