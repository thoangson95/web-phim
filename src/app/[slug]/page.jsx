
import Movies from "../_component/Movies";
import MovieEpisode from "../_component/MovieEpisode";
import slugRouter from "@/lib/slugRouter";
import Category from "../_component/Category";
import NotFound from "../not-found";

const SlugPage = async ({ params }) => {
    const { slug } = params;
    const { movie, movieEpisode, category } = await slugRouter(slug);

    return movie ?
        (
            <Movies movie={movie} />
        ) : movieEpisode ? (
            <MovieEpisode movieEpisode={movieEpisode} />
        ) : category ? (
            <Category category={category} />
        ) : (
            <NotFound />
        )
}

export default SlugPage