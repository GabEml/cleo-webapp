"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Error() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Error...</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="min-h-screen p-6">
                    <h1 className="text-2xl font-bold mb-6">Sujets réglementaires</h1>
                    <div className="text-red-500">Erreur chargement sujets</div>
                </div>
            </CardContent>
        </Card>

    );
}