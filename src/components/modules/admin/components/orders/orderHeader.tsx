import { ReadExtendedOrderSchema } from "@/api/types/types";
import { STATUS_OPTIONS } from "@/constants/orders";

export default function OrderHeader({ order }: { order: ReadExtendedOrderSchema }) {
    return (
        <div className="flex flex-col">
            <div className='flex gap-4 border-b-2'>
                <h2 className="text-lg font-semibold">Замовлення #{order.id}</h2>
            </div>
            <div className='flex gap-2 mt-2'>
                <span>Статус:</span>
                <span className='font-semibold'>
                    {STATUS_OPTIONS.find(s => s.value === order.status)?.label}
                </span>
            </div>
            <div className='flex gap-2'>
                <span>Замовник:</span>
                <span className='font-semibold'>{order.first_name} {order.last_name}</span>
            </div>
        </div>
    );
}