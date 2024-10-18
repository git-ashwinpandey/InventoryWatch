"use client"

import React from 'react'
import Navbar from '../(components)/Navbar'
import Sidebar from '../(components)/Sidebar'
import { useSidebarStore } from '@/state'


const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useSidebarStore((state) => state.isSidebarCollapsed)
  
  return (
    <div className='flex bg-gray-50 text-gray-900 w-full min-h-screen dark:bg-gray-900 dark:text-gray-50'>
      <Sidebar />
      <main className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 dark:bg-gray-800 ${isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72'}`}>
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default DashboardWrapper