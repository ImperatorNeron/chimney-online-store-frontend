import { ChevronDownIcon } from "@heroicons/react/24/solid";


export default function FormSelect({ id, register, options, icon: Icon, }: { id: string, register: any, options: { value: string, label: string }[], icon: React.ElementType }) {
    return (
        <div className="relative w-full">
            <Icon className="w-10 h-5 text-gray-400 absolute top-4 left-1 border-r-2" />
            <select
                id={id}
                {...register}
                className="appearance-none bg-gray-50 w-full p-3 pl-[55px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDownIcon
                className="w-5 h-5 text-gray-400 absolute right-3 top-4 pointer-events-none"
            />
        </div>
    );
};