import { ReadExtendedOrderSchema } from '@/api/types/types';
import Link from 'next/link';

export default function OrderMetaInfo({ order }: { order: ReadExtendedOrderSchema }) {
    return (
        <>
            {order.phone_number && (
                <div className="flex gap-2">
                    <span>Телефон:</span>
                    <Link href={`tel:${order.phone_number}`} className="text-blue-600 hover:text-blue-800 underline">
                        {order.phone_number}
                    </Link>
                </div>
            )}
            <div className="flex gap-2 text-sm text-gray-500">
                <span>Дата замовлення:</span>
                <span>
                    {new Date(order.created_at).toLocaleDateString('uk-UA', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </span>
            </div>
        </>
    );
}