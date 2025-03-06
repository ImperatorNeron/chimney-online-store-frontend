"use client";
import PYDANTIC_ERROR_MESSAGES from "@/page-components/contacts/constants/pydantic";
import { createMessage } from "@/services/messagesService";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const useContactForm = (onSuccess: (notification: NotificationProps | null) => void) => {
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
                onSuccess({
                    type: 'success',
                    message: 'Повідомлення успішно відправлено!'
                });
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
            const errorMessage = error.response?.data?.message || 'Сталася помилка при відправці';
            onSuccess({
                type: 'error',
                message: errorMessage
            });
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                onSuccess(null);
            }, 5000);
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

export default useContactForm;