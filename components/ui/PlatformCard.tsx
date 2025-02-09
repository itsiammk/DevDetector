"use client";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

interface PlatformCardProps {
  name: string;
  exists: boolean; // Indicates if the platform profile exists
  url: string; // URL to navigate to the platform's profile page
  username: string; 
}

export default function PlatformCard({ name, exists, url, username }: PlatformCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const profileUrl = `${url}${username}`
  console.log(url, username, `${url}${username}`,'url');

  return (
    <div
      className="relative overflow-hidden rounded-lg p-6 bg-opacity-50 transition-all duration-300 ease-in-out border shadow-md"
      style={{
        background: "rgba(255, 255, 255, 0.1)", // Glassmorphism background for light theme
        backdropFilter: "blur(10px)", // Frosted glass blur effect
        borderColor: isHovered ? "rgba(0, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.1)", // Border color adapts to hover
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-cyan-300 to-purple-300 opacity-0 transition-opacity duration-300 ease-in-out"
        style={{ opacity: isHovered ? 0.1 : 0 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Platform Name */}
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{name}</h2>

        {/* Status Section */}
        <div className="mb-4 flex-grow">
          <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
          <div
            className={`flex items-center ${
              exists ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                exists ? "bg-green-600 dark:bg-green-400" : "bg-red-600 dark:bg-red-400"
              } animate-pulse-slow`}
            ></span>
            <p>{exists ? "Available" : "Unavailable"}</p>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={exists ? profileUrl : "#"} // Link to the platform's profile page if available
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-2 px-4 rounded transition-colors duration-300 ease-in-out flex items-center justify-center text-sm ${
            exists
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-600 dark:text-gray-400"
          }`}
        >
          {exists ? "Visit Profile" : "Profile Unavailable"}
          {exists && <ExternalLink className="ml-2" size={14} />}
        </a>
      </div>
    </div>
  );
}