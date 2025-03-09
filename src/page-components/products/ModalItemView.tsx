import { useEffect } from "react";
import { CloseButton } from "./CloseButton"
import MainSlider from "./MainSlider"
import MainThumbnailSlider from "./MainThumbnailSlider"
import { Swiper as SwiperClass } from 'swiper'


const ModalItem: React.FC<ModalItemProps> = ({ setIsOpen, slideIndex, items, thumbsSwiperModal, setThumbsSwiper }) => {

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
            <div className="relative w-full max-w-[500px] md:max-w-none md:w-4/6 h-[50vh] md:h-[80vh] max-h-[600px] min-h-[300px] max-w-5xl bg-gray-50 pb-16 rounded-xl" onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={() => setIsOpen(false)} />
                <MainSlider
                    thumbsSwiper={thumbsSwiperModal && !thumbsSwiperModal.destroyed ? thumbsSwiperModal : null}
                    initialSlideIndex={slideIndex}
                    items={items}
                />
                <MainThumbnailSlider setThumbsSwiper={setThumbsSwiper} items={items} />
            </div>
        </div>
    )
}

export default ModalItem;