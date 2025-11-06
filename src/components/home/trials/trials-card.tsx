"use client"

import { Button } from "@/components/ui/button"

interface Stadium {
  id: number
  image: string
  details: {
    location: string
    trialDate: string
    spotsLeft: number
    capacity: string
  }
}

interface HoverDetailCardProps {
  stadium: Stadium
}

export default function TrialCard({ stadium }: HoverDetailCardProps) {
  return (
    <div className="group w-full relative h-80 rounded-lg overflow-hidden cursor-pointer">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url('${stadium.image}')`,
        }}
      />

      {/* Overlay */}
      {/* <div className="absolute inset-0 from-black/40 via-black/50 to-black/80" /> */}

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        {/* Top Section */}
        <div className="space-y-1">
          <h3 className="text-xl font-medium">{stadium.details.location}</h3>
          <p className="text-sm font-normal text-gray-300">{stadium.details.trialDate} | {stadium.details.spotsLeft} spots left</p>
        </div>  
          {/* Learn More Button */}
          <Button className="w-fit text-xs px-6 rounded-full my-1 bg-primary text-white gap-2" size="sm">
            Learn More
          </Button>    
      </div>
    </div>
  )
}
