// app/results/page.tsx
import PlatformCard from "@/components/ui/PlatformCard";
import Profile from "@/components/ui/Profile";
import { Suspense } from "react";
import { Space_Mono } from "next/font/google";
import Loading from "@/components/ui/loading";
import { PieChartComponent } from "@/components/chart/chartPie";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import extractUserProfile from "@/lib/extractUserProfile";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

const websiteRedirectUrl: Record<string, string> = {
    github: "https://github.com/",
    gitlab: "https://gitlab.com/",
    bitbucket: "https://bitbucket.org/",
    leetcode: "https://leetcode.com/",
    codeforces: "https://codeforces.com/profile/",
    hackerrank: "https://www.hackerrank.com/",
    codewars: "https://www.codewars.com/users/",
    codechef: "https://www.codechef.com/users/",
    topcoder: "https://www.topcoder.com/members/",
    exercism: "https://exercism.org/profiles/",
    stackoverflow: "https://stackoverflow.com/users/",
    devto: "https://dev.to/",
    hashnode: "https://hashnode.com/@",
    medium: "https://medium.com/@",
    kaggle: "https://www.kaggle.com/",
    geeksforgeeks: "https://auth.geeksforgeeks.org/user/",
    npm: "https://www.npmjs.com/~",
    pypi: "https://pypi.org/user/",
    docker: "https://hub.docker.com/u/",
    replit: "https://replit.com/@",
    codepen: "https://codepen.io/",
    jsfiddle: "https://jsfiddle.net/user/",
  }
  

export default function ResultsPage({
    searchParams,
  }: {
    searchParams: any;
  }) {
    const username = Array.isArray(searchParams.username)
      ? searchParams.username[0]
      : searchParams.username;
  
    if (!username) {
      return <p>No username provided.</p>;
    }
  
    return (
      <div>
        <Suspense fallback={<Loading />}>
          <ResultsContent username={username} />
        </Suspense>
      </div>
    );
  }

async function ResultsContent({ username }: { username: string }) {
  // Fetch data from the API
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/check?username=${username}`;
  const res = await fetch(apiUrl);
  const data = await res.json();

  if (!data.results) {
    return <p>No results found for @{username}.</p>;
  }
  const extractedUserData = extractUserProfile(data);

  console.log(extractedUserData, "data33");
  
  // Extract platforms from the API response
  console.log(data, "data");
  const platforms = Object.entries(data.results)
    .map(([name, platform]: [string, any]) => ({
      name,
      exists: platform.exists,
      url: websiteRedirectUrl[name] || "#", // Fallback if no URL is provided
    }))
    .sort((a, b) => Number(b.exists) - Number(a.exists));

  const totalPlatformsUserAvailable = platforms.filter(
    (item) => item.exists
  ).length;

  return (
    <main className={`min-h-screen ${spaceMono.className}`}>
      <HeroHighlight className="p-5 md:p-20">
        <div className="text-2xl md:text-5xl font-bold text-center my-5">
          Profile Availability
          <div className="mt-6">
            <Highlight className="text-black dark:text-white">
              Across Platforms.
            </Highlight>
          </div>
        </div>
        <p className="text-center text-gray-400 mb-12 text-lg">
          We scanned multiple platforms to check the availability of your
          profile. Here's what we found:
        </p>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Profile {...extractedUserData} />
            <div className="mt-3">
              <PieChartComponent totalCount={totalPlatformsUserAvailable} />
            </div>
          </div>
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platforms.map((platform) => (
                <PlatformCard
                  key={platform.name}
                  {...platform}
                  username={username}
                />
              ))}
            </div>
          </div>
        </div>
      </HeroHighlight>
    </main>
  );
}
