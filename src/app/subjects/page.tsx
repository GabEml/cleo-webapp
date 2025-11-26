import { fetchSubjects } from "@/lib/api/sujects";
import SubjectsPageClient from "./SubjectsPageClient";

export default async function SubjectsPage() {
    let subjects;
    try {
        subjects = await fetchSubjects();
    } catch {
        throw new Error("Error loading subject");
    }

    return <SubjectsPageClient subjects={subjects} />;
}
