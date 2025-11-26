export async function fetchGdeltEvents(query: string, count = 5) {
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(
    query
  )}&format=json`;

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return [];

  const text = await res.text();

  try {
    const data = JSON.parse(text);
    const articles = data.articles ?? [];

    return articles.slice(0, 5);
  } catch (e) {
    console.warn("GDELT returned non-JSON for query:", query, text.slice(0, 80));
    return [];
  }
}
