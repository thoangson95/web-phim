import Link from "next/link";
import { fetchCategorysNB, fetchMoviesByCategory } from "../actions";
import { RightOutlined } from "@ant-design/icons";
import ItemMovie from "./ItemMovie";

const Section2 = async () => {
    const categorys = await fetchCategorysNB();

    return categorys?.length && categorys?.map(async (item, index) => {
        const movies = await fetchMoviesByCategory({ id_list: item?.id, limit: "limit 0,12" });

        return movies?.length && (
            <div key={index} className="dark:bg-[#2b2a2a] bg-neutral-100 rounded-2xl p-6 mt-9">
                <div className="title-main flex justify-between items-center flex-wrap gap-2">
                    <span>{item?.namevi}</span>
                    {movies.length > 12 &&
                        <Link href={item?.slugvi} className="flex items-center gap-1 font-bold text-white text-sm hover:text-hover">Xem thêm <RightOutlined className="!text-xs" /></Link>
                    }
                </div>
                <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-5">
                    {movies.map((movie, index2) => (
                        <div key={index2} className="relative">
                            <ItemMovie item={movie} />
                        </div>
                    ))}
                </div>
            </div>
        )
    })
}

export default Section2