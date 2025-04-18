'use client'
import ContactInfoSection from '@/components/modules/checkout/components/ContactInfoSection';
import DeliveryMethodSection from '@/components/modules/checkout/components/DeliveryMethodSection';
import OrderSummary from '@/components/modules/checkout/components/OrderSummary';
import PaymentMethodSection from '@/components/modules/checkout/components/PaymentMethodSection';
import { useEffect, useState } from 'react';


export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [deliveryMethod, setDeliveryMethod] = useState('nova-poshta');

    return (
        <div className='flex flex-col'>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">
                Оформлення замовлення
            </h1>
            <div className="flex flex-col lg:flex-row gap-2 sm:gap-8">
                <div className="lg:w-3/5 space-y-3">
                    <ContactInfoSection />
                    <DeliveryMethodSection
                        deliveryMethod={deliveryMethod}
                        setDeliveryMethod={setDeliveryMethod}
                    />
                    <PaymentMethodSection
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />
                </div>

                <div className="lg:w-2/5">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
}
