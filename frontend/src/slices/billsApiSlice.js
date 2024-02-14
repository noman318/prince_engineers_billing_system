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
    getAllBills: builder.query({
      query: () => ({
        url: BILLS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getBillById: builder.query({
      query: (id) => ({
        url: `${BILLS_URL}${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateBill: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BILLS_URL}${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateBillMutation,
  useGetAllBillsQuery,
  useGetBillByIdQuery,
  useUpdateBillMutation,
} = billsApiSlice;
