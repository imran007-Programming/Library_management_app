import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowBookInfoQuery } from "@/redux/api/baseApi";
type BorrowBook = {
  totalQuantity: number;
  isbn: string;
  title: string;
};

export default function BorrowbookSummary() {
  const { data } = useGetBorrowBookInfoQuery(undefined);

 
  const borrowBookInfo: BorrowBook[] = data?.data?.map(
    ({
      totalQuantity,
      book,
    }: {
      totalQuantity: number;
      book: { isbn: string; title: string };
    }) => ({
      totalQuantity,
      isbn: book.isbn,
      title: book.title
    })
  );



  return (
    <div className="">
      <div className="w-full p-4">
        <div className="flex justify-end items-center my-2"></div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book Title</TableHead>

              <TableHead>ISBN</TableHead>
              <TableHead> Total Quantity </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {borrowBookInfo?.map((book) =>  
              <TableRow key={book.isbn}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.isbn}</TableCell>

                <TableCell className="text-green-500">
                  {book.totalQuantity}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
