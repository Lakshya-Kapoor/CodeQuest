"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Label } from "@radix-ui/react-label";

interface TagsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function TagsInput({ value, onChange }: TagsInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleRemove = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="tags">Tags</Label>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <Badge key={tag} variant="secondary" className="py-1 rounded-full">
              {tag}
              <button
                type="button"
                onClick={() => handleRemove(tag)}
                className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-1"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <Input
        id="tags"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a tag and press Enter..."
        className="w-full"
      />
    </div>
  );
}
