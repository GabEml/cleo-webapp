import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Subject } from '@/app/api/subjects/types'

type Props = {
    subject: Subject
}

export default function SubjectCard({ subject }: Props) {
    const score = Math.min(100, Math.round((subject.tweetCount / 200) * 100))

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <Card>
                <CardHeader>
                    <CardTitle>{subject.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-500">{subject.redditCount} reddit</div>
                        <div className="text-sm text-slate-500">{subject.gdeltCount} gdelt</div>

                        <div className="text-xs text-slate-500">Popularité : {subject.popularityScore}</div>
                    </div>

                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${score}%`,
                                background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
                            }}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* CARDS PAR SOURCE */}
            <SourceCard title="Reddit" items={subject.reddit} />
            <SourceCard title="Mastodon" items={subject.mastodon} />
            <SourceCard title="News" items={subject.news} />
            <SourceCard title="GDELT" items={subject.gdelt} />
        </div>
    )
}

function SourceCard({
    title,
    items,
}: {
    title: string;
    items: any[];
}) {
    if (!items || items.length === 0) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>
                <ul className="space-y-3">
                    {items.map((item, i) => {
                        const link = encodeURIComponent(item.id) || "#";

                        return (
                            <li key={i}>
                                <Link href={`/feed/${link}`} target="_blank" className="block">
                                    <div className="p-3 border rounded bg-muted/40 hover:shadow-md transition cursor-pointer">
                                        <div className="font-medium">
                                            {item.title || item.text || item.summary || "Sans titre"}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </CardContent>
        </Card>
    );
}