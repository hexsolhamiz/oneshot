import { SuccessStories } from '@/components/home/success-stories'
import { Impact } from '@/components/success-stories/impact'
import { SuccessCta } from '@/components/success-stories/success-cta'
import { SuccessHero } from '@/components/success-stories/success-hero'
import { WatchHighlights } from '@/components/success-stories/watch-highlights'
const page = () => {
  return (
    <div>
      <SuccessHero />
      <WatchHighlights />
      <SuccessStories />
      <Impact />
      <SuccessCta />
    </div>
  )
}

export default page