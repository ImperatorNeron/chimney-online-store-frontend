import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/store/auth.store';
import { loginSchema, LoginSchema } from '@/schemas/login';
import { NotificationService } from '@/services/notification.service';

export default function useLoginForm() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);


    const { register, handleSubmit, formState } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: { username: "", password: "" },
    });

    const onSubmit = async (data: LoginSchema) => {
        try {
            await login(data.username, data.password);
            router.push("/profile/me");
        } catch (error: any) {
            NotificationService.error(error.message);
        }
    };

    return { register, handleSubmit, formState, onSubmit };
};
