interface NotificationProps {
    type: 'success' | 'error';
    message: string;
}

interface MessageNotificationProps {
    notification: NotificationProps | null;
}