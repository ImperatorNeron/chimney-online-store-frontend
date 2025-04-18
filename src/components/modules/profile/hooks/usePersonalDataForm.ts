import { NotificationService } from "@/services/notification.service";
import { UserService } from "@/services/user.service";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function usePersonalDataForm(user: User) {
    const initialData = {
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        patronymic: user.patronymic || '',
        email: user.email || '',
        phone: user.phone_number || ''
    };

    const [formData, setFormData] = useState<PersonalData>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { getValidToken } = useAuthStore.getState();

    const handleChange = (field: keyof PersonalData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const token = await getValidToken()

        if (!token) {
            setIsLoading(false);
            router.push('/auth/login');
            return;
        }

        try {
            const response = await UserService.updateUser(formData, token)

            if (!response.ok) {
                NotificationService.error('Виникла помилка, спробуйте ще раз');
                return
            }
            NotificationService.success('Профіль успішно оновлено!');
        } catch {
            NotificationService.error('Виникла помилка, спробуйте ще раз');
        } finally {
            setIsLoading(false);
        }
    };

    return { formData, isLoading, handleChange, handleSubmit };
}
