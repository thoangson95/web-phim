import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MovieHot = ({ moviesHot }) => {

    return (
        <div className="dark:bg-[#2b2a2a] bg-gray-100 rounded-2xl p-6 sticky top-16">
            <p className="dark:text-white text-black font-bold mb-4 text-2xl">PHIM HOT</p>
            {moviesHot && moviesHot.map((item, index) => {
                return (
                    <div key={index} className="flex flex-col gap-5">
                        <Link href={item?.slugvi}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="relative rounded-lg overflow-hidden">
                                    <Image
                                        className="w-[70px] h-[105px] object-cover"
                                        src={`${process.env.NEXT_PUBLIC_LINK_HOST}thumbs/70x105x1/${process.env.NEXT_PUBLIC_UPLOAD_PRODUCT}${item?.photo}`}
                                        alt="Image"
                                        width={70}
                                        height={105}
                                        quality={100}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg dark:text-white text-black mb-2 font-bold hover:text-hover">{item?.namevi}</h2>
                                    <span className="text-xs dark:text-white text-black uppercase">{item?.name_episode}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default MovieHot