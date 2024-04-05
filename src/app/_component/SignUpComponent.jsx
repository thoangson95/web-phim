"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import {
    createNewUser,
    fetchUserByEmail,
    fetchUserByPhone,
    signJWT,
} from "../actions";
import { UserContext } from "../providers";
import { sendEmail } from "@/lib/mailer/mail";
import { message } from "antd";
import { signUpActivationTemplate } from "@/lib/mailer/templates";
import { LoadingOutlined } from "@ant-design/icons";

const SignUpComponent = ({ onShowSignIn }) => {
    const userContext = useContext(UserContext);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const origin = typeof window !== "undefined" ? window.location.origin : "";

    const handleClosePopup = () => {
        userContext?.setOpen(false);
        userContext?.setShowSignInSMS(false);
        userContext?.setShowSignInEmail(false);
        userContext?.setShowSignInSMSPassword(false);
        setIsLoading(false);
    };

    const handleSignUp = async () => {
        setIsLoading(true);
        const existingUserEmail = await fetchUserByEmail(email);
        const existingUserPhone = await fetchUserByPhone(email);
        if (!email) return message.error("Vui lòng nhập email");
        if (!password) return message.error("Vui lòng nhập password");
        if (!confirmPassword)
            return message.error("Vui lòng nhập lại password");
        if (!name) return message.error("Vui lòng nhập họ và tên");
        if (!phone) return message.error("Vui lòng nhập số điện thoại");
        if (existingUserEmail) return message.error("Email đã tồn tại");
        if (password != confirmPassword)
            return message.error("Mật khẩu không trùng khớp");
        if (existingUserPhone) return message.error("Số điện thoại đã tồn tại");

        const res = await createNewUser({
            name,
            email,
            password,
            phone,
        });

        if (res?.success) {
            const token = await signJWT({ id: res.insertId });
            const linkActivation = `${origin}/auth/activation/${token}`;
            await sendEmail({
                to: email,
                name: name,
                subject: "Tạo tài khoản thành công",
                html: signUpActivationTemplate(linkActivation),
            });
            handleClosePopup();
            return message.success(res?.message);
        } else {
            console.log(res?.message);
            return message.error(res?.message);
        }
    };

    return (
        <div className="p-[40px_45px_24px] rounded-[20px] dark:bg-body bg-white">
            <span className="cursor-pointer" onClick={onShowSignIn}>
                <Image
                    className="w-5 h-5 object-cover"
                    src="/images/back.png"
                    alt="Image"
                    width={20}
                    height={20}
                    quality={100}
                />
            </span>
            <div className="my-5">
                <h4 className="m-[0_0_10px] text-[24px] font-medium dark:text-white">
                    Tạo tài khoản
                </h4>
                <span className="text-[15px] dark:text-white">
                    Vui lòng nhập đầy đủ thông tin bên dưới
                </span>
            </div>
            <form>
                <div className="relative mb-4">
                    <input
                        className="w-full py-2.5 border-0 border-b border-b-gray-400 outline-none bg-white dark:bg-body dark:text-white"
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
                        className="w-full py-2.5 border-0 border-b border-b-gray-400 outline-none bg-white dark:bg-body dark:text-white"
                        type={isShowPassword ? "text" : "password"}
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                    <span
                        className="absolute z-10 right-0 top-2.5 text-blue-600 cursor-pointer"
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                        {isShowPassword ? "Ẩn" : "Hiện"}
                    </span>
                </div>
                <div className="relative mb-4">
                    <input
                        className="w-full py-2.5 border-0 border-b border-b-gray-400 outline-none bg-white dark:bg-body dark:text-white"
                        type={isShowConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                    <span
                        className="absolute z-10 right-0 top-2.5 text-blue-600 cursor-pointer"
                        onClick={() =>
                            setIsShowConfirmPassword(!isShowConfirmPassword)
                        }
                    >
                        {isShowConfirmPassword ? "Ẩn" : "Hiện"}
                    </span>
                </div>
                <div className="relative mb-4">
                    <input
                        className="w-full py-2.5 border-0 border-b border-b-gray-400 outline-none bg-white dark:bg-body dark:text-white"
                        type="text"
                        placeholder="Họ và tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>
                <div className="relative mb-4">
                    <input
                        className="w-full py-2.5 border-0 border-b border-b-gray-400 outline-none bg-white dark:bg-body dark:text-white"
                        type="phone"
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>
                <button
                    type="button"
                    className={`m-[26px_0px_10px] outline-none rounded-[4px] dark:bg-hover dark:hover:bg-blue-600 bg-red-500 hover:bg-red-600 py-2 w-full text-white border-0 text-xl cursor-pointer flex justify-center items-center gap-2 ${
                        isLoading && "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={handleSignUp}
                    disabled={isLoading}
                >
                    {isLoading && <LoadingOutlined />}
                    Đăng ký
                </button>
            </form>
        </div>
    );
};

export default SignUpComponent;
