export const platformConfigs = {
    github: {
      url: 'https://api.github.com/users/{username}',
      check: async (res) => res.status === 200,
    },
    leetcode: {
      url: 'https://leetcode.com/{username}',
      check: async (res) => res.status === 200,
    },
    codeforces: {
      url: 'https://codeforces.com/api/user.info?handles={username}',
      check: async (res) => (await res.json()).status === 'OK',
    },
    hackerrank: {
      url: 'https://www.hackerrank.com/rest/contests/master/hackers/{username}/profile',
      check: async (res) => res.status === 200,
    },
    stackoverflow: {
      url: 'https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&inname={username}&site=stackoverflow',
      check: async (res) => (await res.json()).items.length > 0,
    },
    devto: {
      url: 'https://dev.to/api/users/by_username?url={username}',
      check: async (res) => res.status === 200,
    },
    kaggle: {
      url: 'https://www.kaggle.com/{username}',
      check: async (res) => res.status === 200,
    },
    codewars: {
      url: 'https://www.codewars.com/api/v1/users/{username}',
      check: async (res) => res.status === 200,
    },
    codechef: {
      url: 'https://www.codechef.com/users/{username}',
      check: async (res) => !(await res.text()).includes('username does not exist'),
    },
    exercism: {
      url: 'https://exercism.org/profiles/{username}',
      check: async (res) => res.status === 200,
    },
  };