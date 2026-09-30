export default function ContactItem({ icon, title, content }: {
    icon: React.ReactNode;
    title: string;
    content: React.ReactNode;
}) {
    return (
        <div className="flex items-center rounded-xl py-3 px-2 sm:p-6 gap-5 w-full max-w-sm lg:max-w-md" itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
            <div className="flex-shrink-0 p-3 bg-gray-100 rounded-lg">
                {icon}
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <div className="text-gray-600 text-base">
                    {content}
                </div>
            </div>
        </div>
    );
};