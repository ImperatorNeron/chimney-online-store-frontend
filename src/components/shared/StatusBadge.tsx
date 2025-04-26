import { ArrowPathIcon, CheckCircleIcon, ClockIcon, TruckIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function StatusBadge({ status }: { status: string }) {
    const statusConfig = {
        pending: {
            text: 'Очікує',
            icon: ClockIcon,
            bg: 'bg-yellow-100',
            textColor: 'text-yellow-800',
        },
        processing: {
            text: 'В роботі',
            icon: ArrowPathIcon,
            bg: 'bg-blue-100',
            textColor: 'text-blue-800',
        },
        shipped: {
            text: 'Відправлено',
            icon: TruckIcon,
            bg: 'bg-indigo-100',
            textColor: 'text-indigo-800',
        },
        delivered: {
            text: 'Доставлено',
            icon: CheckCircleIcon,
            bg: 'bg-green-100',
            textColor: 'text-green-800',
        },
        cancelled: {
            text: 'Скасовано',
            icon: XCircleIcon,
            bg: 'bg-red-100',
            textColor: 'text-red-800',
        },
    } as const;

    const { text, icon: Icon, bg, textColor } =
        statusConfig[status as keyof typeof statusConfig];

    return (
        <div
            className={`inline-flex items-center gap-1.5 ${bg} ${textColor} px-3 py-1 rounded-full text-xs font-medium`}
        >
            <Icon className="w-4 h-4" />
            <span>{text}</span>
        </div>
    );
};