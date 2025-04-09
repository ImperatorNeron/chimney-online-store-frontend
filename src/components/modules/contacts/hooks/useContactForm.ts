"use client";
import { NotificationService } from "@/services/notification.service";
import PYDANTIC_ERROR_MESSAGES from "@/components/modules/contacts/constants/pydantic";
import { messageService } from "@/services/message.service";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function useContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setError, formState, reset } = useForm<Message>({
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<Message> = async (data) => {
        setIsLoading(true);
        try {
            const response = await messageService.createMessage(data);
            if (response === true) {
                reset();
                NotificationService.success('Повідомлення успішно відправлено!')
            } else {
                response.forEach((error: any) => {
                    setError(error.field, {
                        type: 'manual',
                        message: PYDANTIC_ERROR_MESSAGES[error.field]?.[error.errorType] ||
                            PYDANTIC_ERROR_MESSAGES.general[error.errorType] ||
                            'Неправильне заповнення поля'
                    });
                });
            }

        } catch (error: any) {
            NotificationService.success('Сталася помилка при відправці!')
        } finally {
            setIsLoading(false);
        }
    };

    return {
        register,
        handleSubmit,
        formState,
        onSubmit,
        isLoading,
    };
};
