import type { Book } from "@/Pages/Allbook";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: 
    "https://library-management-api-five-lyart.vercel.app/api",
      // "http://localhost:4000/api",
  
  }),
   tagTypes: ["Books", "BorrowBook"],
  endpoints: (builder) => ({
    /* Get All Books */
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    /* Get a specefic book by Its ID */
    getbookdetailsbyid: builder.query({
      query: (bookId) => `/books/${bookId}`,
    }),
    /* Add a book */
    addBook: builder.mutation({
      query: (bookData) => ({
        url: `/books`,
        method: "POST",
        body: bookData,
      }),
    }),
    /* Delete a book */
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
    }),

    /* Edit a book details */
    editBook: builder.mutation<Book,{bookId:string;data:Partial<Book>}>({
      query:({bookId, data}) => ({
        url: `/books/${bookId}`,
        method: "PUT",
        body:data
      }),
    }),
    /* Borrow a book */
    borrowBook:builder.mutation({
      query:(data)=>({
        
       url:"/borrow",
       method:"POST",
       body:data
      }),
      invalidatesTags: ["Books", "BorrowBook"],
  
    }),
    /* borrow book summary aggrigation  */
    getBorrowBookInfo:builder.query({
       query: () => "/borrow",
       providesTags: ["BorrowBook"],
    })
  }),
});

export const {
  useGetBooksQuery,
  useGetbookdetailsbyidQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
  useBorrowBookMutation,
  useGetBorrowBookInfoQuery
} = baseApi;
