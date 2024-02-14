import { CLIENTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => ({
        url: `${CLIENTS_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAllClientsQuery } = clientApiSlice;
