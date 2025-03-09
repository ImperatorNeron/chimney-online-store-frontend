import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import Image from 'next/image';

const MainThumbnailSlider = ({
    setThumbsSwiper,
    items,
    className = "thumbnail-slider"
}: MainThumbnailSliderProps) => {
    return (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 w-5/6 sm:w-2/4">
            <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress={true}
                className={className}
            >
                {items.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-14 cursor-pointer transition-opacity opacity-40 hover:opacity-100">
                            <Image
                                src={slide.thumbnail}
                                alt={slide.alt}
                                fill
                                className="object-contain rounded-lg border border-gray-500"
                                sizes="100px"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default MainThumbnailSlider;