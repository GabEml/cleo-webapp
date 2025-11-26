"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type TrendPoint = {
  date: string;
  value: number;
};

type GoogleTrendsEmbedProps = {
  data: TrendPoint[];
  topic: string;
};

export default function GoogleTrendsEmbed({ data, topic }: GoogleTrendsEmbedProps) {
  if (!data || data.length === 0) return <p>Aucune donnée trends</p>;
  return (
    <Card className="w-full h-[300px]">
      <CardHeader>
        <CardTitle>Tendances (7 jours) : {topic}</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}