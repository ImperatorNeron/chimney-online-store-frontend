"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { orderService } from "@/api/services/order.service";
import { CreateOrderZodSchema, orderSchema } from "@/schemas/order";
import useUserData from "@/components/modules/profile/hooks/useUserData";
import { useAuthStore } from "@/store/auth.store";
import { NotificationService } from "@/services/notification.service";
import { useRouter } from "next/navigation";

export const useOrderForm = () => {
    const router = useRouter();
    const { user, loading, error } = useUserData(false);
    const { getValidToken } = useAuthStore.getState();

    const { register, handleSubmit, formState, reset } = useForm<CreateOrderZodSchema>({
        resolver: zodResolver(orderSchema)
    });


    useEffect(() => {
        if (user && !loading) {
            reset((prev) => ({
                ...prev,
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                patronymic: user.patronymic || "",
                phone_number: user.phone_number || "",
                email: user.email || "",
            }));
        }
    }, [user, loading, reset]);

    const onSubmit = async (data: CreateOrderZodSchema) => {
        const token = await getValidToken();
        try {
            if (token) {
                await orderService.createOrder(data, token);
            } else {
                await orderService.createOrder(data);
            }
            router.push("/");
            NotificationService.success("Дякуємо за замовлення");
        } catch (error: any) {
            NotificationService.error(error.message);
        }
    };

    return {
        formState,
        register,
        handleSubmit,
        onSubmit,
        user,
        loading,
        error,
    };
};