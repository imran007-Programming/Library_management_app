import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import type { Book } from "./Allbook";
import { useEditBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { toast } from "react-toastify";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().min(1, "Genre is required"),
  isbn: z.string().min(1, "ISBN is required"),
  copies: z.number(),
  description: z.string().optional(),
});

type BookFormData = z.infer<typeof bookSchema>;

export function BookEdit({ bookdata,closeDialog }: { bookdata: Book , closeDialog: () => void;}) {
  const [editbook] = useEditBookMutation();
  const { refetch } = useGetBooksQuery(undefined);
  const form = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: bookdata.title,
      author: bookdata.author,
      genre: bookdata.genre,
      isbn: bookdata.isbn,
      copies: bookdata.copies,
      description: bookdata.description,
    },
  });

  const onSubmit = async (values: BookFormData) => {
    try {
      console.log("Updated book:", values);
       await editbook({
        bookId: bookdata._id,
        data: values,
      }).unwrap();
      toast.success(`Book successfully updated`)
      refetch();
      closeDialog()
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogDescription>Update the details below.</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 mt-4"
        >
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Book title" />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Author" />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Genre */}
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Genre" />
                </FormControl>
              </FormItem>
            )}
          />

          {/* ISBN */}
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ISBN" />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Copies */}
          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="Number of copies"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Description" />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-blue-500 text-white mt-2">
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
}
