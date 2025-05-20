'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from "@/store/auth.store";

interface UseDeleteItemProps<T> {
    onReload: () => Promise<void>;
    onAfterDelete?: () => void;
    deleteService: (token: string, id: T) => Promise<void>;
    confirmationMessage: string;
    errorMessage: string;
}

export default function useDeleteItem<T>(
    props: UseDeleteItemProps<T>
) {
    const {
        onReload,
        onAfterDelete,
        deleteService,
        confirmationMessage,
        errorMessage
    } = props;

    const router = useRouter();
    const { getValidToken } = useAuthStore();
    const [deletingId, setDeletingId] = useState<T | null>(null);

    const handleDelete = async (id: T) => {
        if (!window.confirm(confirmationMessage)) return;

        setDeletingId(id);

        try {
            const token = await getValidToken();
            if (!token) return router.push('/auth/login');

            await deleteService(token, id);
            await onReload();

            onAfterDelete?.();
        } catch (error) {
            console.error(`${errorMessage}:`, error);
            alert(error instanceof Error ? error.message : errorMessage);
        } finally {
            setDeletingId(null);
        }
    };

    return {
        handleDelete,
        deletingId
    };
}