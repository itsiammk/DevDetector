// app/results/page.tsx
import PlatformCard from "@/components/ui/PlatformCard";
import Profile from "@/components/ui/Profile";
import { Suspense } from "react";
import { Space_Mono } from "next/font/google";
import Loading from "@/components/ui/loading";
import { Label, Pie, PieChart } from "recharts";
import { PieChartComponent } from "@/components/chart/chartPie";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import extractUserProfile from "@/lib/extractUserProfile";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

const user = {
  name: "Alex Quantum",
  username: "quantumalex",
  address: "123 Cyber Street, Neo Tokyo",
  email: "alex@quantum.future",
  phone: "+1 (234) 567-8901",
};

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { username: string };
}) {
  const username = searchParams.username;
  if (!username) {
    return <p>No username provided.</p>;
  }
  return (
    <div>
      {/* <h1>Results for @{username}</h1> */}
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

  console.log(data, "data");
  console.log(extractedUserData, "data33");

  // Extract platforms from the API response
  const platforms = Object.entries(data.results)
    .map(([name, platform]: [string, any]) => ({
      name,
      exists: platform.exists,
      url: platform.url || "#", // Fallback if no URL is provided
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
                  username={user.username}
                />
              ))}
            </div>
          </div>
        </div>
      </HeroHighlight>
    </main>
  );
}
