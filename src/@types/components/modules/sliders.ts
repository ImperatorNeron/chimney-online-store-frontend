interface MainSliderProps {
    thumbsSwiper: any;
    setSlideIndex?: (value: number) => void;
    items: ReadProductImageSchema[];
    setIsOpen?: (value: boolean) => void;
    initialSlideIndex?: number;
    className?: string;
}

interface MainThumbnailSliderProps {
    setThumbsSwiper: (value: any) => void;
    items: ReadProductImageSchema[];
    className?: string;
}

interface ModalItemProps {
    setIsOpen: (isOpen: boolean) => void;
    slideIndex: number;
    items: any[];
    thumbsSwiperModal: any;
    setThumbsSwiper: (value: any) => void;
}
