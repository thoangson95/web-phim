import ItemMovie from '@/app/_component/ItemMovie';
import Image from 'next/image';
import Link from 'next/link';

const MovieHay = ({ movies }) => {

    return (
        <div className="dark:bg-[#2b2a2a] bg-gray-100 rounded-3xl py-10 px-6 mt-5">
            <p className="dark:text-[#dddddd] text-black text-2xl font-bold mb-4 ">Phim hay</p>
            <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-3">
                {movies && movies.map((item, index) => {
                    return (
                        <div key={index} className="">
                            <ItemMovie item={item} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MovieHay