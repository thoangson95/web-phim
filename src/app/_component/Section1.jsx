"use client"

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { useCallback } from 'react';
import ItemMovie from './ItemMovie';

const Section1 = ({ movies }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
        Autoplay({ playOnInit: true, delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true })
    ]);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const onButtonAutoplayClick = useCallback(
        (callback) => {
            const autoplay = emblaApi?.plugins()?.autoplay
            if (!autoplay) return

            const resetOrStop =
                autoplay.options.stopOnInteraction === false
                    ? autoplay.reset
                    : autoplay.stop

            resetOrStop()
            callback()
        },
        [emblaApi]
    )

    return (
        <div className='mt-9'>
            <div className="title-main">
                <span>Phim Vip</span>
            </div>
            {movies?.length && (
                <div className='relative'>
                    <div className="overflow-hidden relative" ref={emblaRef}>
                        <div className="flex -ml-5">
                            {movies.map((item, index) => {
                                return (
                                    <div key={index} className='flex-none lg:basis-1/6 md:basis-1/4 basis-1/2 pl-5'>
                                        <ItemMovie item={item} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <PrevButton
                        onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
                        disabled={prevBtnDisabled}
                        className={`absolute top-1/2 -left-5 transform -translate-y-1/2 ${prevBtnDisabled && 'hidden'}`}
                    />
                    <NextButton
                        onClick={() => onButtonAutoplayClick(onNextButtonClick)}
                        disabled={nextBtnDisabled}
                        className={`absolute top-1/2 -right-5 transform -translate-y-1/2 ${nextBtnDisabled && 'hidden'}`}
                    />
                </div>
            )}
        </div>
    )
}

export default Section1