import { BILLS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const billsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBill: builder.mutation({
      query: (data) => ({
        url: `${BILLS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateBillMutation } = billsApiSlice;
