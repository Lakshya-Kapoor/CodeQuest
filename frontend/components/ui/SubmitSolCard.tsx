"use client";

import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Button } from "./button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./dialog";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const languages = [
  { value: "cpp", label: "C++" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "JavaScript" },
];

export default function SubmitSolCard({ problemId }: { problemId: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/submissions`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Submission failed");
      return;
    } else {
      const data = await res.json();
      console.log("Submission successful:", data);
      router.refresh();
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon /> Submit solution
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto max-w-none">
        <DialogTitle>Submit Solution</DialogTitle>
        <form
          className="flex flex-wrap items-center gap-4"
          onSubmit={handleSubmit}
        >
          <input hidden name="problem_id" defaultValue={problemId} />
          <div className="flex items-center gap-3">
            <Label htmlFor="file" className="text-foreground text-nowrap">
              Solution:{" "}
            </Label>
            <Input
              type="file"
              name="file"
              accept=".js,.py,.java,.cpp"
              required
            />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="language" className="text-foreground">
              Language:{" "}
            </Label>
            <Select name="language" required>
              <SelectTrigger id="language" className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="hover:cursor-pointer">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
