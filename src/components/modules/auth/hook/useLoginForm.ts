import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { loginSchema, LoginSchema } from '@/schemas/login';
import useInputHandlers from '@/hooks/forms/useInputHandlers';

export default function useLoginForm() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [loginError, setLoginError] = useState("");

    const usernameHandlers = useInputHandlers(/^[a-zA-Z0-9_-]+$/);

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: { username: "", password: "" },
    });

    const onSubmit = async (data: LoginSchema) => {
        try {
            await login(data.username, data.password);
            router.push("/profile");
        } catch {
            setLoginError("Невірний логін або пароль");
        }
    };

    return {
        form,
        onSubmit,
        loginError,
        usernameHandlers
    };
}
