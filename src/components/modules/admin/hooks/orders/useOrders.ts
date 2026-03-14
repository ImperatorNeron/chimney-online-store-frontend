import { orderService } from '@/api/services/order.service';
import { LReadExtendedOrderSchema } from '@/api/types/types';
import useFetchData from '../common/useFetchData';


export default function useOrders(limit: number = 20, offset: number = 0) {
    const { data: orders, setData: setOrders, ...rest } = useFetchData<LReadExtendedOrderSchema>(
        (token) => orderService.getOrders(token, limit, offset),
        [limit, offset]
    );

    return { orders, setOrders, ...rest };
}