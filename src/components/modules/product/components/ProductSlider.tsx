"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { useState } from "react";
import type SwiperType from "swiper";
import MainSlider from "./MainSlider";
import MainThumbnailSlider from "./MainThumbnailSlider";
import SliderZoomView from "./SliderZoomView";

export default function ProductSlider({ images }: { images: ReadProductImageSchema[] }) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [thumbsSwiperModal, setThumbsSwiperModal] = useState<SwiperType | null>(null);
    const [slideIndex, setSlideIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative h-96 lg:h-full">
            <MainSlider thumbsSwiper={thumbsSwiper} setSlideIndex={setSlideIndex} items={images} setIsOpen={setIsOpen} />
            <MainThumbnailSlider setThumbsSwiper={setThumbsSwiper} items={images} />

            {isOpen &&
                <SliderZoomView
                    setIsOpen={setIsOpen}
                    slideIndex={slideIndex}
                    items={images}
                    thumbsSwiperModal={thumbsSwiperModal}
                    setThumbsSwiper={setThumbsSwiperModal}
                />
            }
        </div>
    );
};