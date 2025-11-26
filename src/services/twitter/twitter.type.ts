export interface TwitterApiTweet {
  id: string;
  text: string;
  created_at: string;
  author_id: string;
}

export interface TwitterApiResponse {
  data: TwitterApiTweet[];
}