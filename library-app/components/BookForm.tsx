"use client"; // <--- Marks this as a Client Component

import { createBook } from "@/app/actions";
import { useRef } from "react";

export default function BookForm() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await createBook(formData);
        ref.current?.reset(); // Reset form after server action completes
      }}
      className="bg-gray-100 p-4 rounded mb-6"
    >
      <h3 className="text-lg font-medium mb-2">Add New Book</h3>
      <div className="flex gap-2">
        <input
          name="title"
          required
          placeholder="Title"
          className="border p-2 rounded flex-1"
        />
        <input
          name="author"
          required
          placeholder="Author"
          className="border p-2 rounded flex-1"
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
    </form>
  );
}
