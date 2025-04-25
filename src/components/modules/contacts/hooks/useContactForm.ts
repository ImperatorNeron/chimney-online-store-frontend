"use client";
import { NotificationService } from "@/services/notification.service";
import { useForm } from "react-hook-form";
import { messageSchema, MessageSchema } from "@/schemas/message";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageService } from "@/api/services/message.service";

export default function useContactForm() {
    const { register, handleSubmit, formState, reset } = useForm<MessageSchema>({
        resolver: zodResolver(messageSchema),
    });

    const onSubmit = async (message: MessageSchema) => {
        try {
            await messageService.createMessage(message);
            reset();
            NotificationService.success('Повідомлення успішно відправлено!')
        } catch (error: any) {
            NotificationService.error(error.message)
        }
    };

    return { register, handleSubmit, formState, onSubmit };
};
