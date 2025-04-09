import OpenCartButton from "@/components/modules/cart/components/OpenCartButton";
import BurgerButton from "@/components/modules/menu/components/BurgerButton";

export default function MobileHeader() {
    return (
        <div className='lg:hidden flex gap-5'>
            <OpenCartButton hint={false} />
            <BurgerButton />
        </div>
    );
};

