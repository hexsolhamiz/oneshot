import { Inquiry } from "@/types/inquiry";
import { Mails } from "@/types/mails";
import { Player } from "@/types/player";
import { Trial } from "@/types/trial";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminSlice = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://oneshot-backend.vercel.app/api` }),
  // http://localhost:3001/api/
  // 
  tagTypes: ["Raffle"],
  endpoints: (builder) => ({
    getAllPlayers: builder.query<Player[], number | string | null>({
      query: () => "/players",
    }),

    getPlayerById: builder.query<Player, string>({
      query: (playerId) => `/players/${playerId}`,
    }),
    // updateRaffle: builder.mutation<
    //   RaffleData,
    //   { id: string; data: Partial<RaffleData> }
    // >({
    //   query: ({ id, data }) => ({
    //     url: `raffles/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),
    // deleteRaffle: builder.mutation<void, string>({
    //   query: (raffleId) => ({
    //     url: `/raffle/${raffleId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Raffle"],
    // }),
    getAllEvents: builder.query<Trial[], number | string | null>({
      query: () => "/events",
    }),
    getEventById: builder.query<Trial, string>({
      query: (eventId) => `/events/${eventId}`,
    }),

    getEventsByCity : builder.query<Trial[], string>({
      query: (city) => `/events/city?city=${city}`,
    }),

    getAllInquiries: builder.query<Inquiry[], number | string | null>({
      query: () => "/inquiries",
    }),
    getAllMailers: builder.query<Mails[], number | string | null>({
      query: () => "/admin/mails",
    }),
    

    deleteInquiry: builder.mutation<void, string>({
      query: (id) => ({
        url: `/inquiries/${id}`,
        method: "DELETE",
      }),
    }),
    deleteMail: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/mails/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useGetEventsByCityQuery,
  useDeleteMailMutation,
  useDeleteInquiryMutation,
  useGetPlayerByIdQuery,
  useGetAllMailersQuery,
  useGetAllInquiriesQuery,
  useGetAllPlayersQuery,
} = adminSlice;
