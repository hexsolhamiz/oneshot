import { AddonsHero } from '@/components/addons/addons-hero'
import { ComparePricing } from '@/components/addons/compare-pricing'
import { ExplorePackages } from '@/components/addons/explore-packages'
import { UpgradeCta } from '@/components/addons/upgrade-cta'
import React from 'react'

const page = () => {
  return (
    <div>
      <AddonsHero />
      <ExplorePackages />
      <ComparePricing />
      <UpgradeCta />
    </div>
  )
}

export default page