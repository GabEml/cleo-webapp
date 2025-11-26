import { NextResponse } from "next/server";
//@ts-ignore
import googleTrends from "google-trends-api";

export async function GET(req: Request, { params }: { params: Promise<{ topic: string }> }) {
    const { topic } = await params;

    if (!topic || topic.length < 3) {
        return NextResponse.json({ error: "Keyword too short" }, { status: 400 });
    }

    try {
        const results = await googleTrends.interestOverTime({
            keyword: extractTrendKeyword(topic),
            time: 'now 7-d',
        });
        const json = JSON.parse(results);

        // Transform data pour ton composant
        const trendData = json.default.timelineData.map((point: any) => ({
            date: point.formattedTime,
            value: point.value[0],
        }));

        return NextResponse.json(trendData);
    } catch (err: any) {
        console.error("fetchGoogleTrends error:", err.message || err);
        return NextResponse.json({ error: "Error fetching trends" }, { status: 500 });
    }
}


function extractTrendKeyword(title: string, maxWords = 4): string {
    if (!title) return "";

    // 1. Retire les préfixes type "MEGATHREAD:", "Discussion:", etc.
    const cleanedPrefix = title.replace(/^(MEGATHREAD:|Discussion:)\s*/i, "");

    // 2. Supprime la ponctuation inutile
    const cleanedPunctuation = cleanedPrefix.replace(/[^\w\s]/g, "");

    // 3. Sépare les mots et filtre les mots vides courants
    const stopWords = ["about", "new", "images", "of", "the", "and", "for", "on", "in"];
    const words = cleanedPunctuation
        .split(/\s+/)
        .filter(word => word.length > 1 && !stopWords.includes(word.toLowerCase()));

    // 4. Garde les premiers mots
    const keyword = words.slice(0, maxWords).join(" ");

    return keyword;
}

// Exemple d'utilisation
const title = "MEGATHREAD: NASA Press Conference About New Images Of Interstellar Comet 3I/ATLAS";
const trendKeyword = extractTrendKeyword(title, 3);
