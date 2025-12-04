import { db } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const banners = await db.banners.findMany({
      where: { is_active: true },
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(banners);
  } catch (error) {
    console.error("Failed to fetch banners:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}