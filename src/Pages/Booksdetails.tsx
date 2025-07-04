import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useGetbookdetailsbyidQuery } from "@/redux/api/baseApi";

export function Booksdetails({ bookId }: { bookId: string }) {
  const { data, isLoading, isError } = useGetbookdetailsbyidQuery(bookId);
  const book = data?.data;
  return (
    <>
      <DialogHeader>
        <DialogTitle>Book Details</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      {isLoading && <div className="p-4">Loading...</div>}
      {isError && <div className="p-4 text-red-500">Error loading book.</div>}

      {book && (
        <div className="space-y-2 p-2">
          <div>
            <strong>Title:</strong> {book.title}
          </div>
          <div>
            <strong>Author:</strong> {book.author}
          </div>
          <div>
            <strong>Genre:</strong> {book.genre}
          </div>
          <div>
            <strong>ISBN:</strong> {book.isbn}
          </div>
          <div>
            <strong>Copies:</strong> {book.copies}
          </div>
          <div>
            <strong>Availability:</strong>{" "}
            <span
              className={book.available ? "text-green-600" : "text-red-600"}
            >
              {book.available ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
