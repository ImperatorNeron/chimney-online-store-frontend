'use client'

import { useState, useEffect, useMemo } from 'react';
import { messageService } from "@/api/services/message.service";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from 'next/navigation';
import useUserData from "@/components/modules/profile/hooks/useUserData";
import { paths } from '@/api/types/openapi';

type ReadMessages = paths["/api/v1/messages/"]["get"]["responses"]["200"]["content"]["application/json"]["data"]

export default function useMessages() {
    const router = useRouter();
    const { getValidToken } = useAuthStore.getState();
    const { user } = useUserData();
    const userValue = useMemo(() => user, [user]);

    const [messages, setMessages] = useState<ReadMessages>();
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [currentLimit] = useState(20);
    const [currentOffset, setCurrentOffset] = useState(0);

    const loadMessages = async () => {
        try {
            setLoading(true);
            const token = await getValidToken();
            if (!token) {
                router.push('/auth/login');
                return;
            }
            const data = await messageService.getMessages(token, currentLimit, currentOffset);
            setMessages(data);
        } catch (error) {
            console.error('Помилка завантаження:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userValue) {
            loadMessages();
        }
    }, [userValue, currentOffset, currentLimit]);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Ви впевнені, що хочете видалити це повідомлення?')) return;

        try {
            setDeletingId(id);
            const token = await getValidToken();
            if (!token) {
                router.push('/auth/login');
                return;
            }

            await messageService.deleteMessage(token, id);

            if (messages) {
                const updatedItems = messages.items.filter(item => item.id !== id);
                const updatedTotal = messages.pagination.total - 1;

                setMessages({
                    items: updatedItems,
                    pagination: {
                        ...messages.pagination,
                        total: updatedTotal
                    }
                });

                if (updatedItems.length === 0 && currentOffset > 0) {
                    setCurrentOffset(prev => Math.max(0, prev - currentLimit));
                }
            }
        } catch (error) {
            console.error('Помилка видалення:', error);
            alert('Не вдалося видалити повідомлення');
        } finally {
            setDeletingId(null);
        }
    };

    const handleNextPage = () => {
        setCurrentOffset(prev => prev + currentLimit);
    };

    const handlePrevPage = () => {
        setCurrentOffset(prev => Math.max(0, prev - currentLimit));
    };

    return {
        messages,
        loading,
        deletingId,
        currentLimit,
        currentOffset,
        handleDelete,
        handleNextPage,
        handlePrevPage
    };
}