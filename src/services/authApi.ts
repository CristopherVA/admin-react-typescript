import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Auth } from "../interfaces";
;

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-admin-v1.herokuapp.com/",
  }),
  tagTypes: ["auth"],
  endpoints: (bulder) => ({
    login: bulder.mutation<Object, Auth>({
      query: (data) => ({
        url: "/api/auth",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
