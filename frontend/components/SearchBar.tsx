import React from "react";
import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg 
                   text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 
                   focus:ring-ring focus:border-ring transition-all duration-200"
        placeholder="Search problems..."
      />
    </div>
  );
};

export default SearchBar;
