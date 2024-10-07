import { FC, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react';

type carouselPropsType = {
    children: React.ReactNode[] | React.ReactNode,
    // other props...
}

const Carousel: FC<carouselPropsType> = ({children}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    useEffect(() => {
        if (!emblaRef) return
    })
    return (
        <div>
            <div className="relative md:px-2">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-3 px-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel