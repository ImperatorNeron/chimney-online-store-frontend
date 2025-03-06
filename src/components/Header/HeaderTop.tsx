import Image from "next/image";
import Link from "next/link";

export const HeaderTop = () => {
    return (
        <div className="bg-gray-100 text-gray-600 text-base py-2 hidden lg:block">
            <div className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
                <div className="flex gap-5">
                    <Link href="/contacts" className="hover:text-black">Контакти</Link>
                    <Link href="/order-info" className="hover:text-black">Доставка</Link>
                    <Link href="/faq" className="hover:text-black">Питання та відповіді</Link>
                </div>
                <div className="flex flex-row gap-2">
                    <div className="mr-4 flex items-center gap-1">
                        <Image
                            src="/icons/clock.png"
                            alt=""
                            width={16}
                            height={16}
                        />
                        Пн-Пт: 9:00-18:00
                    </div>
                    <div className="mr-4 font-semibold flex items-center gap-1">
                        <Image
                            src="/icons/phone-call.png"
                            alt=""
                            width={16}
                            height={16}
                        />
                        <Link href="tel:+380501234567">(050) 12-34-567</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};