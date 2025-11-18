import { BlogsHero } from '@/components/blogs/blogs-hero'
import { LatestArticles } from '@/components/blogs/latest-articles'
import { Updates } from '@/components/blogs/updates'
import React from 'react'

const page = () => {
  return (
    <div>
      <BlogsHero />
      <LatestArticles />
      <Updates />
    </div>
  )
}

export default page