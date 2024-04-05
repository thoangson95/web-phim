"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LinkMenu = ({ href, title }) => {
    const pathname = usePathname()

    return (
        <Link href={href} className={`hover:text-hover font-bold text-[15px] leading-[60px] cursor-pointer capitalize text-nowrap transition-colors duration-300 ${pathname === `/${href}` || pathname === href ? 'text-hover' : 'dark:text-white text-black'}`}>{title}</Link>
    )
}

export default LinkMenu