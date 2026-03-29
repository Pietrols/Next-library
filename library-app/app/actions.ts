"use server"; // <--- This directive makes this file server-only

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Define types for our inputs
export type BookFormData = {
  title: string;
  author: string;
};

// CREATE
export async function createBook(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;

  await prisma.book.create({
    data: { title, author },
  });

  // Tell Next.js to refresh the data on the page
  revalidatePath("/");
}

// DELETE
export async function deleteBook(id: number) {
  await prisma.book.delete({
    where: { id },
  });
  revalidatePath("/");
}

// TOGGLE AVAILABILITY
export async function toggleAvailability(id: number, currentStatus: boolean) {
  await prisma.book.update({
    where: { id },
    data: { available: !currentStatus },
  });
  revalidatePath("/");
}
