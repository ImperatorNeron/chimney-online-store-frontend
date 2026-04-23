"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { orderService } from '@/api/services/order.service';
import { ReadExtendedOrderSchema, LReadExtendedOrderSchema } from '@/api/types/types';

export const useOrderActions = (setOrders: React.Dispatch<React.SetStateAction<LReadExtendedOrderSchema>>) => {
    const router = useRouter();
    const { getValidToken } = useAuthStore();

    const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
    const [waybillNumber, _setWaybillNumber] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [discount, _setDiscount] = useState("0")

    const handleEdit = (order: ReadExtendedOrderSchema) => {
        setEditingOrderId(order.id);
        setWaybillNumber(order.waybill_number || '');
        setDiscount(order.price_discount)
        setSelectedStatus(order.status);
    };

    const setDiscount = (input: string | number) => {
        let value = typeof input === 'number' ? input.toString() : input;
        value = value
            .replace(/[^0-9.%\s]/g, '')
            .replace(/(\..*)\./g, '$1');
        if (value.includes('%')) {
            value = value.replace(/%/g, '') + '%';
        }
        value = value.replace(/^0+([1-9])/, '$1');
        _setDiscount(value);
    };

    const setWaybillNumber = (input: string) => {
        const filtered = input.replace(/[^a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9\-_\+=\*]/g, '').trim();
        _setWaybillNumber(filtered);
    };

    const handleSave = async (orderId: number, total_price: number) => {
        try {
            const token = await getValidToken();
            if (!token) return router.push('/auth/login');

            let price_discount = 0;
            if (discount.includes("%")) {
                const percent = parseFloat(discount.replace('%', '').replace(',', '.'));
                if (!isNaN(percent)) {
                    price_discount = Math.round((percent / 100) * total_price);
                }
            } else {
                const value = parseFloat(discount.replace(',', '.'));
                if (!isNaN(value)) {
                    price_discount = value;
                }
            }

            await orderService.updateOrderInfo(
                token,
                { waybill_number: waybillNumber, status: selectedStatus, price_discount: price_discount },
                orderId
            );

            setOrders(prev => {
                if (!prev || !('items' in prev) || !('pagination' in prev)) return prev;

                return {
                    ...prev,
                    items: prev.items.map(o =>
                        o.id === orderId
                            ? {
                                ...o,
                                waybill_number: waybillNumber,
                                status: selectedStatus,
                                price_discount: price_discount,
                                total_price: total_price,
                            }
                            : o
                    ),
                    pagination: prev.pagination,
                };
            });


            setEditingOrderId(null);
        } catch (err) {
            console.error(err instanceof Error ? err.message : 'Помилка оновлення');
        }
    };

    const handleCancel = () => setEditingOrderId(null);

    const toggleExpand = (orderId: number) => {
        setExpandedOrderId(prev => prev === orderId ? null : orderId);
    };

    return {
        editingOrderId,
        expandedOrderId,
        waybillNumber,
        selectedStatus,
        discount,
        setWaybillNumber,
        setSelectedStatus,
        setDiscount,
        handleEdit,
        handleSave,
        handleCancel,
        toggleExpand
    };
};