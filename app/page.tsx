"use client";
import { Input } from "@/components/ui/input1";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Cover } from "@/components/ui/cover";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { useState } from "react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { FlipWords } from "@/components/ui/flip-words";

const platforms = [
  { id: "github", name: "GitHub" },
  { id: "gitlab", name: "GitLab" },
  { id: "bitbucket", name: "Bitbucket" },
  { id: "leetcode", name: "LeetCode" },
  { id: "codeforces", name: "Codeforces" },
  { id: "hackerrank", name: "HackerRank" },
  { id: "codewars", name: "Codewars" },
  { id: "codechef", name: "CodeChef" },
  { id: "topcoder", name: "TopCoder" },
  { id: "exercism", name: "Exercism" },
  { id: "stackoverflow", name: "Stack Overflow" },
  { id: "devto", name: "Dev.to" },
  { id: "hashnode", name: "Hashnode" },
  { id: "medium", name: "Medium" },
  { id: "kaggle", name: "Kaggle" },
  { id: "geeksforgeeks", name: "GeeksForGeeks" },
  { id: "npm", name: "NPM" },
  { id: "pypi", name: "PyPI" },
  { id: "docker", name: "Docker Hub" },
  { id: "replit", name: "Replit" },
  { id: "codepen", name: "CodePen" },
  { id: "jsfiddle", name: "JSFiddle" },
];

const words = ["Developers", "Coders", "Programmers"];
export default function Home() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!username.trim()) return;
    // Redirect to the results page with the username as a query parameter
    window.location.href = `/results?username=${encodeURIComponent(username)}`;
  };

  // const handleSearch = async () => {
  //   if (!username) return;
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`/api/check?username=${username}`);
  //     const data = await res.json();
  //     console.log(data, "data");
  //     setResults(data);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <div className="z-10 flex items-center justify-center mb-4 sm:mb-0">
        <AnimatedGradientText>
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
          <span
            className={cn(
              `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            Developer Detector
          </span>
          {/* <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" /> */}
        </AnimatedGradientText>
      </div>
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl lg:text-7xl font-sans py-2 md:py-5 relative z-20 font-bold tracking-tight">
        Spot <br className="block md:hidden" /> <FlipWords words={words} />{" "}
        <br className="block md:hidden" />{" "}Across 
        <br className="hidden md:block" /> Platforms
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-3xl text-neutral-700 dark:text-neutral-400 text-center mb-5">
        One Search. All Platforms.
      </p>
      <div className="z-[100] flex flex-col gap-5 justify-center items-center mt-10 md:mt-2">
        <div className=" w-[300px] md:w-[400px]">
          <Input
            className="py-2 text-sm md:text-lg bg-gray-200 "
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter User Name"
            id="username"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <div>
          <RainbowButton className="" onClick={handleSearch} disabled={loading}>
            Search User
          </RainbowButton>
        </div>
      </div>
    </BackgroundLines>
  );
}
