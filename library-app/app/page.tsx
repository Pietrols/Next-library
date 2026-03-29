import { prisma } from "@/lib/db";
import { deleteBook, toggleAvailability } from "./actions";
import BookForm from "@/components/BookForm";

// This is a Server Component (default)
export default async function Home() {
  // Direct DB access! No API fetch needed.
  const books = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Library Manager</h1>

      {/* Client Component for the Form */}
      <BookForm />

      <div className="mt-8 space-y-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>
              <span
                className={`text-sm ${book.available ? "text-green-600" : "text-red-600"}`}
              >
                {book.available ? "Available" : "Checked Out"}
              </span>
            </div>

            <div className="flex gap-2">
              {/* Server Action bound to button */}
              <form
                action={toggleAvailability.bind(null, book.id, book.available)}
              >
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                  {book.available ? "Check Out" : "Return"}
                </button>
              </form>

              <form action={deleteBook.bind(null, book.id)}>
                <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}

        {books.length === 0 && (
          <p className="text-gray-500">No books in library.</p>
        )}
      </div>
    </main>
  );
}
