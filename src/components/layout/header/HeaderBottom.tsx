import Link from 'next/link';

import MobileHeader from '@/components/layout/header/MobileHeader';
import DesktopHeader from './DesktopHeader';


export default function HeaderBottom() {
    return (
        <div>
            <div className="px-6 py-4 max-w-screen-2xl bg-white mx-auto">
                <div className="flex justify-between items-center w-full">
                    <Link href="/" className="text-xl font-bold text-gray-800 lg:ml-10 lg:mr-16">ChimneyHub</Link>
                    <DesktopHeader />
                    <MobileHeader />
                </div>
            </div>
        </div>
    );
}