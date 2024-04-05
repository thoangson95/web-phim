"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BtnLogoutComponent from "./BtnLogoutComponent";
import { usePathname } from "next/navigation";

const ProfileLeftComponent = ({ user }) => {
    const pathname = usePathname();
    const photo = !user?.type
        ? `${process.env.NEXT_PUBLIC_LINK_HOST}thumbs/44x44x2/${
              user?.avatar
                  ? process.env.NEXT_PUBLIC_UPLOAD_USER + user?.avatar
                  : "assets/images/avatar.png"
          }`
        : user?.avatar
        ? user.avatar
        : `${process.env.NEXT_PUBLIC_LINK_HOST}thumbs/44x44x2/assets/images/avatar.png`;

    return (
        <div className="dark:bg-[#2b2a2a] bg-neutral-100 rounded-2xl p-6 mt-9 relative">
            <div className="sticky top-2">
                <div className="mb-3 flex items-center gap-2 pl-2">
                    <div className="flex-shrink-0">
                        <Image
                            className="w-11 rounded-full"
                            src={photo}
                            alt="Image"
                            width={44}
                            height={44}
                            quality={100}
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="m-0 text-[13px] dark:text-white text-gray-600">
                            Tài khoản của
                        </p>
                        <span className="text-base font-medium dark:text-white text-black">
                            {user?.name}
                        </span>
                    </div>
                </div>
                <ul className="m-0 list-none p-0">
                    <li>
                        <Link
                            className={`flex items-center gap-5 px-4 py-2 transition duration-300 hover:!text-hover ${
                                pathname == "/auth/information"
                                    ? "text-hover font-bold"
                                    : "dark:text-white text-black"
                            }`}
                            href="information"
                        >
                            <svg
                                className="h-6 w-6 flex-shrink-0 text-[rgb(155,155,155)]"
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="24px"
                                width="24px"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                            </svg>
                            <span className="text-[13px]">
                                Thông tin tài khoản
                            </span>
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center gap-5 px-4 py-2">
                            <svg
                                className="h-6 w-6 flex-shrink-0 text-[rgb(155,155,155)]"
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                            </svg>
                            <BtnLogoutComponent />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileLeftComponent;
