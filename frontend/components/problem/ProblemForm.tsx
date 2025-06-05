"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import TagsInput from "./TagsInput";

export default function ProblemForm({ accessToken }: { accessToken?: string }) {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("tags", tags.join(","));

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/problems`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      console.error("Submission failed");
      return;
    } else {
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className=" group transition-all duration-300 hover:scale-105"
          variant="outline"
        >
          <PlusIcon className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
          Create problem
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] w-full overflow-y-auto space-y-4">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Problem</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new coding problem.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter problem title"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select name="difficulty" required>
                <SelectTrigger id="difficulty" className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 flex-1">
              <Label htmlFor="file">Problem zip</Label>
              <Input
                id="file"
                type="file"
                name="file"
                accept=".zip"
                placeholder="Upload problem file"
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="timeLimit">Time Limit (seconds)</Label>
              <Input
                id="timeLimit"
                name="timeLimit"
                type="number"
                placeholder="Enter time limit"
                min={1}
                max={10}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="memoryLimit">Memory Limit (MB)</Label>
              <Input
                id="memoryLimit"
                name="memoryLimit"
                type="number"
                placeholder="Enter memory limit"
                min={6}
                max={512}
              />
            </div>
          </div>
          <TagsInput onChange={setTags} value={tags} />

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button type="submit">Create Problem</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
