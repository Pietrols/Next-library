import { prisma } from "@/lib/db";
import { deleteBook, toggleAvailability } from "./actions";
import BookForm from "@/components/BookForm";
import { Book } from "@prisma/client";

export default async function Home() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Library Manager</h1>

      <BookForm />

      <div className="mt-8 space-y-4">
        {books.map((book: Book) => (
          <div
            key={book.id}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">by {book.author}</p>
              <span
                className={`text-sm font-medium ${book.available ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {book.available ? "Available" : "Checked Out"}
              </span>
            </div>

            <div className="flex gap-2">
              <form action={toggleAvailability.bind(null, book.id, book.available)}>
                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                  {book.available ? "Check Out" : "Return"}
                </button>
              </form>

              <form action={deleteBook.bind(null, book.id)}>
                <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}

        {books.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">No books in library.</p>
        )}
      </div>
    </main>
  );
}
