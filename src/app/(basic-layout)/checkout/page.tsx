'use client'
import ContactInfoSection from '@/components/modules/checkout/components/ContactInfoSection';
import DeliveryMethodSection from '@/components/modules/checkout/components/DeliveryMethodSection';
import OrderSummary from '@/components/modules/checkout/components/OrderSummary';
import PaymentMethodSection from '@/components/modules/checkout/components/PaymentMethodSection';
import { useState } from 'react';


export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [deliveryMethod, setDeliveryMethod] = useState('nova-poshta');

    return (
        <>
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
        </>


    );
}