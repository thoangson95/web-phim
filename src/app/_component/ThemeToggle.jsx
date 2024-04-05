"use client"

import { LoadingOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return (
        <div className='w-5'></div>
    )

    if (resolvedTheme === 'dark') {
        return (
            <div onClick={() => setTheme('light')} className='relative cursor-pointer dark:text-white text-black hover:text-hover text-xl flex items-center w-5'>
                <MoonOutlined />
            </div>
        )
    }
    if (resolvedTheme === 'light') {
        return (
            <div onClick={() => setTheme('dark')} className='relative cursor-pointer dark:text-white text-black hover:text-hover text-xl flex items-center w-5'>
                <SunOutlined />
            </div>
        )
    }
}

export default ThemeToggle