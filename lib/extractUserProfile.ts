// Define the structure of the API response
interface ApiResponse {
  results: {
    [platform: string]: {
      exists: boolean;
      url: string;
      responseBody: any; // Replace `any` with a more specific type if possible
    };
  };
}

// Define the structure of the user profile object
interface UserProfile {
  name: string | null;
  country: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  profilePhoto: string | null;
  profilePhotos: any | null;
  githubUsername: string | null;
  stackoverflowReputation: number | null;
  codeforcesRating: number | null;
  hackerrankLevel: number | null;
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

/**
 * Extracts user profile details from a multi-platform API response.
 * @param {ApiResponse} apiResponse - The API response containing user data from various platforms.
 * @returns {UserProfile} A unified user profile object with extracted details.
 */
function extractUserProfile(apiResponse: ApiResponse): UserProfile {
  const userDetails: UserProfile = {
    name: null,
    country: null,
    email: null,
    phone: null,
    address: null,
    profilePhoto: null, // Main profile image
    profilePhotos: [], // Store multiple images
    githubUsername: null,
    stackoverflowReputation: null,
    codeforcesRating: null,
    hackerrankLevel: null,
    leetcodeSolvedProblems: { easy: 0, medium: 0, hard: 0 },
    codechefRating: null,
    linkedinUrl: null,
    twitterUsername: null,
    websiteUrl: null,
  };

  // Helper function to safely extract nested values
  const getNestedValue = (
    obj: any,
    path: string,
    defaultValue: any = null
  ): any => {
    return (
      path.split(".").reduce((acc, key) => acc?.[key], obj) || defaultValue
    );
  };

  // Iterate through each platform in the API response
  for (const [platform, data] of Object.entries(apiResponse.results)) {
    if (data.exists) {
      switch (platform) {
        case "medium":
          const mediumUser = getNestedValue(data, "responseBody.feed");
          if (mediumUser) {
            userDetails.name =
              getNestedValue(mediumUser, "author") || userDetails.name;
            userDetails.profilePhoto =
              getNestedValue(mediumUser, "image") || userDetails.profilePhoto
          }
          break;
        case "devto":
          const devtoUser = getNestedValue(data, "responseBody");
          if (devtoUser) {
            userDetails.name =
              getNestedValue(devtoUser, "name") || userDetails.name;
            userDetails.twitterUsername =
              userDetails.twitterUsername ||
              getNestedValue(devtoUser, "twitter_username");
            userDetails.githubUsername =
              userDetails.githubUsername ||
              getNestedValue(devtoUser, "github_username");
            userDetails.profilePhoto = getNestedValue(devtoUser, "profile_image") || userDetails.profilePhoto;
          }
          break;

        case "codechef":
          const ccUser = getNestedValue(data, "responseBody");
          if (ccUser.success) {
            userDetails.name =
              getNestedValue(ccUser, "name") || userDetails.name;
            userDetails.country =
              userDetails.country || getNestedValue(ccUser, "countryName");
            userDetails.profilePhoto =
              getNestedValue(ccUser, "profile") || userDetails.profilePhoto;
            userDetails.codechefRating = getNestedValue(
              ccUser,
              "currentRating"
            ); // Extract currentRating
          }
          break;

        case "stackoverflow":
          const stackUser = getNestedValue(data, "responseBody.items[0]");
          if (stackUser) {
            userDetails.name =
              getNestedValue(stackUser, "display_name") || userDetails.name;
            userDetails.country =
              userDetails.country || getNestedValue(stackUser, "location");
            userDetails.websiteUrl =
              userDetails.websiteUrl ||
              getNestedValue(stackUser, "website_url");
            userDetails.stackoverflowReputation = getNestedValue(
              stackUser,
              "reputation"
            );
            userDetails.profilePhoto = getNestedValue(stackUser, "profile_image") || userDetails.profilePhoto;
          }
          break;

        case "leetcode":
          const lcUser = getNestedValue(
            data,
            "responseBody.data.matchedUser.submitStats.acSubmissionNum"
          );
          if (lcUser) {
            userDetails.leetcodeSolvedProblems.easy = getNestedValue(
              lcUser.find((item: any) => item.difficulty === "Easy"),
              "count",
              0
            );
            userDetails.leetcodeSolvedProblems.medium = getNestedValue(
              lcUser.find((item: any) => item.difficulty === "Medium"),
              "count",
              0
            );
            userDetails.leetcodeSolvedProblems.hard = getNestedValue(
              lcUser.find((item: any) => item.difficulty === "Hard"),
              "count",
              0
            );
          }
          break;

        case "codeforces":
          const cfUser = getNestedValue(data, "responseBody.result");
          if (Array.isArray(cfUser) && cfUser.length > 0) {
            const user = cfUser[0]; // Safely access the first element
            userDetails.name =
              getNestedValue(user, "handle") || userDetails.name;
            userDetails.country =
              userDetails.country || getNestedValue(user, "country"); // If available
            userDetails.profilePhoto = getNestedValue(user, "avatar") || userDetails.profilePhoto;
            userDetails.codeforcesRating = getNestedValue(user, "rating"); // Extract Codeforces rating
          }
          break;

        case "hackerrank":
          const hrUser = getNestedValue(data, "responseBody.model");
          if (hrUser) {
            userDetails.name =
              getNestedValue(hrUser, "name") || userDetails.name;
            userDetails.country =
              userDetails.country || getNestedValue(hrUser, "country");
            userDetails.linkedinUrl =
              userDetails.linkedinUrl || getNestedValue(hrUser, "linkedin_url");
            userDetails.websiteUrl =
              userDetails.websiteUrl || getNestedValue(hrUser, "website");
            userDetails.hackerrankLevel = getNestedValue(hrUser, "level");
            userDetails.profilePhoto = getNestedValue(hrUser, "avatar") || userDetails.profilePhoto;
          }
          break;

        case "github":
          userDetails.name =
            getNestedValue(data, "responseBody.name") || userDetails.name;
          userDetails.email =
            userDetails.email || getNestedValue(data, "responseBody.email");
          userDetails.profilePhoto = getNestedValue(data, "responseBody.avatar_url") || userDetails.profilePhoto;
          userDetails.githubUsername =
            userDetails.githubUsername ||
            getNestedValue(data, "responseBody.login");
          break;

        default:
          // No action for unsupported platforms
          break;
      }
    }
  }

  for (const [platform, data] of Object.entries(apiResponse.results)) {
    if (data.exists) {
      let imageUrl: string | null = null;

      switch (platform) {
        case "github":
          imageUrl = getNestedValue(data, "responseBody.avatar_url");
          break;

        case "linkedin":
          imageUrl = getNestedValue(data, "responseBody.profile_image");
          break;

        case "stackoverflow":
          imageUrl = getNestedValue(data, "responseBody.items[0].profile_image");
          break;

        case "leetcode":
          imageUrl = getNestedValue(data, "responseBody.data.matchedUser.profile.image");
          break;

        case "codeforces":
          imageUrl = getNestedValue(data, "responseBody.result[0].avatar");
          break;

        case "codechef":
          imageUrl = getNestedValue(data, "responseBody.profile");
          break;

        case "hackerrank":
          imageUrl = getNestedValue(data, "responseBody.model.avatar");
          break;

        case "devto":
          imageUrl = getNestedValue(data, "responseBody.profile_image");
          break;

        case "medium":
          imageUrl = getNestedValue(data, "responseBody.feed.image");
          break;

        default:
          break;
      }

      // If an image is found, add it to the profilePhotos array
      if (imageUrl) {
        userDetails.profilePhotos.push(imageUrl);
      }
    }
  }

  // Prioritize the first available image as the main profile picture
  userDetails.profilePhoto = userDetails.profilePhotos.length > 0 ? userDetails.profilePhotos[0] : null;


  return userDetails;
}

export default extractUserProfile;
