import ItemMovie from "@/app/_component/ItemMovie";
import { fetchMoviesByCategory } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";

const Category = async ({ category }) => {
    const movies = await fetchMoviesByCategory({ id_list: category?.id });

    return (
        <div>
            <div className="title-main">
                <span>{category?.namevi}</span>
            </div>
            {movies?.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                    {movies.map((item, index) => {
                        return (
                            <div key={index} className="relative">
                                <ItemMovie item={item} />
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="bg-[#2b2a2a] rounded-xl p-5">
                    <span className="text-white font-bold">Không tìm thấy kết quả</span>
                </div>
            )}
        </div>
    )
}

export default Category