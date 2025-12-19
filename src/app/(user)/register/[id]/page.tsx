import RegisterForm from '@/components/register/register-form'
import { RegisterHero } from '@/components/register/register-hero'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen'>
        <RegisterHero />
        <div>
            
        </div>
        <RegisterForm />
    </div>
  )
}

export default page