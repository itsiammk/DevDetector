// Import necessary modules
import { NextRequest, NextResponse } from 'next/server';

// Define dynamic rendering behavior
export const dynamic = "force-dynamic";

// Type definitions for platform configurations
interface PlatformConfig {
  url: string; // The API endpoint URL
  method?: 'GET' | 'POST'; // HTTP method (default is GET)
  headers?: Record<string, string>; // Custom headers (optional)
  body?: (username: string) => string; // Function to generate the request body (optional)
  check: (data: any) => boolean | Promise<boolean>; // Allow synchronous or asynchronous checks
  useRawResponse?: boolean; // Flag to indicate if the raw Response object should be used
}

// Platform-specific configurations
const platformConfigs: Record<string, PlatformConfig> = {
  github: {
    url: 'https://api.github.com/users/{username}',
    method: 'GET',
    check: (data: any) => !!data?.login, // Check if the user exists by verifying the `login` field
  },
  gitlab: {
    url: 'https://gitlab.com/api/v4/users?username={username}',
    method: 'GET',
    check: (data: any) => Array.isArray(data) && data.length > 0, // Check if the array has results
  },
  leetcode: {
    url: 'https://leetcode.com/graphql',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: 'csrftoken=BjvDASVjQlaPJOiPCjdTPx2SO1VKls5xABKItmjPQ7XH7f0kHIUcCvNwrzPwB3sQ',
    },
    body: (username: string) => JSON.stringify({
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            submitStats: submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
        }
      `,
      variables: { username },
    }),
    check: (data: any) => !!data?.data?.matchedUser, // Check if `matchedUser` exists
  },
  codeforces: {
    url: 'https://codeforces.com/api/user.info?handles={username}',
    method: 'GET',
    check: (data: any) => data?.status === 'OK', // Check if the status is "OK"
  },
  hackerrank: {
    url: 'https://www.hackerrank.com/rest/contests/master/hackers/{username}/profile',
    method: 'GET',
    check: (data: any) => !!data?.model?.username, // Check if the username exists in the response
  },
  codewars: {
    url: 'https://www.codewars.com/api/v1/users/{username}',
    method: 'GET',
    check: (data: any) => !!data?.username, // Check if the username exists in the response
  },
  codechef: {
    url: 'https://codechef-api.vercel.app/{username}',
    method: 'GET',
    check: (data: any) => data?.success === true && !!data?.name, // Check if `success` is true and `name` exists
  },
  topcoder: {
    url: 'https://api.topcoder.com/v5/members/{username}',
    method: 'GET',
    check: (data: any) => !!data?.handle, // Check if the handle exists in the response
  },
  exercism: {
    url: 'https://exercism.org/profiles/{username}',
    method: 'GET',
    check: (data: any) => data?.status === 'OK', // Check if the username exists in the response
  },
  stackoverflow: {
    url: 'https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&inname={username}&site=stackoverflow',
    method: 'GET',
    check: (data: any) => Array.isArray(data?.items) && data.items.length > 0, // Check if `items` array is non-empty
  },
  devto: {
    url: 'https://dev.to/api/users/by_username?url={username}',
    method: 'GET',
    check: (data: any) => !!data?.username, // Check if the username exists in the response
  },
  medium: {
    url: 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@{username}',
    method: 'GET',
    check: (data: any) => data?.status === 'ok', // Check if the status is "ok"
  },
  kaggle: {
    url: 'https://www.kaggle.com/{username}',
    method: 'GET',
    useRawResponse: true, // Indicate that this platform requires the raw Response object
    check: async (res: Response) => res.ok, // Check if the status code is 200
  },
  geeksforgeeks: {
    url: 'https://geeks-for-geeks-api.vercel.app/{username}',
    method: 'GET',
    check: (data: any) => !data?.error && !!data?.info?.userName, // Check if there's no error and `userName` exists
  },
  
  npm: {
    url: 'https://registry.npmjs.org/-/v1/search?text=maintainer:{username}',
    method: 'GET',
    check: (data: any) => Array.isArray(data?.objects) && data.objects.length > 0, // Check if the objects array has results
  },
  pypi: {
    url: 'https://pypi.org/user/{username}/',
    method: 'GET',
    useRawResponse: true, // Indicate that this platform requires the raw Response object
    check: async (res: Response) => res.ok, // Check if the status code is 200
  },
  docker: {
    url: 'https://hub.docker.com/v2/users/{username}',
    method: 'GET',
    check: (data: any) => !!data?.id, // Check if the user ID exists in the response
  },
  replit: {
    url: 'https://replit.com/@{username}',
    method: 'GET',
    useRawResponse: true, // Indicate that this platform requires the raw Response object
    check: async (res: Response) => res.ok, // Check if the status code is 200
  },
  hashnode: {
    url: 'https://hashnode.com/@{username}',
    method: 'GET',
    useRawResponse: true, // Indicate that this platform requires the raw Response object
    check: async (res: Response) => res.ok, // Check if the status code is 200
  },
  // codepen: {
  //   url: 'https://codepen.io/{username}',
  //   method: "GET",
  //   headers: { "User-Agent": "Mozilla/5.0" },
  //   check: (data: any) => data?.status === 200, // Check if the status code is 200
  // },
  jsfiddle: {
    url: 'https://jsfiddle.net/user/{username}',
    method: 'GET',
    check: (data: any) => !!data?.username, // Check if the username exists in the response
  },
};

// Function to check platform availability
async function checkPlatform(username: string, platform: string): Promise<{
  exists: boolean;
  url?: string;
  responseBody?: any; // Include the raw API response body
}> {
  const config = platformConfigs[platform];
  if (!config) return { exists: false };

  try {
    let url = config.url.replace('{username}', username); // Replace placeholder with username
    const options: RequestInit = {
      method: config.method || 'GET', // Default to GET if method is not specified
      headers: config.headers || {}, // Use custom headers if provided
    };

    // Add body if defined in the config
    if (config.body) {
      options.body = config.body(username);
    }

    const response = await fetch(url, options); // Make the API request

    if (!response.ok) return { exists: false }; // Return false if the response is not OK

    // Handle platforms that require the raw Response object
    
    if (config.useRawResponse) {
      const exists = await config.check(response); // Pass the raw response to the check function
      return {
        exists,
        url: response.url.split('?')[0], // Clean URL
        responseBody: null, // No response body for raw Response platforms
      };
    }
    
    // Parse the response body once
    let responseBody;
    try {
      responseBody = await response.json(); // Try parsing as JSON
    } catch {
      responseBody = await response.text(); // Fallback to text if JSON parsing fails
    }
    

    // Validate the response using the check function
    const exists = typeof config.check === 'function'
      ? await config.check(responseBody)
      : false;
    

    return {
      exists,
      url: platform === 'leetcode' ? `https://leetcode.com/${username}` : response.url.split('?')[0], // Clean URL
      responseBody, // Include the raw API response body
    };
  } catch (error) {
    console.error(`Error checking platform ${platform}:`, error); // Log errors
    return { exists: false };
  }
}

// Main API handler
export async function GET(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());
  const username = searchParams.username;

  if (!username) {
    return NextResponse.json({ error: 'Username required' }, { status: 400 });
  }

  const results: Record<
    string,
    { exists: boolean; url?: string; responseBody?: any }
  > = {};

  const platforms = Object.keys(platformConfigs);

  await Promise.allSettled(
    platforms.map(async (platform) => {
      results[platform] = await checkPlatform(username, platform);
    })
  );

  return NextResponse.json({ username, results });
}