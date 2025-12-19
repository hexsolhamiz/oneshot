"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

interface StepProgressProps {
  currentStep: number
  totalSteps: number
  stepTitle: string
  logoSrc?: string
}

export function StepProgress({
  currentStep,
  totalSteps,
  stepTitle,
}: StepProgressProps) {
  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="relative w-full max-w-3xl my-2 mx-auto">
      {/* Dotted background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="bg-primary w-full h-full"
          
        />
      </div>

      <div className="relative bg-white  p-4">
        {/* Header with step title */}
        <div className="flex justify-center mb-4">
          <div className="bg-primary text-white px-8 py-2 rounded-full text-sm font-medium shadow-md">
            Step {currentStep} of {totalSteps} - {stepTitle}
          </div>
        </div>

        {/* Progress bar container */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary bg-white flex items-center justify-center">
              <Image src={"/logos/logo.png"} alt="Logo" className="w-10 h-10 object-contain" width={200} height={200}/>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex-1 relative">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={cn("h-full bg-primary rounded-full transition-all duration-500 ease-out")}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Center line indicator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-purple-300 opacity-50" />
          </div>
        </div>
      </div>
    </div>
  )
}
