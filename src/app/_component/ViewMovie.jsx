"use client";

import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useContext, useState } from "react";
import he from "he";
import MovieHot from "./MovieHot";
import Desc from "./Desc";
import MovieHay from "./MovieHay";
import { useSession } from "next-auth/react";
import { UserContext } from "../providers";
import { useRouter } from "next/navigation";

const ViewMovie = ({
    movie,
    episode,
    episodes,
    server,
    moviesHot,
    moviesHay,
    session,
}) => {
    const router = useRouter();
    const { data: sessionClient } = useSession();
    const userContext = useContext(UserContext);
    const [serverFirst, setServerFirst] = useState(server?.[0]);
    const [showContent, setShowContent] = useState(false);

    const timeNow = Math.floor(Date.now() / 1000);

    const iframeContent = serverFirst?.iframe ? (
        <div
            className="relative pb-[57%] [&_iframe]:!absolute [&_iframe]:!inset-0 [&_iframe]:!w-full [&_iframe]:!h-full [&_iframe]:!overflow-hidden"
            dangerouslySetInnerHTML={{
                __html: he.decode(serverFirst.iframe),
            }}
        />
    ) : (
        <div className="relative pb-[57%] [&_iframe]:!absolute [&_iframe]:!inset-0 [&_iframe]:!w-full [&_iframe]:!h-full [&_iframe]:!overflow-hidden">
            <iframe src={serverFirst?.link} allowfullscreen=""></iframe>
        </div>
    );

    const hanldeCheckVip = () => {
        if (sessionClient?.user) {
            router.push("/auth/information");
        } else {
            userContext?.setOpen(true);
            userContext?.setShowSignInSMS(true);
        }
    };

    return (
        serverFirst && (
            <div className="relative">
                {episode?.status.includes("vip") ? (
                    session?.user.vip > timeNow ? (
                        iframeContent
                    ) : (
                        <div className="relative pb-[57%] [&_iframe]:!absolute [&_iframe]:!inset-0 [&_iframe]:!w-full [&_iframe]:!h-full [&_iframe]:!overflow-hidden bg-black">
                            <div className="absolute top-1/2 w-full px-11 -translate-y-1/2 leading-7">
                                <span>
                                    Tập phim này yêu cầu tài khoản VIP mới có
                                    thể xem được, vui lòng nâng cấp tài khoản để
                                    có thể trải nghiệm tốc độ cao hơn và có thể
                                    xem những tập phim bị hạn chế.
                                </span>{" "}
                                <a
                                    class="text-orange-400 hover:text-hover cursor-pointer"
                                    onClick={hanldeCheckVip}
                                >
                                    Click vào đây.
                                </a>
                            </div>
                        </div>
                    )
                ) : (
                    iframeContent
                )}
                <div className="mt-5 flex justify-center items-center flex-wrap gap-2 dark:bg-[#2b2a2a] bg-gray-100 rounded-2xl p-6">
                    {server?.map((item, index) => {
                        return (
                            <a
                                key={index}
                                className={`px-2.5 py-1.5 text-white rounded-md cursor-pointer hover:opacity-70 transition-all ${
                                    serverFirst?.id == item?.id
                                        ? "bg-hover"
                                        : "bg-[#6b6a6a]"
                                }`}
                                onClick={() => setServerFirst(item)}
                            >
                                {item?.namevi}
                            </a>
                        );
                    })}
                </div>
                <div className="mt-5 dark:bg-[#2b2a2a] bg-gray-100 rounded-2xl p-6">
                    <p className="dark:text-white text-black text-2xl font-bold capitalize mb-5">
                        Danh sách tập
                    </p>
                    <div className="relative">
                        <div
                            className={`relative ${
                                !showContent &&
                                episodes.length > 28 &&
                                "max-h-[185px] overflow-hidden"
                            }`}
                        >
                            <div className="grid lg:grid-cols-7 md:grid-cols-4 grid-cols-2 gap-2">
                                {episodes &&
                                    episodes.map((item, index) => {
                                        return (
                                            <Link
                                                className={`rounded-md shadow-lg text-md py-2 font-semibold flex justify-center items-center ${
                                                    episode?.slugvi ===
                                                    item?.slugvi
                                                        ? "bg-hover text-white"
                                                        : "bg-white text-black hover:text-hover"
                                                }`}
                                                key={index}
                                                href={`/${item?.slugvi}`}
                                            >
                                                {item?.episode}
                                            </Link>
                                        );
                                    })}
                            </div>
                            {!showContent && episodes.length > 28 && (
                                <div className="absolute bottom-0 left-0 h-16 w-full bg-[linear-gradient(rgba(43,42,42,0),_rgb(43,42,42))]"></div>
                            )}
                        </div>
                        {episodes.length > 28 && (
                            <span
                                className="mx-auto mt-[10px] w-28 h-[30px] flex justify-center items-center gap-2 rounded-md text-sm text-[#706969] cursor-pointer border-[#706969] border-solid border"
                                onClick={() => setShowContent(!showContent)}
                            >
                                {showContent ? "Thu gọn" : "Xem thêm"}
                                {showContent ? (
                                    <CaretUpOutlined />
                                ) : (
                                    <CaretDownOutlined />
                                )}
                            </span>
                        )}
                    </div>
                </div>
                <div className="grid lg:grid-cols-[minmax(0,_1fr)_340px] grid-cols-1 gap-6 mt-5">
                    <div className="relative">
                        <Desc desc={movie?.descvi} />
                        <MovieHay movies={moviesHay} />
                    </div>
                    <div className="relative">
                        <MovieHot moviesHot={moviesHot} />
                    </div>
                </div>
            </div>
        )
    );
};

export default ViewMovie;
