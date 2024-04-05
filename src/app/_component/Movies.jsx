import Image from 'next/image'
import React from 'react'
import Desc from './Desc'
import Episodes from './Episodes'
import MovieHot from './MovieHot'
import { fetchEpisodes, fetchMoviesHot } from '../actions'

const Movies = async ({ movie }) => {
    const moviesHot = await fetchMoviesHot();
    const episodes = await fetchEpisodes({ id_cat: movie?.id });

    return (
        <div className="relative">
            <div className="grid lg:grid-cols-[220px_minmax(0,_1fr)] grid-cols-1 items-start gap-5 mb-6">
                <div className="relative rounded-3xl overflow-hidden w-full h-[310px]">
                    <Image
                        className="w-full h-full object-cover"
                        src={`${process.env.NEXT_PUBLIC_LINK_HOST}thumbs/220x300x1/${process.env.NEXT_PUBLIC_UPLOAD_PRODUCT}${movie?.photo}`}
                        alt="Image"
                        width={220}
                        height={300}
                        priority={true}
                        quality={100}
                    />
                </div>
                <div className="relative">
                    <p className="dark:text-white text-black text-2xl font-bold capitalize mb-5">{movie?.namevi}</p>
                    <Desc desc={movie?.descvi} />
                </div>
            </div>
            <div className="grid lg:grid-cols-[minmax(0,_1fr)_340px] grid-cols-1 gap-6">
                <div className="relative">
                    <Episodes data={episodes} />
                </div>
                <div className="relative">
                    <MovieHot moviesHot={moviesHot} />
                </div>
            </div>
        </div>
    )
}

export default Movies