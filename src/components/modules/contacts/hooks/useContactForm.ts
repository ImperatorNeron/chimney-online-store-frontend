"use client";
import { NotificationService } from "@/services/notification.service";
import { messageService } from "@/services/message.service";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { messageSchema, MessageSchema } from "@/schemas/message";
import { zodResolver } from "@hookform/resolvers/zod";
import useInputHandlers from "@/hooks/forms/useInputHandlers";

export default function useContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState, reset } = useForm<MessageSchema>({
        resolver: zodResolver(messageSchema),
    });

    const userNameHandlers = useInputHandlers(/^[A-Za-zА-Яа-яІіЇїЄє'’`\-\s]+$/);
    const phoneNumberHandlers = useInputHandlers(/^\d+$/);

    const onSubmit: SubmitHandler<MessageSchema> = async (data) => {
        setIsLoading(true);
        try {
            const response = await messageService.createMessage(data);
            if (response === true) {
                reset();
                NotificationService.success('Повідомлення успішно відправлено!')
            }
        } catch (error: any) {
            NotificationService.error('Сталася помилка при відправці!')
        } finally {
            setIsLoading(false);
        }
    };

    return {
        register,
        handleSubmit,
        formState,
        onSubmit,
        userNameHandlers,
        phoneNumberHandlers,
        isLoading,
    };
};
