import { Booking } from "@/types/booking";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const playerSlice = createApi({
  reducerPath: "playerApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://oneshot-backend.vercel.app/api` }),
  // http://localhost:3001/api/
  // 
  endpoints: (builder) => ({
    getBookingsByPlayerId: builder.query<Booking[], number | string | null>({
      query: (id : string) => `/booking/${id}`,
    }),
  }),
});

export const { useGetBookingsByPlayerIdQuery } = playerSlice;
