"use client"

import Link from "next/link"
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useState } from "react"

const Episodes = ({ data }) => {
    const [showContent, setShowContent] = useState(false);

    return (
        <div className="dark:bg-[#2b2a2a] bg-gray-100 rounded-2xl p-6 sticky top-16">
            <div className={`relative ${!showContent && data.length > 28 && "max-h-[11.5625rem] overflow-hidden"}`}>
                <div className="grid lg:grid-cols-7 md:grid-cols-4 grid-cols-2 gap-2">
                    {data && data.map((item, index) => {
                        return (
                            <Link className="rounded-md bg-white shadow-lg text-md py-2 text-black font-semibold flex justify-center items-center hover:text-hover" key={index} href={`${item?.slugvi}`}>{item?.episode}</Link>
                        )
                    })}
                </div>
                {!showContent && data.length > 28 && (
                    <div className="absolute bottom-0 left-0 h-16 w-full bg-[linear-gradient(rgba(43,42,42,0),_rgb(43,42,42))]"></div>
                )}
            </div>
            {data.length > 28 && (
                <span
                    className="mx-auto mt-[.625rem] w-28 h-[1.875rem] flex justify-center items-center gap-2 rounded-md text-sm text-[#706969] cursor-pointer border-[#706969] border-solid border"
                    onClick={() => setShowContent(!showContent)}>
                    {showContent ? "Thu gọn" : "Xem thêm"}
                    {showContent ? <CaretUpOutlined /> : <CaretDownOutlined />}
                </span>
            )}
        </div>
    )
}

export default Episodes