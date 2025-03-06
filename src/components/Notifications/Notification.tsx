import React from 'react';

const MessageNotification: React.FC<MessageNotificationProps> = ({ notification }) => {
    if (!notification) return null;

    return (
        <div
            className={
                `fixed bottom-5 left-5 p-4 rounded-md text-white z-50
                ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`
            }
        >
            {notification.message}
        </div>
    );
};

export default MessageNotification;