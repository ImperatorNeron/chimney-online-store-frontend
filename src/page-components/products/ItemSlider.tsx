"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { items } from "@/constants/Slides";
import { useState } from "react";
import type SwiperType from "swiper";
import MainSlider from "./MainSlider";
import MainThumbnailSlider from "./MainThumbnailSlider";
import ModalItem from "./ModalItemView";

const ItemSlider = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [thumbsSwiperModal, setThumbsSwiperModal] = useState<SwiperType | null>(null);
    const [slideIndex, setSlideIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative h-96 pb-14">
            <MainSlider thumbsSwiper={thumbsSwiper} setSlideIndex={setSlideIndex} items={items} setIsOpen={setIsOpen} />
            <MainThumbnailSlider setThumbsSwiper={setThumbsSwiper} items={items} />

            {isOpen &&
                <ModalItem
                    setIsOpen={setIsOpen}
                    slideIndex={slideIndex}
                    items={items}
                    thumbsSwiperModal={thumbsSwiperModal}
                    setThumbsSwiper={setThumbsSwiperModal}
                />
            }
        </div>
    );
};

export default ItemSlider;