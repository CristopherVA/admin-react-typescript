import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  UserInterface,
  Pagination,
  DataUser,
  Mutation,
  GetOneUser,
  UpdateDataForm,
} from "../interfaces/index";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (bulder) => ({
    getUser: bulder.query<UserInterface, Pagination>({
      query: ({ to, from }) => `/api/user?to=${to}&from=${from}`,
    }),
    getOneUser: bulder.query<GetOneUser, number>({
      query: (id) => `/api/user/${id}`,
      keepUnusedDataFor: 0
    }),
    addUser: bulder.mutation<Mutation, DataUser>({
      query: (data) => ({
        url: "/api/user/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),      
    }),
    updateUser: bulder.mutation<Mutation, UpdateDataForm>({
      query: ({ id, data }) => ({
        url: `/api/user/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
    deleteUser: bulder.mutation<Mutation, number>({
      query: (id) => ({
        url: `/api/user/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetOneUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
