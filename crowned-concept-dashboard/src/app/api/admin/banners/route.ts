import { db } from "../../../../../lib/prisma";
import { auth } from "../../../../../auth";
import { NextResponse } from "next/server";

// 1. CREATE A NEW BANNER
export async function POST(req: Request) {
  try {
    const session = await auth();
    // Protect this route
    if (session?.user?.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, image_url, link_url } = body;

    if (!title || !image_url) {
      return new NextResponse("Title and Image URL are required", { status: 400 });
    }

    const newBanner = await db.banners.create({
      data: {
        title,
        image_url,
        link_url,
        is_active: true,
      },
    });

    return NextResponse.json(newBanner);
  } catch (error) {
    console.error("Error creating banner:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// 2. DELETE A BANNER
export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("ID required", { status: 400 });
    }

    await db.banners.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting banner:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}