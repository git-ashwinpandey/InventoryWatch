import { useSidebarStore } from '@/state';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface SidebarLinkProps {
    href: string;
    icon: React.ElementType;
    label: string;
    isCollapsed: boolean;
}

const SidebarLink = ({ href, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === '/' && href === '/dashboard');
    const isSidebarCollapsed = useSidebarStore((state) => state.isSidebarCollapsed)
    return (
        <Link href={href}>
            <div className={`cursor-pointer flex items-center 
                ${isSidebarCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'}
                hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive ? 'bg-blue-200 dark:bg-gray-500 dark:text-white' : 'dark:bg-gray-800'}
            `}>
                <Icon className='w-6 h-6 !text-gray-700' />
                <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                    {label}
                </span>
            </div>
        </Link>
    )
}

export default SidebarLink