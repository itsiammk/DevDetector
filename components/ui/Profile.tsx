import Image from "next/image";

interface ProfileProps {
  name: string;
  country: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  profilePhoto: string;
  profilePhotos: any;
  githubUsername: string;
  stackoverflowReputation: number | null;
  codeforcesRating: number | null;
  hackerrankLevel: number;
  leetcodeSolvedProblems: {
    easy: number;
    medium: number;
    hard: number;
  };
  codechefRating: number | null;
  linkedinUrl: string | null;
  twitterUsername: string | null;
  websiteUrl: string | null;
}

export default function Profile({
  name,
  country,
  email,
  phone,
  address,
  profilePhoto,
  profilePhotos,
  githubUsername,
  stackoverflowReputation,
  codeforcesRating,
  hackerrankLevel,
  leetcodeSolvedProblems,
  codechefRating,
  linkedinUrl,
  twitterUsername,
  websiteUrl,
}: ProfileProps) {
  return (
    <div className="relative overflow-hidden rounded-lg p-6 shadow bg-card border">
      {/* Content */}
      <div className="flex flex-col items-center mb-6">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
          <Image
            src={
              profilePhoto ||
              "https://avatars.githubusercontent.com/u/71566617?v=4"
            } // Use dynamic image URL or fallback
            alt={name || "Profile Photo"}
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
        {/* Name */}
        <h2 className="text-2xl font-bold text-cyan-300 dark:text-cyan-400">
          {name || "Name Unavailable"}
        </h2>
      </div>
      {/* Profile Details */}
      <div className="space-y-2">
        <p>
          <span className="text-gray-600 dark:text-gray-400">Country:</span>{" "}
          <span className="text-gray-900 dark:text-white">
            {country || "-"}
          </span>
        </p>
        <p>
          <span className="text-gray-600 dark:text-gray-400">Address:</span>{" "}
          <span className="text-gray-900 dark:text-white">
            {address || "-"}
          </span>
        </p>
        <p>
          <span className="text-gray-600 dark:text-gray-400">Email:</span>{" "}
          <span className="text-gray-900 dark:text-white">{email || "-"}</span>
        </p>
        <p>
          <span className="text-gray-600 dark:text-gray-400">Phone:</span>{" "}
          <span className="text-gray-900 dark:text-white">{phone || "-"}</span>
        </p>
        <p>
          <span className="text-gray-600 dark:text-gray-400">GitHub:</span>{" "}
          {githubUsername ? (
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {githubUsername}
            </a>
          ) : (
            "-"
          )}
        </p>
        <p>
          <span className="text-gray-600 dark:text-gray-400">
            Stack Overflow Reputation:
          </span>{" "}
          <span className="text-gray-900 dark:text-white">
            {stackoverflowReputation !== null ? stackoverflowReputation : "-"}
          </span>
        </p>
        <p>
          <span className="text-gray-600 dark:text-gray-400">
            Codeforces Rating:
          </span>{" "}
          <span className="text-gray-900 dark:text-white">
            {codeforcesRating !== null ? codeforcesRating : "-"}
          </span>
        </p>
        <p>
          <span className="text-gray-600 dark:text-gray-400">
            HackerRank Level:
          </span>{" "}
          <span className="text-gray-900 dark:text-white">
            {hackerrankLevel || "-"}
          </span>
        </p>
    
        <p>
          <span className="text-gray-600 dark:text-gray-400">
            CodeChef Rating:
          </span>{" "}
          <span className="text-gray-900 dark:text-white">
            {codechefRating !== null ? codechefRating : "-"}
          </span>
        </p>
        <p>
          <span className="text-gray-600 dark:text-gray-400">LinkedIn:</span>{" "}
          {linkedinUrl ? (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LinkedIn Profile
            </a>
          ) : (
            "-"
          )}
        </p>
        <p>
          <span className="text-gray-600 dark:text-gray-400">Twitter:</span>{" "}
          {twitterUsername ? (
            <a
              href={`https://twitter.com/${twitterUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              @{twitterUsername}
            </a>
          ) : (
            "-"
          )}
        </p>
        <p>
          <span className="text-gray-600 dark:text-gray-400">Website:</span>{" "}
          {websiteUrl ? (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Visit Website
            </a>
          ) : (
            "-"
          )}
        </p>
      </div>
    </div>
  );
}
