import Image from "next/image";
import Link from "next/link";

export default function PrimaryInformation() {
    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <div className="mr-4 font-semibold flex items-center gap-2">
                <Image
                    src="/icons/clock.png"
                    alt=""
                    width={16}
                    height={16}
                />
                Пн-Пт: 9:00-18:00
            </div>
            <div className="mr-4 font-semibold flex items-center gap-2">
                <Image
                    src="/icons/phone-call.png"
                    alt=""
                    width={16}
                    height={16}
                />
                <Link href="tel:+380501234567">(050) 12-34-567</Link>
            </div>
        </div>
    );
}