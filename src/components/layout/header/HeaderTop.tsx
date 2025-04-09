import PrimaryInformation from "@/components/shared/PrimaryInformation";
import Link from "next/link";

export default function HeaderTop() {
    return (
        <div className="bg-gray-100 text-gray-600 text-base py-2 hidden lg:block">
            <div className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
                <div className="flex gap-5">
                    <Link href="/contacts" className="hover:text-black">Контакти</Link>
                    <Link href="/order-info" className="hover:text-black">Доставка</Link>
                    <Link href="/faq" className="hover:text-black">Питання та відповіді</Link>
                </div>
                <PrimaryInformation />
            </div>
        </div>
    );
};