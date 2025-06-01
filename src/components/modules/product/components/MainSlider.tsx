import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import Image from 'next/image';
import { ReadImages } from "@/api/types/types";


interface MainSliderProps {
    thumbsSwiper: any;
    setSlideIndex?: (value: number) => void;
    items: ReadImages;
    setIsOpen?: (value: boolean) => void;
    initialSlideIndex?: number;
    className?: string;
    uniqueSlug: string;
}

export default function MainSlider({
    thumbsSwiper,
    uniqueSlug,
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
            loop={items.length > 1}
            initialSlide={initialSlideIndex}
            className="w-full h-full rounded-xl"
            onSlideChange={(swiper) => setSlideIndex && setSlideIndex(swiper.realIndex)}
        >
            {items.map((slide) => (
                <SwiperSlide key={slide.id}>
                    <div className="relative w-full h-full">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGES}uploads/${uniqueSlug}/${slide.filename}`}
                            alt={slide.alt ?? ""}
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
