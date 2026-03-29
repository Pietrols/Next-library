import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Handles GET /api/books
export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// Handles POST /api/books
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const book = await prisma.book.create({
      data: {
        title: body.title,
        author: body.author,
      },
    });
    return NextResponse.json(book, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
