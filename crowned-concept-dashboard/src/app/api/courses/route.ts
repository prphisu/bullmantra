import { db } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await db.courses.findMany({
      where: { is_published: true },
      orderBy: { created_at: 'desc' },
      include: {
        users: { // Fetch author name if needed (relationship name depends on schema)
          select: { name: true }
        }
      }
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}