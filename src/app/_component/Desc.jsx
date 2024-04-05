"use client";

import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useState } from 'react'
import he from 'he'

const Desc = ({ desc }) => {
    const [showContent, setShowContent] = useState(false);

    return (
        <div className="dark:bg-[#2b2a2a] bg-gray-100 rounded-3xl py-10 px-6">
            <p className="dark:text-[#dddddd] text-black text-2xl font-bold mb-4 ">Nội dung</p>
            <div className={`relative ${!showContent && "h-24 overflow-hidden"}`}>
                <div
                    className="dark:text-[#999999] text-gray-500"
                    dangerouslySetInnerHTML={{
                        __html: desc && he.decode(desc),
                    }} />
                {!showContent && (
                    <div className="absolute bottom-0 left-0 h-16 w-full dark:bg-[linear-gradient(rgba(43,42,42,0),_rgb(43,42,42))] bg-[linear-gradient(rgba(243,244,246,0),_rgb(243,244,246))]"></div>
                )}
            </div>
            <span
                className="mx-auto mt-[10px] w-28 h-[30px] flex justify-center items-center gap-2 rounded-md text-sm text-[#706969] cursor-pointer border-[#706969] border-solid border"
                onClick={() => setShowContent(!showContent)}>
                {showContent ? "Thu gọn" : "Xem thêm"}
                {showContent ? <CaretUpOutlined /> : <CaretDownOutlined />}
            </span>
        </div>
    )
}

export default Desc