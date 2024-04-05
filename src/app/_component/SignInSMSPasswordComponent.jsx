import Image from 'next/image'
import { useState } from 'react';

const SignInSMSPasswordComponent = ({ onShowSignInSMS, phone }) => {
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState("");

    const hanldeSubmitSms = async () => {
        const response = await fetch("/api/bulksms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone,
            })
        });
        console.log(response);
    }

    return (
        <div className="p-[40px_45px_24px] rounded-[20px] dark:bg-body bg-white">
            <span className="cursor-pointer" onClick={onShowSignInSMS}>
                <Image
                    className="w-5 h-5 object-cover"
                    src="/images/back.png"
                    alt="Image"
                    width={20}
                    height={20}
                    quality={100}
                />
            </span>
            <div className="relative">
                <div className="my-5">
                    <h4 className="m-[0_0_10px] text-[24px] font-medium dark:text-white mb-0">
                        Nhập mật khẩu
                    </h4>
                    <p className='dark:text-white'>Vui lòng nhập mật khẩu của số điện thoại {phone}</p>
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
                        onClick={() => setIsShowPassword(!isShowPassword)}>
                        {isShowPassword ? "Ẩn" : "Hiện"}
                    </span>
                </div>
                <button
                    type="button"
                    className="m-[26px_0px_10px] outline-none rounded-[4px] dark:bg-hover dark:hover:bg-blue-600 bg-red-500 hover:bg-red-600 py-2 w-full text-white border-0 text-xl cursor-pointer flex justify-center items-center gap-2"
                    onClick={() => onSubmit()}
                >Đăng nhập</button>
                <div className='flex justify-between items-center flex-wrap gap-2 m-[20px_0_0]'>
                    <p className="text-hover text-[13px] cursor-pointer">
                        Quên mật khẩu
                    </p>
                    <p className="text-hover text-[13px] cursor-pointer" onClick={hanldeSubmitSms}>
                        Đăng nhập bằng SMS
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignInSMSPasswordComponent