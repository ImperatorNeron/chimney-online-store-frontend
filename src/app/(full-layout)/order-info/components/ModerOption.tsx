export default function ModernOption({ title, icon, details, price }: { title: string; icon: React.ReactNode; details: string; price?: string }) {
    return (
        <div className="group flex items-start justify-between p-2 xs:p-5 transition-all hover:bg-gray-100 rounded-xl border border-gray-200">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">{icon}</div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">{details}</p>
                </div>
            </div>
            {price && <span className="text-base xs:text-lg font-medium text-gray-900 whitespace-nowrap">{price}</span>}
        </div>
    )
}