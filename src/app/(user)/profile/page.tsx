"use client"
import ProfileSidebar from '@/components/profile/profile-sidebar'
import ProfileSection from '@/components/profile/trial/profile-section';
import { TrialsSection } from '@/components/profile/trial/trials-section';
import React, { useState } from 'react'

const Page = () => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className='min-h-screen flex'>
      <ProfileSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

       <div className="flex-1 mt-12 lg:mt-0 flex flex-col">
          <div className="flex-1 overflow-y-auto p-8">
            {activeSection === "profile" && <ProfileSection/>}

            {activeSection === "trials" && (
              <TrialsSection/>
            )}
            
          </div>
        </div>
    </div>
  )
}

export default Page