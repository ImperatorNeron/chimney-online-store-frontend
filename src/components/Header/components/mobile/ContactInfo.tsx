import Image from "next/image";
import type { FC } from "react";

export const ContactInfo: FC = () => (
    <div className="space-y-4 text-gray-700">
        <div className="flex items-center gap-3">
            <Image
                src="/icons/clock.png"
                alt="Години роботи"
                width={20}
                height={20}
                className="w-5 h-5 flex-shrink-0"
            />
            <span>Пн-Пт: 9:00-18:00</span>
        </div>
        <div className="flex items-center gap-3 font-medium">
            <Image
                src="/icons/phone-call.png"
                alt="Телефон"
                width={20}
                height={20}
                className="w-5 h-5 flex-shrink-0"
            />
            <span>(050) 12-34-567</span>
        </div>
    </div>
);