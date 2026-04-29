import Link from 'next/link';
import Image from 'next/image';

import MobileHeader from '@/components/layout/header/MobileHeader';
import DesktopHeader from './DesktopHeader';


export default function HeaderBottom() {
    return (
        <div>
            <div className="px-6 py-4 max-w-screen-2xl bg-white mx-auto">
                <div className="flex justify-between items-center w-full">
                    <Link href="/" className="lg:ml-10 lg:mr-16 shrink-0">
                        <Image
                            src="/images/logo.webp"
                            alt="Димок"
                            width={200}
                            height={60}
                            className="h-full max-h-[48px] w-auto"
                            priority
                        />
                    </Link>
                    <DesktopHeader />
                    <MobileHeader />
                </div>
            </div>
        </div>
    );
}