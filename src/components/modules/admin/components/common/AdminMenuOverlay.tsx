import OverlayHeader from '@/components/shared/OverlayHeader';
import Overlay from '@/components/ui/Overlay';
import Link from 'next/link';

interface AdminMenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminMenuOverlay({ isOpen, onClose }: AdminMenuOverlayProps) {
    return (
        <Overlay isOpen={isOpen} onClose={onClose} className="w-full lg:w-1/4">
            <OverlayHeader onClose={onClose} title={"Панель адміністратора"} />
            <nav className="mt-12 ml-12 flex flex-col space-y-4">
                <Link href="/admin-panel/messages" className="font-medium text-gray-600 hover:text-gray-900" onClick={onClose}>
                    Повідомлення
                </Link>
                <Link href="/admin-panel/orders" className="font-medium text-gray-600 hover:text-gray-900" onClick={onClose}>
                    Статус замовлень
                </Link>
                <Link href="/admin-panel/products" className="font-medium text-gray-600 hover:text-gray-900" onClick={onClose}>
                    Додати товар
                </Link>
                <Link href="/admin-panel/promotions" className="font-medium text-gray-600 hover:text-gray-900" onClick={onClose}>
                    Акції
                </Link>
            </nav>
        </Overlay>
    );
};