import React from 'react'
import Image from 'next/image'
export const TrustedPartners = () => {
  return (
      <div className="min-h-[400px] w-full py-12 mx-auto max-w-7xl flex flex-col items-center justify-center">
          <h1 className="text-4xl text-primary">Trusted by Leading Football and Community Brands</h1>
          <p className="text-black text-center max-w-6xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            faucibus lobortis nisi vitae venenatis. Donec convallis velit a
            dignissim molestie. Nam gravida hendrerit dolor nec faucibus. Vivamus
            varius ornare massa ut pulvinar.
          </p>
    
          <div className="w-full gap-4 place-items-center py-6 grid grid-cols-3">
          {
            Array.from({length : 6}).map((_, index) => {
               return  (
                <Image 
                key={index}
                alt="logo"
                width={80}
                height={80}
                src="/logos/logo.png"
                />
               )
            })
          }
          </div>
        </div>
  )
}
