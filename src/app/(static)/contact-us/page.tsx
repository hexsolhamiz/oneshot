import { ContactCta } from '@/components/contact-us/contact-cta'
import ContactForm from '@/components/contact-us/contact-form'
import { ContactHero } from '@/components/contact-us/contact-hero'
import SupportCards from '@/components/contact-us/support-card'
import React from 'react'

const page = () => {
  return (
    <div>
      <ContactHero />
      <SupportCards />
      <ContactForm />
      <ContactCta />
    </div>
  )
}

export default page