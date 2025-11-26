import { Subject } from "@/app/api/subjects/types";

export async function fetchSubjects() : Promise<Subject[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/subjects`, { next: { revalidate: 300 } });
        if (!res.ok) {
        throw new Error("API error");
    }
    return res.json();
}
