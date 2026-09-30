import { messageService, MessageStatus } from "@/api/services/message.service";
import { NotificationService } from "@/api/services/notification.service";
import { ChangeMessageStatusSchema } from "@/api/types/types";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useChangeMessageStatus({ onReload }: { onReload: () => Promise<void> }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { getValidToken } = useAuthStore();

    const changeStatus = async (id: number, status: MessageStatus) => {
        try {
            setLoading(true);
            setError(null);

            const token = await getValidToken();
            if (!token) return router.push('/auth/login');
            const payload: ChangeMessageStatusSchema = { status };

            await messageService.changeMessageStatus(token, id, payload);
            await onReload();
            NotificationService.success("Статус оновлено успішно")

        } catch (err) {
            console.error(err);
            setError("Не вдалося змінити статус повідомлення");
        } finally {
            setLoading(false);
        }
    };

    return {
        changeStatus,
        loading,
        error
    };
}
