import { useEffect } from "react";
import MainSlider from "./MainSlider"
import MainThumbnailSlider from "./MainThumbnailSlider"
import CloseButton from "@/components/ui/CloseButton";

interface ModalItemProps {
    setIsOpen: (isOpen: boolean) => void;
    slideIndex: number;
    items: any[];
    thumbsSwiperModal: any;
    setThumbsSwiper: (value: any) => void;
    uniqueSlug: string
}

export default function SliderZoomView({ setIsOpen, slideIndex, items, thumbsSwiperModal, setThumbsSwiper, uniqueSlug }: ModalItemProps) {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 px-4 "
            onClick={() => setIsOpen(false)}>
            <div className="relative w-full max-w-[500px] md:max-w-none md:w-5/6 h-[80vh] min-h-[300px] max-w-5xl bg-gray-50 rounded-xl" onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={() => setIsOpen(false)} />
                <MainSlider
                    thumbsSwiper={thumbsSwiperModal && !thumbsSwiperModal.destroyed ? thumbsSwiperModal : null}
                    initialSlideIndex={slideIndex}
                    items={items}
                    className=" rounded-xl"
                    uniqueSlug={uniqueSlug}
                />
                <MainThumbnailSlider setThumbsSwiper={setThumbsSwiper} items={items} uniqueSlug={uniqueSlug} />
            </div>
        </div>
    )
}