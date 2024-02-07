import { USERS_URL } from "../constants";
import { apiSLice } from "./apiSlice";

export const userApiSlice = apiSLice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      mutation: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = userApiSlice;
