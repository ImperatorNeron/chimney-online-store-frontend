import type { Swiper } from 'swiper';
import { Dispatch, SetStateAction } from 'react';

export interface SlideItem {
    id: string | number;
    src: string;
    alt: string;
    thumbnail: string;
}

export interface MainSliderProps {
    thumbsSwiper: Swiper | null;
    setSlideIndex?: Dispatch<SetStateAction<number>>;
    items: SlideItem[];
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
    initialSlideIndex?: number;
}

export interface ThumbnailSliderProps {
    setThumbsSwiper: Dispatch<SetStateAction<Swiper | null>>;
    items: SlideItem[];
    className?: string;
    slidesPerView?: number;
    spaceBetween?: number;
}

export interface ModalSliderProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    slideIndex: number;
    items: SlideItem[];
    thumbsSwiperModal: Swiper | null;
    setThumbsSwiperModal: Dispatch<SetStateAction<Swiper | null>>;
}