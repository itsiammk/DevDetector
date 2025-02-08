import { NextRequest, NextResponse } from 'next/server';

// Define dynamic rendering behavior
export const dynamic = 'force-dynamic' as const;

// Type definitions for platform configurations
interface PlatformConfig {
  url: string;
  check: (res: Response) => Promise<boolean>;
}

const platformConfigs: Record<string, PlatformConfig> = {
  github: {
    url: 'https://api.github.com/users/{username}',
    check: async (res: Response) => res.status === 200,
  },
  gitlab: {
    url: 'https://gitlab.com/api/v4/users?username={username}',
    check: async (res: Response) => (await res.json()).length > 0,
  },
  bitbucket: {
    url: 'https://api.bitbucket.org/2.0/users/{username}',
    check: async (res: Response) => res.status === 200,
  },
  leetcode: {
    url: 'https://leetcode.com/{username}',
    check: async (res: Response) => res.status === 200,
  },
  codeforces: {
    url: 'https://codeforces.com/api/user.info?handles={username}',
    check: async (res: Response) => (await res.json()).status === 'OK',
  },
  hackerrank: {
    url: 'https://www.hackerrank.com/rest/contests/master/hackers/{username}/profile',
    check: async (res: Response) => res.status === 200,
  },
  codewars: {
    url: 'https://www.codewars.com/api/v1/users/{username}',
    check: async (res: Response) => res.status === 200,
  },
  codechef: {
    url: 'https://www.codechef.com/users/{username}',
    check: async (res: Response) => !(await res.text()).includes('username does not exist'),
  },
  topcoder: {
    url: 'https://api.topcoder.com/v5/members/{username}',
    check: async (res: Response) => res.status === 200,
  },
  exercism: {
    url: 'https://exercism.org/profiles/{username}',
    check: async (res: Response) => res.status === 200,
  },
  stackoverflow: {
    url: 'https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&inname={username}&site=stackoverflow',
    check: async (res: Response) => (await res.json()).items.length > 0,
  },
  devto: {
    url: 'https://dev.to/api/users/by_username?url={username}',
    check: async (res: Response) => res.status === 200,
  },
  hashnode: {
    url: 'https://hashnode.com/@{username}',
    check: async (res: Response) => res.status === 200,
  },
  medium: {
    url: 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@{username}',
    check: async (res: Response) => (await res.json()).status === 'ok',
  },
  kaggle: {
    url: 'https://www.kaggle.com/{username}',
    check: async (res: Response) => res.status === 200,
  },
  geeksforgeeks: {
    url: 'https://auth.geeksforgeeks.org/user/{username}',
    check: async (res: Response) => (await res.text()).includes('profile_name'),
  },
  npm: {
    url: 'https://registry.npmjs.org/-/v1/search?text=maintainer:{username}',
    check: async (res: Response) => (await res.json()).objects.length > 0,
  },
  pypi: {
    url: 'https://pypi.org/user/{username}/',
    check: async (res: Response) => res.status === 200,
  },
  docker: {
    url: 'https://hub.docker.com/v2/users/{username}',
    check: async (res: Response) => res.status === 200,
  },
  replit: {
    url: 'https://replit.com/@{username}',
    check: async (res: Response) => res.status === 200,
  },
  codepen: {
    url: 'https://codepen.io/{username}',
    check: async (res: Response) => res.status === 200,
  },
  jsfiddle: {
    url: 'https://jsfiddle.net/user/{username}',
    check: async (res: Response) => res.status === 200,
  },
};

// Function to check platform availability
async function checkPlatform(username: string, platform: string): Promise<{ exists: boolean; url?: string }> {
  const config = platformConfigs[platform];
  if (!config) return { exists: false };

  try {
    const url = config.url.replace('{username}', username);
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) return { exists: false };
    const exists = await config.check(response);

    return {
      exists,
      url: response.url.split('?')[0], // Clean URL
    };
  } catch (error) {
    console.error(`Error checking platform ${platform}:`, error);
    return { exists: false };
  }
}

// // Main API handler
// export async function GET(request: NextRequest): Promise<NextResponse> {
//   const { searchParams } = new URL(request.url);
//   const username = searchParams.get('username');

//   if (!username) {
//     return NextResponse.json({ error: 'Username required' }, { status: 400 });
//   }

//   const results: Record<string, { exists: boolean; url?: string }> = {};
//   const platforms = Object.keys(platformConfigs);

//   await Promise.allSettled(
//     platforms.map(async (platform) => {
//       results[platform] = await checkPlatform(username, platform);
//     })
//   );

//   return NextResponse.json({ username, results });
// }