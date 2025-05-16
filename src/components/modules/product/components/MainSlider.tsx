import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import Image from 'next/image';


export default function MainSlider({
    thumbsSwiper,
    setSlideIndex = () => { },
    items,
    setIsOpen = () => { },
    initialSlideIndex = 0,
    className = ""
}: MainSliderProps) {
    return (
        <Swiper
            modules={[Navigation, Autoplay, Thumbs]}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            initialSlide={initialSlideIndex}
            className="w-full h-full rounded-xl"
            onSlideChange={(swiper) => setSlideIndex && setSlideIndex(swiper.realIndex)}
        >
            {items.map((slide) => (
                <SwiperSlide key={slide.id}>
                    <div className="relative w-full h-full">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${slide.filename}`}
                            alt={slide.alt}
                            fill
                            className={`object-contain rounded-lg ${className}`}
                            priority
                            sizes="(max-width: 768px) 100vw, 75vw"
                            onClick={() => setIsOpen && setIsOpen(true)}
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
