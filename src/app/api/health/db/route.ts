import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongoose";

export async function GET() {
  try {
    await connectToDatabase();

    return NextResponse.json({
      ok: true,
      message: "MongoDB connected",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to connect to MongoDB";

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      { status: 500 },
    );
  }
}
