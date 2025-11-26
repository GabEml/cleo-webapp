"use client"

import SubjectCard from '@/components/SubjectCard';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Subject } from "@/app/api/subjects/types";

export default function SubjectsPageClient({ subjects }: { subjects: Subject[] }) {
    const [search, setSearch] = useState("")
    
    const filtered = subjects.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-6">Sujets réglementaires</h1>
            <Input
                placeholder="Recherche..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-6"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((s) => (
                    <SubjectCard key={s.id} subject={s} />
                ))}
            </div>
        </div>
    );
}