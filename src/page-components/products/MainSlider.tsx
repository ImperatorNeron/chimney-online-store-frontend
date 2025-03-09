import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import Image from 'next/image';


const MainSlider = ({
    thumbsSwiper,
    setSlideIndex = () => { },
    items,
    setIsOpen = () => { },
    initialSlideIndex = 0
}: MainSliderProps) => {
    return (
        <Swiper
            modules={[Navigation, Autoplay, Thumbs]}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            navigation={true}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            initialSlide={initialSlideIndex}
            className="w-full h-full"
            onSlideChange={(swiper) => setSlideIndex && setSlideIndex(swiper.realIndex)}
        >
            {items.map((slide) => (
                <SwiperSlide key={slide.id}>
                    <div className="relative w-full h-full">
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            className="object-contain rounded-lg"
                            priority
                            sizes="(max-width: 768px) 100vw, 75vw"
                            onClick={() => setIsOpen && setIsOpen(true)}
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default MainSlider;