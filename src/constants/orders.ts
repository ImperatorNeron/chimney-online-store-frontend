export const STATUS_OPTIONS = [
    { value: 'pending', label: 'Нове замовлення' },
    { value: 'processing', label: 'Обробляється' },
    { value: 'shipped', label: 'Відправлено' },
    { value: 'delivered', label: 'Доставлено' },
    { value: 'cancelled', label: 'Скасовано' },
] as const;

export const SHIPPING_METHODS = {
    nova_poshta: 'Нова Пошта',
    ukrposhta: 'Укрпошта',
    courier: 'Доставка по Волині'
} as const;

export const PAYMENT_METHODS = {
    cash: 'Оплата при отриманні',
    card: 'Оплата на картку',
    online: 'Оплатили онлайн (LiqPay)'
} as const;

const formInputStyle = "w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500";
const methodBadgeStyle = "inline-block px-3 py-2 rounded-md text-base font-semibold text-gray-800 bg-gray-100 border border-gray-300";
const editButtonStyle = "mb-6 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors";

export const styles = {
    formInput: formInputStyle,
    methodBadge: methodBadgeStyle,
    editButton: editButtonStyle,
}