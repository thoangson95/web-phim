"use client";

import { FieldTimeOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChangePassword, updateProfileUser } from "../actions";
import { signOut } from "next-auth/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { strtotime, formatDate } from "@/lib/functions";

const ProfileRightComponent = ({ user }) => {
    const currentDate = new Date();
    const router = useRouter();
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [emailUpdate, setEmailUpdate] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);
    const [phoneUpdate, setPhoneUpdate] = useState(user?.phone);
    const [birthday, setBirthday] = useState(
        user?.birthday
            ? formatDate("Y-m-d", user.birthday)
            : currentDate.toISOString().slice(0, 10)
    );
    const [gender, setGender] = useState(user?.gender);
    const [avatar, setAvatar] = useState(user?.avatar);
    const [password, setPassword] = useState(user?.password);
    const [newPassword, setNewPassword] = useState("");
    const [comfirmNewPassword, setComfirmNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showComfirmNewPassword, setShowComfirmNewPassword] = useState(false);
    const [packetVip, setPacketVip] = useState({
        idPacket: 1,
        name: "Gói Vip 1",
        price: 40000,
        expires: 1,
    });
    const packetVipRef = useRef(packetVip);
    const [modalBaoMat, setModalBaoMat] = useState(false);
    const [modalBuyVip, setModalBuyVip] = useState(false);
    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(1);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    useEffect(() => {
        packetVipRef.current = packetVip;
    }, [packetVip]);

    const handleChangeGender = (e) => {
        if (e.target.checked === true) {
            setGender(Number(e.target.value));
        }
    };

    const handleChangePassword = async () => {
        if (!password) {
            return message.error("Mật khẩu cũ không được để trống");
        }
        if (!newPassword) {
            return message.error("Mật khẩu mới không được để trống");
        }
        if (!comfirmNewPassword) {
            return message.error("Nhập lại mật khẩu mới không được để trống");
        }
        const result = await ChangePassword({
            id: user?.idUser,
            password,
            newPassword,
            comfirmNewPassword,
        });
        if (result?.error) {
            return message.error(result?.message);
        } else {
            message.success(result?.message);
            setPassword("");
            setNewPassword("");
            setComfirmNewPassword("");
            setModalBaoMat(false);
            signOut({
                redirect: true,
                callbackUrl: "/",
            });
        }
    };

    const hanldeCreatePayPalOrder = async () => {
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    idUser: user?.idUser,
                    ...packetVipRef.current,
                },
            }),
        });
        const order = await res.json();
        return order?.id;
    };

    const handleSaveProfile = async () => {
        const birthdayTimestamp = strtotime(birthday);
        const res = await updateProfileUser({
            id: user?.idUser,
            name,
            birthday: birthdayTimestamp,
            gender,
        });
        if (res?.success) {
            return message.success(res?.message);
        } else {
            return message.error(res?.message);
        }
    };

    return (
        <form className="relative">
            <div className="grid lg:grid-cols-[minmax(0,_1fr)_1px_45%] grid-cols-1 dark:bg-[#2b2a2a] bg-neutral-100 rounded-2xl p-6 mt-9">
                <div className="py-4 pl-4 pr-6">
                    <span className="text-base font-bold dark:text-white text-slate-500">
                        Thông tin cá nhân
                    </span>
                    <div className="mt-4 mb-8">
                        <div className="flex items-center flex-wrap gap-4">
                            <div className="flex flex-col gap-6 flex-1">
                                <div className="flex items-center gap-3">
                                    <div className="w-24">
                                        <span>Họ và tên</span>
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="search"
                                            placeholder="Thêm họ tên"
                                            value={name}
                                            className="[transition:border-color_0.15s_ease-in-out_0s,_box-shadow_0.15s_ease-in-out_0s,_-webkit-box-shadow_0.15s_ease-in-out_0s] h-[36px] w-full rounded-[4px] px-[12px] leading-[20px] outline-none flex-1 border border-solid border-[rgb(196,196,207)] focus:border-[rgb(102,_175,_233)]"
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-24">
                                        <span>Ngày sinh</span>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            placeholder="Thêm ngày sinh"
                                            value={birthday}
                                            className="[transition:border-color_0.15s_ease-in-out_0s,_box-shadow_0.15s_ease-in-out_0s,_-webkit-box-shadow_0.15s_ease-in-out_0s] h-[36px] w-full rounded-[4px] px-[12px] leading-[20px] outline-none flex-1 border border-solid border-[rgb(196,196,207)] focus:border-[rgb(102,_175,_233)]"
                                            onChange={(e) =>
                                                setBirthday(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-24">
                                <span>Giới tính</span>
                            </div>
                            <label className="flex items-center cursor-pointer gap-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="0"
                                    className="radio-hidden"
                                    onChange={(e) => handleChangeGender(e)}
                                    checked={gender === 0 ? true : false}
                                />
                                <span className="radio-fake"></span>
                                <span className="label">Nam</span>
                            </label>
                            <label className="flex items-center cursor-pointer gap-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="1"
                                    className="radio-hidden"
                                    onChange={(e) => handleChangeGender(e)}
                                    checked={gender === 1 ? true : false}
                                />
                                <span className="radio-fake"></span>
                                <span className="label">Nữ</span>
                            </label>
                            <label className="flex items-center cursor-pointer gap-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="2"
                                    className="radio-hidden"
                                    onChange={(e) => handleChangeGender(e)}
                                    checked={gender === 2 ? true : false}
                                />
                                <span className="radio-fake"></span>
                                <span className="label">Khác</span>
                            </label>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="button"
                                className="bg-hover hover:bg-blue-500 w-44 h-10 rounded-md border-0 text-white text-sm flex items-center justify-center cursor-pointer"
                                onClick={handleSaveProfile}
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-0 border-l border-solid border-slate-200 my-4"></div>
                <div className="py-4 pr-4 pl-6">
                    <span className="text-base dark:text-white text-slate-500">
                        Số điện thoại và email
                    </span>
                    <div className="mb-4">
                        <div className="flex justify-between items-center py-5 border-0 border-b border-solid border-gray-300">
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <Image
                                    className="flex-shrink-0"
                                    src="/images/phone.png"
                                    alt="Image"
                                    width={24}
                                    height={24}
                                    quality={100}
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm dark:text-white text-gray-700">
                                        Số điện thoại
                                    </span>
                                    <span className="text-sm dark:text-white text-gray-700">
                                        {phone}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-5">
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <Image
                                    className="flex-shrink-0"
                                    src="/images/email.png"
                                    alt="Image"
                                    width={24}
                                    height={24}
                                    quality={100}
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm dark:text-white text-gray-700">
                                        Email
                                    </span>
                                    <span className="text-sm dark:text-white text-gray-700">
                                        {email}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {!user?.type && (
                            <div className="block">
                                <span className="text-base dark:text-white text-slate-500">
                                    Bảo mật
                                </span>
                                <div className="flex justify-between items-center py-5">
                                    <div className="flex gap-2 items-center flex-shrink-0">
                                        <Image
                                            className="flex-shrink-0"
                                            src="/images/lock.png"
                                            alt="Image"
                                            width={24}
                                            height={24}
                                            quality={100}
                                        />
                                        <span className="text-sm dark:text-white text-gray-700">
                                            Đổi mật khẩu
                                        </span>
                                    </div>
                                    <div
                                        className="border border-solid border-blue-500 h-7 rounded-md text-sm cursor-pointer px-3 text-blue-500 flex justify-center items-center transition duration-300 hover:bg-blue-500 hover:text-white"
                                        onClick={() => setModalBaoMat(true)}
                                    >
                                        Cập nhật
                                    </div>
                                    <Modal
                                        onCancel={() => setModalBaoMat(false)}
                                        centered
                                        open={modalBaoMat}
                                        footer={null}
                                        className="[&_.ant-modal-content]:!p-0 dark:[&_.anticon_svg]:text-white [&_.ant-modal-content]:!bg-transparent"
                                    >
                                        <div className="p-[40px_45px_24px] rounded-[20px] dark:bg-body bg-white">
                                            <div className="mb-4">
                                                <span className="mb-2 block dark:text-white">
                                                    Mật khẩu hiện tại
                                                </span>
                                                <div className="flex items-center gap-2 px-4 py-[6px] border border-solid border-gray-400 rounded-[4px]">
                                                    <input
                                                        className="flex-1 bg-transparent outline-none dark:text-white [&::-ms-reveal]:!hidden [&::-ms-clear]:!hidden"
                                                        role="presentation"
                                                        autoComplete="new-password"
                                                        type={
                                                            showPassword
                                                                ? "search"
                                                                : "password"
                                                        }
                                                        placeholder="Nhập mật khẩu hiện tại"
                                                        value={password}
                                                        onChange={(e) =>
                                                            setPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <Image
                                                        className="flex-shrink-0"
                                                        src={
                                                            showPassword
                                                                ? "/images/eye-splash.png"
                                                                : "/images/eye.png"
                                                        }
                                                        alt="Image"
                                                        width={24}
                                                        height={24}
                                                        quality={100}
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <span className="mb-2 block dark:text-white">
                                                    Mật khẩu mới
                                                </span>
                                                <div className="flex items-center gap-2 px-4 py-[6px] border border-solid border-gray-400 rounded-[4px]">
                                                    <input
                                                        className="flex-1 bg-transparent outline-none dark:text-white [&::-ms-reveal]:!hidden [&::-ms-clear]:!hidden"
                                                        type={
                                                            showNewPassword
                                                                ? "search"
                                                                : "password"
                                                        }
                                                        value={newPassword}
                                                        placeholder="Nhập mật khẩu mới"
                                                        onChange={(e) =>
                                                            setNewPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <Image
                                                        className="flex-shrink-0"
                                                        src={
                                                            showNewPassword
                                                                ? "/images/eye-splash.png"
                                                                : "/images/eye.png"
                                                        }
                                                        alt="Image"
                                                        width={24}
                                                        height={24}
                                                        quality={100}
                                                        onClick={() =>
                                                            setShowNewPassword(
                                                                !showNewPassword
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <span className="mb-2 block dark:text-white">
                                                    Nhập lại mật khẩu mới
                                                </span>
                                                <div className="flex items-center gap-2 px-4 py-[6px] border border-solid border-gray-400 rounded-[4px]">
                                                    <input
                                                        className="flex-1 bg-transparent outline-none dark:text-white [&::-ms-reveal]:!hidden [&::-ms-clear]:!hidden"
                                                        type={
                                                            showComfirmNewPassword
                                                                ? "search"
                                                                : "password"
                                                        }
                                                        value={
                                                            comfirmNewPassword
                                                        }
                                                        placeholder="Nhập lại mật khẩu mới"
                                                        onChange={(e) =>
                                                            setComfirmNewPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <Image
                                                        className="flex-shrink-0"
                                                        src={
                                                            showComfirmNewPassword
                                                                ? "/images/eye-splash.png"
                                                                : "/images/eye.png"
                                                        }
                                                        alt="Image"
                                                        width={24}
                                                        height={24}
                                                        quality={100}
                                                        onClick={() =>
                                                            setShowComfirmNewPassword(
                                                                !showComfirmNewPassword
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="flex items-center justify-center bg-hover hover:bg-blue-500 cursor-pointer h-10 rounded mt-5"
                                                onClick={() =>
                                                    handleChangePassword()
                                                }
                                            >
                                                <span className="text-white font-bold">
                                                    Lưu thay đổi
                                                </span>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        )}
                        <div className="block">
                            <span className="text-base dark:text-white text-slate-500">
                                Tài khoản Vip
                            </span>
                            <div className="flex justify-between items-center py-5">
                                <div className="flex gap-2 items-center flex-shrink-0">
                                    <FieldTimeOutlined className="text-2xl" />
                                    <span className="text-sm dark:text-white text-gray-700">
                                        {user?.vip
                                            ? formatDate("d/m/Y", user?.vip)
                                            : "Chưa có vip"}
                                    </span>
                                </div>
                                <div
                                    className="border border-solid border-blue-500 h-7 rounded-md text-sm cursor-pointer px-3 text-blue-500 flex justify-center items-center transition duration-300 hover:bg-blue-500 hover:text-white"
                                    onClick={() => setModalBuyVip(true)}
                                >
                                    {user?.vip
                                        ? user.vip < currentTimestamp
                                            ? "Gia hạn"
                                            : "Gia hạn thêm"
                                        : "Nâng cấp"}
                                </div>
                                <Modal
                                    onCancel={() => setModalBuyVip(false)}
                                    centered
                                    open={modalBuyVip}
                                    footer={null}
                                    className="[&_.ant-modal-content]:!p-0 dark:[&_.anticon_svg]:text-white [&_.ant-modal-content]:!bg-transparent"
                                >
                                    <div className="p-[40px_30px_24px] rounded-[20px] dark:bg-body bg-white">
                                        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mb-7">
                                            <div
                                                className={`dark:bg-main bg-neutral-100 p-2.5 rounded-md border-2 border-solid cursor-pointer ${
                                                    packetVip.idPacket === 1
                                                        ? "border-hover"
                                                        : "border-transparent"
                                                }`}
                                                onClick={() =>
                                                    setPacketVip({
                                                        idPacket: 1,
                                                        name: "Gói Vip 1",
                                                        price: 40000,
                                                        expires: 1,
                                                    })
                                                }
                                            >
                                                <p className="dark:text-white text-base font-bold uppercase mb-1">
                                                    Gói vip 1:
                                                </p>
                                                <p className="dark:text-white mb-1">
                                                    Giá:{" "}
                                                    <span className="text-hover font-bold">
                                                        40.000đ
                                                    </span>
                                                </p>
                                                <p className="dark:text-white">
                                                    Thời giạn:{" "}
                                                    <span className="text-hover font-bold">
                                                        1 tháng
                                                    </span>
                                                </p>
                                            </div>
                                            <div
                                                className={`dark:bg-main bg-neutral-100 p-2.5 rounded-md border-2 border-solid cursor-pointer ${
                                                    packetVip.idPacket === 2
                                                        ? "border-hover"
                                                        : "border-transparent"
                                                }`}
                                                onClick={() =>
                                                    setPacketVip({
                                                        idPacket: 2,
                                                        name: "Gói Vip 2",
                                                        price: 100000,
                                                        expires: 3,
                                                    })
                                                }
                                            >
                                                <p className="dark:text-white text-base font-bold uppercase mb-1">
                                                    Gói vip 2:
                                                </p>
                                                <p className="dark:text-white mb-1">
                                                    Giá:{" "}
                                                    <span className="text-hover font-bold">
                                                        100.000đ
                                                    </span>
                                                </p>
                                                <p className="dark:text-white">
                                                    Thời giạn:{" "}
                                                    <span className="text-hover font-bold">
                                                        3 tháng
                                                    </span>
                                                </p>
                                            </div>
                                            <div
                                                className={`dark:bg-main bg-neutral-100 p-2.5 rounded-md border-2 border-solid cursor-pointer ${
                                                    packetVip.idPacket === 3
                                                        ? "border-hover"
                                                        : "border-transparent"
                                                }`}
                                                onClick={() =>
                                                    setPacketVip({
                                                        idPacket: 3,
                                                        name: "Gói Vip 3",
                                                        price: 350000,
                                                        expires: 12,
                                                    })
                                                }
                                            >
                                                <p className="dark:text-white text-base font-bold uppercase mb-1">
                                                    Gói vip 3:
                                                </p>
                                                <p className="dark:text-white mb-1">
                                                    Giá:{" "}
                                                    <span className="text-hover font-bold">
                                                        350.000đ
                                                    </span>
                                                </p>
                                                <p className="dark:text-white">
                                                    Thời giạn:{" "}
                                                    <span className="text-hover font-bold">
                                                        1 năm
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <b className="text-hover">
                                                Tài khoản thanh toán
                                            </b>
                                            <p className="dark:text-white">
                                                <b>Email: </b>
                                                sb-43t05m30063230@personal.example.com
                                            </p>
                                            <p className="dark:text-white">
                                                <b>Password: </b>6r%lNwB0
                                            </p>
                                        </div>
                                        <PayPalScriptProvider
                                            options={{
                                                clientId:
                                                    process.env
                                                        .NEXT_PUBLIC_PAYPAL_CLIENTID,
                                            }}
                                        >
                                            <PayPalButtons
                                                style={{
                                                    layout: "horizontal",
                                                    color: "blue",
                                                    label: "checkout",
                                                    tagline: "false",
                                                    shape: "rect",
                                                }}
                                                createOrder={
                                                    hanldeCreatePayPalOrder
                                                }
                                                onCancel={(data) => {
                                                    console.log(
                                                        "Đã hủy: ",
                                                        data
                                                    );
                                                }}
                                                onApprove={async (
                                                    data,
                                                    actions
                                                ) => {
                                                    const { orderID } = data;
                                                    const res = await fetch(
                                                        "/api/capture",
                                                        {
                                                            method: "POST",
                                                            headers: {
                                                                "Content-Type":
                                                                    "application/json",
                                                            },
                                                            body: JSON.stringify(
                                                                {
                                                                    idUser: user?.idUser,
                                                                    orderID,
                                                                    packet: packetVipRef.current,
                                                                }
                                                            ),
                                                        }
                                                    );
                                                    const result =
                                                        await res.json();
                                                    if (result?.success) {
                                                        message.success(
                                                            "Gia hạn thành công"
                                                        );
                                                        setModalBuyVip(false);
                                                        router.refresh();
                                                    }
                                                }}
                                            />
                                        </PayPalScriptProvider>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ProfileRightComponent;
