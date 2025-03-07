'use client';

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
            href="#"
            iconSrc="/icons/shopping-cart.png"
            alt="Кошик"
            count={0}
            countColor="bg-red-500"
            label="Кошик"
        />
    </div>
);

export default Actions;