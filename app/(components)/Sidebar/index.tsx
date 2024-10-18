'use client'

import { Button } from '@/components/ui/Button'
import { useSidebarStore } from '@/state'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'


const Sidebar = () => {
  const [mounted, setMounted] = useState(false)
  const isSidebarCollapsed = useSidebarStore((state) => state.isSidebarCollapsed)

  const toggleSidebar = () => {
    useSidebarStore.setState({ isSidebarCollapsed: !isSidebarCollapsed })
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
    } bg-gray-100 dark:bg-gray-700 duration-300 overflow-hidden h-full shadow-md dark:shadow-none z-40`

  return (
    <div className={sidebarClassNames}>
      {/* LOGO */}
      <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? 'px-5' : 'px-8'}`}>
        <div>logo</div>
        <h1 className={`font-extrabold text-2xl ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Stock</h1>
        <Button
          className='md:hidden px-3 py-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800'
          onClick={toggleSidebar}>
          <HamburgerMenuIcon className='w-5 h-5' />
        </Button>
      </div>

      { /* SIDEBAR LINKS */}
      <div className='flex-grow mt-8'>

      </div>

      {/* SIDEBAR FOOTER */}
      <div>
        <p className='text-center text-lg text-gray-500'>&copy; 2024</p>
      </div>
    </div>
  )
}

export default Sidebar