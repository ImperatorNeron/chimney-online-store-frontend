"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { slides } from "@/constants/Slides";

export default function BannerSlider() {
    return (
        <div className="h-full overflow-hidden rounded-2xl bg-white">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet !bg-zinc-400 !opacity-100 transition-all",
                    bulletActiveClass: "swiper-pagination-bullet-active !bg-slate-950 !scale-110",
                }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={slides.length > 1}
                className="h-[260px] sm:h-[320px] lg:h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full w-full">
                            <Image
                                src={slide.src}
                                alt={slide.alt}
                                fill
                                sizes="100vw"
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}