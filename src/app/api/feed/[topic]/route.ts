import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;

  if (!topic || topic.length < 2) {
    return NextResponse.json({ error: "Invalid topic" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://www.reddit.com/by_id/t3_${topic}.json`);
    if (!res.ok) throw new Error(`Reddit API error ${res.status}`);
    const data = await res.json();

    if (!data.data.children.length) {
      return NextResponse.json({ error: "No posts found" }, { status: 404 });
    }

    const firstPost = data.data.children[0].data;
    const post = {
      id: firstPost.id,
      title: firstPost.title,
      selftext: firstPost.selftext,
      score: firstPost.score,
      author: firstPost.author,
      url: `https://reddit.com${firstPost.permalink}`,
      created_at: new Date(firstPost.created_utc * 1000).toISOString(),
      num_comments: firstPost.num_comments,
      thumbnail: firstPost.thumbnail,
    };

    return NextResponse.json(post);
  } catch (err: any) {
    console.error("Reddit API error:", err.message || err);
    return NextResponse.json({ error: "Error fetching Reddit post" }, { status: 500 });
  }
}