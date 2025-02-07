"use client";
import { Input } from "@/components/ui/input";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Cover } from "@/components/ui/cover";
import { RainbowButton } from "@/components/magicui/rainbow-button";

const platforms = [
  { id: "github", name: "GitHub" },
  { id: "leetcode", name: "LeetCode" },
  { id: "codeforces", name: "Codeforces" },
  { id: "hackerrank", name: "HackerRank" },
  { id: "stackoverflow", name: "Stack Overflow" },
  { id: "devto", name: "Dev.to" },
  { id: "kaggle", name: "Kaggle" },
  { id: "codewars", name: "Codewars" },
  { id: "codechef", name: "CodeChef" },
  { id: "exercism", name: "Exercism" },
];

export default function Home() {

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-5 relative z-20 font-bold tracking-tight">
        Spot <Cover> Developers </Cover> Across <br /> Platforms
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-3xl text-neutral-700 dark:text-neutral-400 text-center mb-5">
        One Search. All Platforms.
      </p>
      <div className="z-[100] flex gap-5 justify-center items-center">
        <div>
          <Input
            className="py-2 text-lg w-[400px]"
            type="text"
            placeholder="Enter User Name"
          />
        </div>
        <div>
          <RainbowButton>Search User</RainbowButton>
        </div>
      </div>
    </BackgroundLines>
  );
}
