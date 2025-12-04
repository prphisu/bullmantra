import { db } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const testimonials = await db.testimonials.findMany({
      where: { is_approved: true },
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}