"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const GithubStats = ({ githubUserName }: { githubUserName: string }) => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Delay rendering until the component is mounted on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Render nothing during SSR
  }

  return (
    <img
      src={`https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api?username=${githubUserName}&show_icons=true&theme=${
        theme === "dark" ? "vue-dark" : "vue"
      }`}
      height="150"
      className="w-full"
      alt={`GitHub stats for ${githubUserName}`}
      onError={(e) => {
        e.currentTarget.src = "/fallback-image.png"; // Fallback image
      }}
    />
  );
};

export default GithubStats;