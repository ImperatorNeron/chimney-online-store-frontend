import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { NotificationService } from "@/services/notification.service";
import { useAuthStore } from "@/store/auth.store";
import { profileSchema, ProfileSchema } from "@/schemas/profile";
import { userService } from "@/api/services/user.service";


export function usePersonalDataForm(user: User) {
    const router = useRouter();
    const { getValidToken } = useAuthStore.getState();

    const {
        register,
        handleSubmit,
        formState,
        reset,
    } = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: user.first_name ?? "",
            last_name: user.last_name ?? "",
            patronymic: user.patronymic ?? "",
            email: user.email ?? "",
            phone_number: user.phone_number ?? "",
            password: user.password ?? "",
            confirm_password: user.confirm_password ?? ""
        },
    });

    const onSubmit = async (data: ProfileSchema) => {
        const token = await getValidToken();
        if (!token) {
            router.push('/auth/login');
            return;
        }

        try {
            await userService.update(data, token);
            NotificationService.success('Профіль успішно оновлено!');
            reset(data);
        } catch (error: any) {
            NotificationService.error(error.message);
        }
    };

    return {
        register,
        handleSubmit,
        formState,
        onSubmit
    };
}
