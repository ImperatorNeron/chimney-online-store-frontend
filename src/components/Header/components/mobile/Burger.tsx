import Image from 'next/image';

export const Burger = ({ onOpen }: { onOpen: () => void }) => {
    return (
        <div className="lg:hidden flex items-center gap-4">
            <button onClick={onOpen} className="text-gray-600">
                <Image src="/icons/menu.png" alt="menu" width={24} height={24} />
            </button>
        </div>
    )
}
