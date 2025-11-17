import { AboutHero } from '@/components/about/about-hero'
import { Goal } from '@/components/about/goal'
import { Mission } from '@/components/about/mission'
import { Story } from '@/components/about/story'
import { Team } from '@/components/about/team'
import { Vision } from '@/components/about/vision'
import { Why } from '@/components/about/why'
import React from 'react'

const page = () => {
  return (
    <div>
      <AboutHero />
      <Story />
      <Vision />
      <Mission />
      <Goal />
      <Team />
      <Why />
    </div>
  )
}

export default page