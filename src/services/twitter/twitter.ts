
import { Tweet } from "@/types/tweet";

export async function fetchTweetsForQuery(
  query: string,
  count = 5
): Promise<Tweet[]> {
  // Pas de token = mock
  return Array.from({ length: count }).map((_, i) => ({
    id: `${query}-tweet-${i}`,
    text: `Mock tweet ${i + 1} about ${query}`,
    created_at: new Date(Date.now() - i * 3600 * 1000).toISOString(),
    author: `User ${i + 1}`,
    like_count: Math.floor(Math.random() * 100),
    retweet_count: Math.floor(Math.random() * 20),
    url: `https://x.com/user${i + 1}/status/${1000 + i}`,
  }));
}
