import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ItemMovie = ({ item }) => {
    return (
        <Link href={item?.slugvi}>
            <div className="relative">
                <div className="rounded-xl overflow-hidden">
                    <Image
                        className="w-full h-full object-cover"
                        src={`${process.env.NEXT_PUBLIC_LINK_HOST}thumbs/200x280x1/${process.env.NEXT_PUBLIC_UPLOAD_PRODUCT}${item?.photo}`}
                        alt="Image"
                        width={200}
                        height={280}
                        priority={true}
                        quality={100}
                    />
                </div>
                <span className='absolute left-1 top-1 p-1 rounded-[2px] shadow-sm text-xs bg-gradient-purple text-white font-bold'>{item?.name_episode}</span>
            </div>
            <div className="mt-4">
                <span className="dark:text-white text-black text-md font-bold hover:text-hover text-split-2">{item?.namevi}</span>
            </div>
        </Link>
    )
}

export default ItemMovie