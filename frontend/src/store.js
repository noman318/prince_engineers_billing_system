import { configureStore } from "@reduxjs/toolkit";
import { apiSLice } from "./slices/apiSlice";
import authSliceReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [apiSLice.reducerPath]: apiSLice.reducer,
    authSlice: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSLice.middleware),
  devTools: true,
});

export default store;
