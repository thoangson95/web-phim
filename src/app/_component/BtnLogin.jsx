"use client";

import { Modal } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import SignInComponent from "./SignInComponent";
import SignUpComponent from "./SignUpComponent";
import Link from "next/link";
import SignInSMSComponent from "./SignInSMSComponent";
import NotFound from "../not-found";
import Image from "next/image";
import { UserContext } from "../providers";

const BtnLogin = ({ session }) => {
    const { data: sessionClient } = useSession();
    const userContext = useContext(UserContext);

    const currentTime = new Date();
    const currentTimeTimeStamp = Math.floor(currentTime.getTime() / 1000);

    const handleClosePopup = () => {
        userContext?.setOpen(false);
        userContext?.setShowSignInSMS(false);
        userContext?.setShowSignInEmail(false);
        userContext?.setShowSignInSMSPassword(false);
    };

    return session || sessionClient ? (
        <div className="relative flex items-center gap-2">
            {session?.user?.vip >= currentTimeTimeStamp && (
                <Image
                    className="object-cover"
                    src="/images/vip.png"
                    alt="Image"
                    width={30}
                    height={40}
                    quality={100}
                />
            )}
            <Link
                href="/auth/information"
                className="dark:text-white text-black hover:text-hover font-bold text-[15px] leading-[60px] cursor-pointer capitalize text-nowrap transition-colors duration-300"
            >
                Chào, {session?.user?.name}
            </Link>
        </div>
    ) : (
        <>
            <a
                onClick={() => {
                    userContext?.setOpen(true);
                    userContext?.setShowSignInSMS(true);
                }}
                className="dark:text-white text-black hover:text-hover font-bold text-[15px] leading-[60px] cursor-pointer capitalize text-nowrap transition-colors duration-300"
            >
                Đăng nhập
            </a>
            <Modal
                onCancel={handleClosePopup}
                centered
                open={userContext?.open}
                footer={null}
                className="[&_.ant-modal-content]:!p-0 dark:[&_.anticon_svg]:text-white [&_.ant-modal-content]:!bg-transparent"
            >
                {userContext?.showSignUp ? (
                    <SignUpComponent
                        onShowSignIn={() => userContext?.setShowSignUp(false)}
                    />
                ) : (
                    <SignInComponent
                        onShowSignUp={() => userContext?.setShowSignUp(true)}
                        onShowSignInSMS={() =>
                            userContext?.setShowSignInEmail(false)
                        }
                    />
                )}
            </Modal>
        </>
    );
};

export default BtnLogin;
