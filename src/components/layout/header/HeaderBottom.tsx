import Link from 'next/link';
import Image from 'next/image';

import MobileHeader from '@/components/layout/header/MobileHeader';
import DesktopHeader from './DesktopHeader';


export default function HeaderBottom() {
    return (
        <div>
            <div className="px-6 max-w-screen-2xl bg-white mx-auto h-[72px] flex items-center">
                <div className="flex justify-between items-center w-full">
                    <Link
                        href="/"
                        className="lg:ml-10 lg:mr-16 shrink-0 w-[150px] h-[72px] relative"
                    >
                        <div className="absolute inset-0 overflow-hidden">
                            <Image
                                src="/images/logo.webp"
                                alt="Димок"
                                fill
                                className="object-contain scale-[1.65]"
                                priority
                            />
                        </div>
                    </Link>
                    <DesktopHeader />
                    <MobileHeader />
                </div>
            </div>
        </div>
    );
}