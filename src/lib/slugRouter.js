import { fetchCategorysBySlug, fetchMovieEpisode, fetchMovieSlug } from "@/app/actions";

const slugRouter = async (slug) => {
    const movie = await fetchMovieSlug({ slug });
    const movieEpisode = await fetchMovieEpisode({ slug });
    const category = await fetchCategorysBySlug({ slug });

    return { movie, movieEpisode, category };
}

export default slugRouter;