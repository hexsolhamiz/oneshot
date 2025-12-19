"use client"

import { useParams, useRouter } from "next/navigation"
import type { Trial } from "@/types/trial"
import { useGetEventsByCityQuery } from "@/store/slices/admin-slice"
import { Calendar, Users, MapPin, DollarSign } from "lucide-react"

interface PageProps {
  params: {
    city: string
  }
}

const Page = ({ params }: PageProps) => {
  const router = useRouter()
  const { id } = useParams() as { id: string }
  const { data: trials, isLoading, isError } = useGetEventsByCityQuery(id)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-black">Loading events...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
          <p className="text-red-400 font-medium">Failed to load events</p>
          <p className="text-red-400/60 text-sm mt-1">Please try again later</p>
        </div>
      </div>
    )
  }

  if (!trials || trials.length === 0) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <p className="text-black text-lg">No events found in</p>
          <p className="text-primary text-2xl font-bold capitalize">{id}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">Discover Events</p>
          <h1 className="text-4xl md:text-5xl font-bold text-black capitalize">
            Trials in <span className="text-primary">{id === "South_London" ? "South London" : id === "North_London" ? "North London" : id  }</span>
          </h1>
          <p className="text-white/50 mt-3">
            {trials.length} event{trials.length > 1 ? "s" : ""} available
          </p>
        </div>

        {/* Event Cards */}
        <div className="space-y-6">
          {trials.map((trial: Trial) => (
            <div
              key={trial.id}
              className="group relative my-2 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              {/* Primary accent line */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Event Info */}
                <div className="flex-1 space-y-4">
                  {/* Venue Name */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-primary group-hover:text-primary transition-colors">
                        {trial.venue}
                      </h2>
                      <p className="text-primary text-sm">Venue</p>
                    </div>
                  </div>

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                    {/* Date */}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-primary font-medium text-sm">
                          {new Date(trial.eventDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-primary text-xs">Date</p>
                      </div>
                    </div>

                    {/* Participants */}
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-primary font-medium text-sm">
                          {trial.participants}
                          <span className="text-primary">/{trial.totalCapacity}</span>
                        </p>
                        <p className="text-primary text-xs">Spots</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-primary font-medium text-sm">${trial.standardPrice}</p>
                        <p className="text-primary text-xs">Price</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="flex flex-col items-center gap-3 md:pl-6 md:border-l md:border-white/10">
                  {/* Availability Badge */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-primary text-xs font-medium">
                      {trial.totalCapacity - trial.participants} spots left
                    </span>
                  </div>

                  {/* Buy Button */}
                  <button
                    onClick={() => router.push(`/register/${trial.id}`)}
                    className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:cursor-pointer hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/25"
                  >
                    Buy Ticket
                  </button>
                </div>
              </div>

              {/* Bottom gradient line on hover */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/30 to-transparent transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
