import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/thumbs';

export default function MainThumbnailSlider({
    setThumbsSwiper,
    items,
    className = "thumbnail-slider"
}: MainThumbnailSliderProps) {
    return (
        <div className="absolute top-1/2 left-2 z-10 h-[240px] w-[56px] -translate-y-1/2">
            <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                direction="vertical"
                spaceBetween={4}
                slidesPerView={4.05}
                watchSlidesProgress={true}
                className={`${className} h-full !flex !flex-col`}
                style={{ height: '100%' }}
            >
                {items.map((slide) => (
                    <SwiperSlide key={slide.id} className="!h-14">
                        <div className="w-[56px] h-14 relative cursor-pointer transition-opacity opacity-40 hover:opacity-100">
                            <div className="w-[56px] h-[56px] relative overflow-hidden">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${slide.filename}`}
                                    alt={slide.alt}
                                    fill
                                    className="object-cover rounded-lg border border-gray-500"
                                />
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
