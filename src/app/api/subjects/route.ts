import { NextResponse } from "next/server";
import { fetchSubjectsAggregation } from "@/services/subjects";

export async function GET() {
  try {
    const data = await fetchSubjectsAggregation();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
