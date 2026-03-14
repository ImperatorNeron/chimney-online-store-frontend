import { ReadExtendedOrderSchema } from "@/api/types/types";
import OrderItem from "./OrderItem";

export default function OrderList({ orders }: { orders: ReadExtendedOrderSchema[] }) {
    return (
        <div className="flex flex-col gap-4">
            {orders.map(order => (
                <OrderItem key={order.id} order={order} />
            ))}
        </div>
    )
}