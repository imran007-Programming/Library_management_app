import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Book } from "./Allbook";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBorrowBookMutation, useGetBooksQuery, useGetBorrowBookInfoQuery } from "@/redux/api/baseApi";
import { toast } from "react-toastify";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router";
// Zod schema
const borrowBookSchema = z.object({
  quantity: z.coerce
    .number()
    .min(1, { message: "Quantity must be at least 1" }),
  dueDate: z.string().min(1, { message: "Due date is required" }),
});

type BorrowBook = z.infer<typeof borrowBookSchema>;

export default function BookBorrow({
  bookData,
  closeDialog,
}: {
  bookData: Book;
  closeDialog: () => void;
}) {
  const navigate= useNavigate()
  const [borrowBook] = useBorrowBookMutation();
  const { refetch } = useGetBooksQuery(undefined);
   const { refetch:newrefecth } = useGetBorrowBookInfoQuery(undefined);
  const form = useForm<BorrowBook>({
    resolver: zodResolver(borrowBookSchema),
    defaultValues: {
      quantity: 1,
      dueDate: "",
    },
  });

  const onSubmit: SubmitHandler<BorrowBook> = async (formData) => {
  // Check quantity against available copies first
  if (formData.quantity > bookData.copies) {
    toast.error(
      `You cannot borrow ${formData.quantity} copies because only ${bookData.copies} copies are available.`
    );
    return;
  }

  try {
    const borrowData = {
      ...formData,
      book: bookData._id,
    };

    await borrowBook(borrowData).unwrap();
    toast.success("Book borrowed successfully");
    closeDialog();
    form.reset();
    refetch();
    newrefecth();
    navigate("/borrow_book");
  } catch (error: unknown) {
    const err = error as { data?: { message?: string } };
    toast.error(err.data?.message ?? "Something went wrong");
  }
};

  return (
    <>
      <DialogHeader>
        <DialogTitle>Borrow Book</DialogTitle>
        <DialogDescription>Specify quantity and due date.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          {/* Quantity */}
          {bookData.copies > 0 ? (
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      // min={1}
                      // max={bookData.copies}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <p className="text-xl text-red-500">Stock Out</p>
          )}

          {/* Due Date */}

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        field.onChange(date?.toISOString() ?? "");
                      }}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Pick a date for Borrow Record
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button */}
          {bookData && bookData.copies > 0 ? (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Confirm Borrow
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="bg-red-600 text-white px-4 py-2 rounded opacity-70 cursor-not-allowed"
            >
              Stock Out
            </button>
          )}
        </form>
      </Form>
    </>
  );
}
