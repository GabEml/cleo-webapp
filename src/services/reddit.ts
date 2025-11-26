export async function fetchRedditPosts(query: string, count = 5) {
  const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(
    query
  )}&sort=top&t=week&limit=${count}`;

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return [];

  const payload = await res.json();
  return payload.data.children.map((p: any) => (
    {
      id: p.data.id,
      title: p.data.title,
      score: p.data.score,
      author: p.data.author,
      url: `https://reddit.com${p.data.permalink}`,
      permalink: p.data.permalink,
      created_at: new Date(p.data.created_utc * 1000).toISOString(),
    }));

}

export async function fetchRedditPostDetails(id: string) {
  // Reddit JSON endpoint : juste ajouter ".json" à la fin
  const url = `https://www.reddit.com/by_id/t3_${id}.json`;

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return null;

  const payload = await res.json();
  const post = payload[0]?.data?.children[0]?.data;

  if (!post) return null;

  return {
    id: post.id,
    title: post.title,
    selftext: post.selftext, // contenu texte du post
    score: post.score,
    author: post.author,
    subreddit: post.subreddit,
    url: `https://reddit.com${post.permalink}`,
    created_at: new Date(post.created_utc * 1000).toISOString(),
    num_comments: post.num_comments,
    thumbnail: post.thumbnail,
  };
}