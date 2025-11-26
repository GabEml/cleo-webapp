"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import GoogleTrendsEmbed from "@/components/GoogleTrendsEmbed";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type RedditPost = {
  id: string;
  title: string;
  selftext: string;
  score: number;
  author: string;
  url: string;
  created_at: string;
  num_comments: number;
  thumbnail: string;
};

type TrendPoint = { date: string; value: number };

export default function TopicFeedPage() {
  const params = useParams();
  const topicParam = Array.isArray(params.topic) ? params.topic[0] : params.topic;
  const topic = topicParam ? decodeURIComponent(topicParam) : null;

  const [post, setPost] = useState<RedditPost | null>(null);
  const [trendData, setTrendData] = useState<TrendPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!topic) return;

    setLoading(true);

    fetch(`/api/feed/${topic}`)
      .then(res => res.json())
      .then((postData) => {
        setPost(postData);
        return fetch(`/api/trends/${encodeURIComponent(postData.title)}`);
      })
      .then(res => res.json())
      .then(setTrendData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [topic]);

  if (loading) return <p>Loading...</p>;

  if (!post) return <p>Post introuvable</p>;
  return (
    <div className="min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-bold">Détail sur le post</h1>

      {/* Google Trends Chart */}
      <div className="w-full h-[400px] md:h-[500px]">
        <GoogleTrendsEmbed data={trendData} topic={post.title || ""} />
      </div>

      {/* Reddit Post Card */}
      <Card className="mt-6">
        <CardHeader className="flex items-center space-x-4">
          {post.thumbnail && (
            <img
              src={post.thumbnail}
              alt={post.author}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <CardTitle className="text-sm font-semibold">
              {post.author} <span className="text-gray-500">@{post.author}</span>
            </CardTitle>
            <p className="text-xs text-gray-400">{post.created_at}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-2 text-sm text-gray-700">{post.selftext}</div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{post.num_comments} comments</span>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Voir sur Reddit →
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}