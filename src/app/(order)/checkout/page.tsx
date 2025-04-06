'use client'
import ContactInfoSection from '@/page-components/checkout/ContactInfoSection';
import DeliveryMethodSection from '@/page-components/checkout/DeliveryMethodSection';
import OrderSummary from '@/page-components/checkout/OrderSummary';
import PaymentMethodSection from '@/page-components/checkout/PaymentMethodSection';
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