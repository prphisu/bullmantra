import { db } from "../../../../../lib/prisma";
import { auth } from "../../../../../auth";
import { NextResponse } from "next/server";

// 1. CREATE
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { author_name, author_role, author_image, rating, comment } = body;

    const newItem = await db.testimonials.create({
      data: {
        author_name,
        author_role,
        author_image,
        rating: parseInt(rating),
        comment,
        is_approved: true, // Admin created ones are auto-approved
      },
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error creating testimonial", { status: 500 });
  }
}

// 2. UPDATE
export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { id, author_name, author_role, author_image, rating, comment, is_approved } = body;

    const updated = await db.testimonials.update({
      where: { id: parseInt(id) },
      data: {
        author_name,
        author_role,
        author_image,
        rating: parseInt(rating),
        comment,
        is_approved,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return new NextResponse("Error updating testimonial", { status: 500 });
  }
}

// 3. DELETE
export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await db.testimonials.delete({ where: { id: parseInt(id!) } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return new NextResponse("Error deleting testimonial", { status: 500 });
  }
}