"use client"
import { useTheme } from "next-themes";
import React from "react";

const GithubStats = ({githubUserName} : {githubUserName: string}) => {
    const { theme } = useTheme();

  return (
    <img
      src={`https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api?username=${githubUserName}&show_icons=true&theme=${
        theme === "dark" ? "vue-dark" : "vue"
      }`}
      height="150"
      className="w-full"
    />
  );
};

export default GithubStats;
