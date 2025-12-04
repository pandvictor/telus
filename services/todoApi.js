import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "todos?_limit=10",
      providesTags: (result) =>
        result
          ? [
              ...result.map((todo) => ({ type: "Todo", id: todo.id })),
              { type: "Todo", id: "LIST" },
            ]
          : [{ type: "Todo", id: "LIST" }],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Todo", id },
        { type: "Todo", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation } =
  todoApi;
