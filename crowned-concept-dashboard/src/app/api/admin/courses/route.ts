import { db } from "../../../../../lib/prisma";
import { auth } from "../../../../../auth";
import { NextResponse } from "next/server";

// 1. CREATE COURSE
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { title, description, price, thumbnail_url } = body;

    // Create a simple slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    const newCourse = await db.courses.create({
      data: {
        title,
        slug,
        description,
        price: parseFloat(price),
        thumbnail_url,
        is_published: true,
        author_id: parseInt(session.user.id), // Link to the admin creating it
      },
    });

    return NextResponse.json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// 2. UPDATE COURSE
export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { id, title, description, price, thumbnail_url } = body;

    const updatedCourse = await db.courses.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        price: parseFloat(price),
        thumbnail_url,
      },
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// 3. DELETE COURSE
export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return new NextResponse("ID required", { status: 400 });

    await db.courses.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting course:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}