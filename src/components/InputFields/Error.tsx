const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div
            className="flex items-center ml-1 mt-2"
            role="alert"
            aria-live="polite"
        >
            <svg
                className="w-4 h-4 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
            >
                <circle cx="12" cy="12" r="12" fill="#DC2626" />
                <path
                    d="M12 13.5C12.4142 13.5 12.75 13.1642 12.75 12.75V7.5C12.75 7.08579 12.4142 6.75 12 6.75C11.5858 6.75 11.25 7.08579 11.25 7.5V12.75C11.25 13.1642 11.5858 13.5 12 13.5Z"
                    fill="white"
                />
                <path
                    d="M12 17.25C12.6213 17.25 13.125 16.7463 13.125 16.125C13.125 15.5037 12.6213 15 12 15C11.3787 15 10.875 15.5037 10.875 16.125C10.875 16.7463 11.3787 17.25 12 17.25Z"
                    fill="white"
                />
            </svg>

            <span className="ml-2 text-sm font-medium text-red-600">{message}</span>
        </div>
    );
};

export default ErrorMessage;