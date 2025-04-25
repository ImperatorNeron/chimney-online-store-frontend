import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { NotificationService } from "@/services/notification.service";
import { registrationSchema, RegistrationSchema } from "@/schemas/registration";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export default function useRegisterForm() {
    const router = useRouter();
    const registration = useAuthStore((state) => state.register);

    const {
        register,
        handleSubmit,
        formState,
    } = useForm<RegistrationSchema>({
        resolver: zodResolver(registrationSchema),
    });

    const onSubmit = async (data: RegistrationSchema) => {
        try {
            await registration(data);
            NotificationService.success("Реєстрація пройшла успішно");
            router.push("/profile");
        } catch (error: any) {
            NotificationService.error(error.message);
        }
    };

    return {
        register,
        handleSubmit,
        formState,
        onSubmit,
    };
}
