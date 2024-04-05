"use client";

import { signOut } from "next-auth/react";

const BtnLogoutComponent = () => {
    return (
        <a onClick={() => signOut({ redirect: true, callbackUrl: "/" })} className='text-[13px] cursor-pointer hover:!text-hover dark:text-white text-[rgb(74,74,74)] transition duration-300'>Đăng xuất</a>
    )
}

export default BtnLogoutComponent