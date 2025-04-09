interface MainSliderProps {
    thumbsSwiper: any;
    setSlideIndex?: (value: number) => void;
    items: SlideItem[];
    setIsOpen?: (value: boolean) => void;
    initialSlideIndex?: number;
    className?: string;
}

interface MainThumbnailSliderProps {
    setThumbsSwiper: (value: any) => void;
    items: SlideItem[];
    className?: string;
}

interface ModalItemProps {
    setIsOpen: (isOpen: boolean) => void;
    slideIndex: number;
    items: any[];
    thumbsSwiperModal: any;
    setThumbsSwiper: (value: any) => void;
}

interface SlideItem {
    id: string | number;
    src: string;
    alt: string;
    thumbnail: string;
}