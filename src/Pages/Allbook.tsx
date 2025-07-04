"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { Booksdetails } from "./Booksdetails";
import { useNavigate } from "react-router";
import { BookTableSkeleton } from "@/Utils/Books_table_skeleton";
import { toast } from "react-toastify";
import { BookEdit } from "./BookEdit";
import BookBorrow from "./BookBorrow";

export type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
  description?: string;
};

export function Allbook() {
  const [deleteBook] = useDeleteBookMutation();
  const { data, isLoading, refetch } = useGetBooksQuery(undefined);

  const books: Book[] = data?.data ?? [];
  const Navigate = useNavigate();
  //  Dialog state
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedBookForEdit, setSelectedBookForEdit] = useState<Book | null>(
    null
  );
  const [selectedBookForBorrow, setSelectedBookForBorrow] =
    useState<Book | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenForEdit, setIsDialogOpenForEdit] = useState(false);
  const [isDialogOpenForBorrow, setIsDialogOpenForBorrow] = useState(false);

  /* open dialouge for  book detais (Handeler) */
  const openDialogForShowBook = (bookId: string) => {
    setSelectedBookId(bookId);
    setIsDialogOpen(true);
  };

  /* open dialouge for edit book(handaler) */
  const openDialogForEditBook = (book: Book) => {
    setSelectedBookForEdit(book);
    setIsDialogOpenForEdit(true);
  };

  /* Borrow a book handaler */
  const handleBorrow = (book:Book) => {
    setSelectedBookForBorrow(book);
    setIsDialogOpenForBorrow(true)
  };

  /* delete a book handaler */
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteBook(id).unwrap();
        toast.success(`${res.message}`);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } catch (error: unknown) {
        const err=error as {data?:{message?:string}}
        toast.error(err.data?.message ?? "Something went wrong");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error",
      });
    }
  };

  if (isLoading) return <BookTableSkeleton />;

  return (
    <>
      <div className="w-full p-4">
        <div className="flex justify-end items-center my-2">
          <Button
            onClick={() => Navigate("/addbook")}
            className="bg-green-500 hover:bg-green-500"
          >
            Add a book +
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...books].reverse().map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                {book.available ? (
                  <TableCell className="text-green-500">Available</TableCell>
                ) : (
                  <TableCell className="text-red-500">Unavailable</TableCell>
                )}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => openDialogForShowBook(book._id)}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openDialogForEditBook(book)}
                        className="cursor-pointer"
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleDelete(book._id)}
                      >
                        Delete
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleBorrow(book)}
                      >
                        Borrow
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Dialog that fetches details */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            {selectedBookId && <Booksdetails bookId={selectedBookId} />}
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* dialouge for edit book details */}
        <Dialog
          open={isDialogOpenForEdit}
          onOpenChange={setIsDialogOpenForEdit}
        >
          <DialogContent>
            {selectedBookForEdit && (
              <BookEdit
                closeDialog={() => setIsDialogOpenForEdit(false)}
                bookdata={selectedBookForEdit}
              />
            )}
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Open a dialouge for borrow book */}
          <Dialog
          open={isDialogOpenForBorrow}
          onOpenChange={setIsDialogOpenForBorrow}
        >
          <DialogContent>
            {selectedBookForBorrow && (
              <BookBorrow
                closeDialog={() => setIsDialogOpenForBorrow(false)}
                bookData={selectedBookForBorrow}
              />
            )}
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
