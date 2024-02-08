import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSLice = createApi({
  baseQuery,
  tagTypes: ["User", "Client", "Bill"],
  endpoints: (builder) => ({}),
});