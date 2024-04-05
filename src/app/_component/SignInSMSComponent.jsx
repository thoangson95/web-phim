"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SignInSMSPasswordComponent from "./SignInSMSPasswordComponent";
import { signIn } from "next-auth/react";

const SignInSMSComponent = ({
    onShowSignInEmail,
    showSignInSMSPassword,
    setShowSignInSMSPassword,
}) => {
    const [phone, setPhone] = useState("");

    const onSubmitGoogle = async (e) => {
        await signIn("google", { redirect: true });
    };

    return showSignInSMSPassword ? (
        <SignInSMSPasswordComponent
            onShowSignInSMS={() => setShowSignInSMSPassword(false)}
            phone={phone}
        />
    ) : (
        <div className="p-[40px_45px_24px] rounded-[20px] dark:bg-body bg-white">
            <div className="relative">
                <div className="my-5">
                    <h4 className="m-[0_0_10px] text-[24px] font-medium dark:text-white mb-0">
                        Xin chào
                    </h4>
                    <p className="dark:text-white text-base">
                        Đăng nhập hoặc Tạo tài khoản
                    </p>
                </div>
                <div className="relative mb-4">
                    <input
                        className="w-full py-2.5 border-0 border-b border-b-gray-400 outline-none dark:bg-body bg-white dark:text-white text-2xl"
                        type="tel"
                        name="phone"
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="m-[26px_0px_10px] outline-none rounded-[4px] bg-hover hover:bg-blue-600 py-2 w-full text-white border-0 text-xl cursor-pointer flex justify-center items-center gap-2"
                    onClick={() => setShowSignInSMSPassword(true)}
                >
                    Tiếp tục
                </button>
                <p
                    className="text-hover cursor-pointer text-center"
                    onClick={onShowSignInEmail}
                >
                    Đăng nhập bằng Email
                </p>
                <p className="mt-6 mb-3 relative before:content-[''] before:w-full before:h-px before:bg-[rgb(242,_242,_242)] before:absolute before:left-0 before:top-2/4 before:-translate-y-1/2 text-center">
                    <span className="text-gray-600 text-[13px] m-[20px_0_0] dark:text-white relative z-10 dark:bg-body bg-white text-base px-5">
                        Hoặc tiếp tục bằng
                    </span>
                </p>
                <button
                    type="button"
                    className="m-[20px_0_0] outline-none rounded-[4px] dark:bg-white bg-gray-200 py-2 w-full text-black hover:bg-hover hover:text-white transition-colors duration-300 border-0 text-xl cursor-pointer flex justify-center items-center gap-3"
                    onClick={() => onSubmitGoogle()}
                >
                    <Image
                        src="/images/google.png"
                        alt="Image"
                        width={20}
                        height={21}
                        quality={100}
                    />
                    <span>Đăng nhập với google</span>
                </button>
            </div>
        </div>
    );
};

export default SignInSMSComponent;
