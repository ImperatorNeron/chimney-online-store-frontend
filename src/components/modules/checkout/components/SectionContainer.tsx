export default function SectionContainer({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`px-2 py-6 border-t sm:p-6 sm:rounded-xl bg-white sm:shadow-sm sm:border sm:border-gray-200 ${className}`}>
            {children}
        </div>
    )
};