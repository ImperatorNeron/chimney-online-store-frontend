import Link from 'next/link';
import { Burger } from '../mobile/Burger';
import { DesktopMenu } from '../desktop/DesktopMenu';
import CartButton from './CartButton';


export const HeaderBottom = () => {
    return (
        <div>
            <div className="px-6 py-4 max-w-screen-2xl bg-white mx-auto">
                <div className="flex justify-between items-center w-full">
                    <Link href="/" className="text-xl font-bold text-gray-800 lg:ml-10 lg:mr-16">ChimneyHub</Link>
                    <DesktopMenu />
                    <div className='lg:hidden flex gap-5'>
                        <CartButton hint={false} />
                        <Burger />
                    </div>
                </div>
            </div>
        </div>
    );
}