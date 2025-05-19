"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { orderService } from '@/api/services/order.service';
import type { Order } from '@/api/types/types';
import { useAuthStore } from '@/store/auth.store';

export const useDiscountAction = (setOrders: React.Dispatch<React.SetStateAction<Order[]>>) => {
    const router = useRouter();
    const { getValidToken } = useAuthStore();

    const [discountState, setDiscountState] = useState<{
        isModalOpen: boolean;
        currentOrder: Order | null;
        inputValue: string;
        error: string;
    }>({
        isModalOpen: false,
        currentOrder: null,
        inputValue: '',
        error: ''
    });

    const validateDiscount = (value: string): boolean => {
        const numberValue = parseFloat(value);
        if (isNaN(numberValue)) {
            setDiscountState(prev => ({ ...prev, error: 'Некоректне значення знижки' }));
            return false;
        }
        if (numberValue < 0) {
            setDiscountState(prev => ({ ...prev, error: 'Знижка не може бути відʼємною' }));
            return false;
        }
        setDiscountState(prev => ({ ...prev, error: '' }));
        return true;
    };

    const handleOpenDiscount = (order: Order) => {
        setDiscountState({
            isModalOpen: true,
            currentOrder: order,
            inputValue: order.price_discount?.toString() || '0',
            error: ''
        });
    };

    const handleDiscountInput = (value: string) => {
        const sanitizedValue = value
            .replace(/[^0-9.]/g, '')
            .replace(/(\.\d{0,2}).*/g, '$1');
        
        setDiscountState(prev => ({
            ...prev,
            inputValue: sanitizedValue,
            error: validateDiscount(sanitizedValue) ? '' : prev.error
        }));
    };

    const applyOrderDiscount = async () => {
        if (!discountState.currentOrder || !validateDiscount(discountState.inputValue)) return;

        try {
            const token = await getValidToken();
            if (!token) return router.push('/auth/login');

            const updatedOrder = await orderService.updateOrderDiscount(
                token,
                discountState.currentOrder.id,
                parseFloat(discountState.inputValue)
            );

            setOrders(prev => prev.map(order => 
                order.id === updatedOrder.id ? {
                    ...order,
                    discount: updatedOrder.price_discount,
                    total_price: updatedOrder.total_price
                } : order
            ));

            setDiscountState(prev => ({ ...prev, isModalOpen: false }));
        } catch (err) {
            setDiscountState(prev => ({
                ...prev,
                error: 'Помилка при збереженні знижки'
            }));
        }
    };

    return {
        isDiscountModalOpen: discountState.isModalOpen,
        discountInput: discountState.inputValue,
        discountError: discountState.error,
        currentDiscountedOrder: discountState.currentOrder,
        openDiscountModal: handleOpenDiscount,
        handleDiscountInputChange: handleDiscountInput,
        applyDiscount: applyOrderDiscount,
        closeDiscountModal: () => setDiscountState(prev => ({ ...prev, isModalOpen: false }))
    };
};