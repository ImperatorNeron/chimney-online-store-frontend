import { orderService } from '@/api/services/order.service';
import { LReadExtendedOrderSchema } from '@/api/types/types';
import useFetchData from '../common/useFetchData';


export default function useOrders(
    limit: number = 20,
    offset: number = 0,
    params?: {
        text?: string;
        field?: string;
        ordering?: string;
        status?: string;
        shipping_method?: string;
        payment_method?: string;
    },
) {
    const { data: orders, setData: setOrders, ...rest } = useFetchData<LReadExtendedOrderSchema>(
        (token) => orderService.getOrders(token, limit, offset, params),
        [limit, offset, params]
    );

    return { orders, setOrders, ...rest };
}
