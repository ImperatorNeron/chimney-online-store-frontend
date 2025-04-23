import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { NotificationService } from "@/services/notification.service";
import { UserService } from "@/services/user.service";
import { useAuthStore } from "@/store/auth.store";
import { profileSchema, ProfileSchema } from "@/schemas/profile";


export function usePersonalDataForm(user: User) {
    const router = useRouter();
    const { getValidToken } = useAuthStore.getState();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: user.first_name ?? "",
            last_name: user.last_name ?? "",
            patronymic: user.patronymic ?? "",
            email: user.email ?? "",
            phone_number: user.phone_number ?? "",
        },
    });

    const onSubmit = async (data: ProfileSchema) => {
        const token = await getValidToken();
        if (!token) {
            router.push('/auth/login');
            return;
        }

        try {
            const response = await UserService.updateUser(data, token);

            if (!response.ok) {
                NotificationService.error('Виникла помилка, спробуйте ще раз');
            } else {
                NotificationService.success('Профіль успішно оновлено!');
                reset(data);
            }
        } catch {
            NotificationService.error('Виникла помилка, спробуйте ще раз');
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isSubmitting,
    };
}
