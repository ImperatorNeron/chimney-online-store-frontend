'use client';

import { CartCounter } from "../../../../helpers/cartItemsCounter";
import NavIcon from "./NavIcon";

const Actions = () => (
    <div className="flex items-center gap-4 ml-4">
        <NavIcon
            href="/auth/login"
            iconSrc="/icons/person.png"
            alt="Увійти"
            label="Увійти"
        />
        <NavIcon
            href="#"
            iconSrc="/icons/heart.png"
            alt="Улюблене"
            count={0}
            countColor="bg-green-500"
            label="Улюблене"
        />
        <NavIcon
            href="/cart"
            iconSrc="/icons/shopping-cart.png"
            alt="Кошик"
            count={CartCounter()}
            countColor="bg-red-500"
            label="Кошик"
        />
    </div>
);

export default Actions;