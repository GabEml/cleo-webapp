import { REGULATORY_TOPICS } from "@/lib/topics";
import { fetchRedditPosts } from "./reddit";
import { fetchGdeltEvents } from "./gdelt";

export async function fetchSubjectsAggregation() {
  try {
    // Lancer les fetchs en parallèle pour toutes les sources
    const [redditData, gdeltData] = await Promise.all([
      Promise.all(REGULATORY_TOPICS.map(t => fetchRedditPosts(t.query))),
      Promise.all(REGULATORY_TOPICS.map(t => fetchGdeltEvents(t.query))),
    ]);
    
    // Construire la liste finale des sujets
    const results = REGULATORY_TOPICS.map((topic, index) => {
      const reddit = redditData[index] || [];
      const gdelt = gdeltData[index] || [];

      return {
        id: topic.id,
        name: topic.name,
        query: topic.query,

        reddit,
        gdelt,

        redditCount: reddit.length,
        gdeltCount: gdelt.length,

        popularityScore:
          reddit.length * 0.4 +
          gdelt.length * 0.1,
      };
    });

    return results;
  } catch (err) {
    console.error("ERR subjects aggregation:", err)
    throw err
  }
}