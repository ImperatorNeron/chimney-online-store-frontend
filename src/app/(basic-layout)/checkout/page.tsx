"use client";

import OrderSummary from "@/components/modules/checkout/components/OrderSummary";
import ContactInfoSection from "@/components/modules/checkout/components/ContactInfoSection";
import DeliveryMethodSection from "@/components/modules/checkout/components/DeliveryMethodSection";
import PaymentMethodSectionSelect from "@/components/modules/checkout/components/PaymentMethodSection";
import { useOrderForm } from "@/components/modules/checkout/hooks/useOrderForm";

export default function OrderPage() {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        user,
        loading,
        error,
    } = useOrderForm();

    return (
        <div className="space-y-8 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center md:text-left">
                Оформлення замовлення
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-full flex flex-col gap-4">
                    <ContactInfoSection
                        errors={errors}
                        register={register}
                        user={user}
                        loading={loading}
                        error={error}
                    />
                    <DeliveryMethodSection errors={errors} register={register} />
                    <PaymentMethodSectionSelect errors={errors} register={register} />
                </div>
                <div className="lg:min-w-[450px] lg:max-w-[450px]">
                    <OrderSummary isSubmitting={isSubmitting} />
                </div>
            </form>
        </div>
    );
}