import { PartnerCarousel } from '@/components/sponsers/partner-carousel'
import { Partners } from '@/components/sponsers/partners'
import { SponsersHero } from '@/components/sponsers/sponsers-hero'
import { SponsorsCta } from '@/components/sponsers/sponsors-cta'
import React from 'react'

const page = () => {
  return (
    <div>
      <SponsersHero />
      <Partners />
      <PartnerCarousel />
      <SponsorsCta />
    </div>
  )
}

export default page