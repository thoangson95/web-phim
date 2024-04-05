import React from 'react'
import ViewMovie from './ViewMovie'
import { fetchEpisodeServer, fetchEpisodes, fetchMovie, fetchMoviesHay, fetchMoviesHot } from '@/app/actions';
import { auth } from '@/auth';

const MovieEpisode = async ({ movieEpisode }) => {
    const moviesHot = await fetchMoviesHot();
    const moviesHay = await fetchMoviesHay();
    const movie = await fetchMovie({ id: movieEpisode?.id_cat });
    const server = await fetchEpisodeServer({ id_parent: movieEpisode?.id });
    const episodes = await fetchEpisodes({ id_cat: movieEpisode?.id_cat });
    const session = await auth();

    return (
        <div className="relative">
            <div className="title-main">
                <span>{movie?.namevi} {movieEpisode?.episode}</span>
            </div>
            <ViewMovie movie={movie} episode={movieEpisode} episodes={episodes} server={server} moviesHot={moviesHot} moviesHay={moviesHay} session={session} />
        </div>
    )
}

export default MovieEpisode