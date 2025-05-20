import { orderService } from '@/api/services/order.service';
import { ReadOrderResponseData } from '@/api/types/types';
import useFetchData from '../common/useFetchData';


export default function useOrders() {
    const { data: orders, setData: setOrders, ...rest } = useFetchData<ReadOrderResponseData>(
        (token) => orderService.getOrders(token),
        []
    );

    return { orders, setOrders, ...rest };
}