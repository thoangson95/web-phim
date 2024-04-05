"use client";

import { message } from "antd";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInComponent = ({ onShowSignUp, onShowSignInSMS }) => {
    const router = useRouter();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        if (!email) {
            return message.error("Vui lòng nhập email");
        }
        if (!password) {
            return message.error("Vui lòng nhập password");
        }
        const signin = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        console.log(signin);
        if (signin?.error) {
            if (signin?.error === "CredentialsSignin") {
                message.error("Tài khoản hoặc mật khẩu không chính xác");
            } else if (signin?.error === "Configuration") {
                message.error("Tài khoản chưa được kích hoạt");
            } else {
                message.error("lỗi gì rồi");
            }
        } else {
            message.success("Đăng nhập thành công");
            router.refresh();
        }
    };

    const onSubmitGoogle = async (e) => {
        await signIn("google", { redirect: true });
    };

    return (
        <div className="p-[40px_45px_24px] rounded-[20px] dark:bg-body bg-white">
            <div className="relative">
                <div className="my-5">
                    <h4 className="m-[0_0_10px] text-[24px] font-medium dark:text-white">
                        Đăng nhập
                    </h4>
                </div>
                <div className="relative mb-4">
                    <input
                        className="w-full py-2.5 border-0 border-b border-b-gray-400 outline-none dark:bg-body bg-white dark:text-white"
                        type="email"
                        name="email"
                        placeholder="acb@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>
                <div className="relative mb-4">
                    <input
                        className="w-full py-2.5 border-0 border-b border-b-gray-400 outline-none dark:bg-body bg-white dark:text-white [&::-ms-reveal]:!hidden [&::-ms-clear]:!hidden"
                        type={isShowPassword ? "text" : "password"}
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                    <span
                        className="absolute z-10 right-0 top-2.5 text-hover cursor-pointer"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                        {isShowPassword ? "Ẩn" : "Hiện"}
                    </span>
                </div>
                <button
                    type="button"
                    className="m-[26px_0px_10px] outline-none rounded-[4px] dark:bg-hover dark:hover:bg-blue-600 bg-red-500 hover:bg-red-600 py-2 w-full text-white border-0 text-xl cursor-pointer flex justify-center items-center gap-2"
                    onClick={() => onSubmit()}
                >
                    Đăng nhập
                </button>
                <p className="mt-6 mb-3 relative before:content-[''] before:w-full before:h-px before:bg-[rgb(242,_242,_242)] before:absolute before:left-0 before:top-2/4 before:-translate-y-1/2 text-center">
                    <span className="text-gray-600 text-[13px] m-[20px_0_0] dark:text-white relative z-10 dark:bg-body bg-white text-base px-5">
                        Hoặc tiếp tục bằng
                    </span>
                </p>
                <button
                    type="button"
                    className="m-[20px_0_0] outline-none rounded-[4px] dark:bg-white bg-gray-200 py-2 w-full text-black hover:bg-hover transition-colors duration-300 border-0 text-xl cursor-pointer flex justify-center items-center gap-3"
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
                {/* <p className="text-hover text-[13px] m-[20px_0_0] cursor-pointer">
                    Quên mật khẩu
                </p> */}
                <p className="text-gray-600 text-[13px] m-[10px_0_0] dark:text-white">
                    Chưa có tài khoản?{" "}
                    <span
                        className="text-hover ml-0 cursor-pointer inline-block"
                        onClick={onShowSignUp}
                    >
                        Tạo tài khoản
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignInComponent;
