"use client";
import { NotificationService } from "@/helpers/notification";
import PYDANTIC_ERROR_MESSAGES from "@/page-components/contacts/constants/pydantic";
import { createMessage } from "@/services/messagesService";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function useContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, setError, formState, reset } = useForm<FormData>({
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsLoading(true);
        try {
            const response = await createMessage(data);
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
