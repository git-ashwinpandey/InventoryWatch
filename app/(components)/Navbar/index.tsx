"use client"

import React, { useEffect, useState } from 'react'

import { HamburgerMenuIcon, BellIcon, MagnifyingGlassIcon, SunIcon, GearIcon } from "@radix-ui/react-icons"


import { Button } from '@/components/ui/Button'
import { Input } from "@/components/ui/input"
import { useTheme } from 'next-themes'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { useSidebarStore } from '@/state'

const Navbar = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const isSidebarCollapsed = useSidebarStore((state) => state.isSidebarCollapsed)

    const toggleSidebar = () => {
        useSidebarStore.setState({ isSidebarCollapsed: !isSidebarCollapsed })
        console.log(isSidebarCollapsed)
    }
    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className='flex justify-between items-center w-full mb-7'>
            {/* LEFT SIDE LOGO */}
            <div className='flex justify-between items-center gap-5'>
                <Button 
                    variant="outline" 
                    size="icon" 
                    className='hover:bg-blue-100 dark:hover:bg-blue-600' 
                    onClick={toggleSidebar}>
                    <HamburgerMenuIcon className='w-4 h-4 ' />
                </Button>


                {/* SEARCH BAR*/}
                <div className='relative'>
                    <Input
                        type='text'
                        placeholder='Search groups & products'
                        className='pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-black rounded-lg focus:outline-none focus:border-blue-100 dark:focus:border-blue-800'
                    />

                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non'>
                        <MagnifyingGlassIcon className='w-4 h-5 text-gray-500' />
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE ICONS */}
            <div className='flex justify-between items-center gap-5'>
                <div className='hidden md:flex justify-between items-center gap-5'>
                    <div>
                        <Button variant="outline" size="icon" className='bg-gray-200 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-600 cursor-pointer text' onClick={() => { }}>
                            <SunIcon className='w-4 h-4' />
                        </Button>
                    </div>

                    <div className='relative'>
                        <BellIcon className='w-5 h-5 cursor-pointer text-gray-500' />
                        <span className='absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full'></span>
                    </div>

                    <Separator orientation="vertical" className='bg-gray-400 dark:bg-gray-500 h-7' />

                    <div className='flex items-center gap-3 cursor-pointer'>
                        <div className='w-9 h-9'>
                            Image
                        </div>
                        <span className='font-semibold'>
                            AP
                        </span>
                    </div>
                </div>


                <Link href='/settings'>
                    <GearIcon className='cursor-pointer text-gray-500 w-7 h-7' />
                </Link>
            </div>
        </div>
    )
}

export default Navbar
