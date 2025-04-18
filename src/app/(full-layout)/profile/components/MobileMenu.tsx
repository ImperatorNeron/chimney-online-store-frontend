interface MenuItem {
    id: number;
    title: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface MobileMenuProps {
    activeSection: number;
    setActiveSection: (id: number) => void;
    menuItems: MenuItem[];
}

export default function MobileMenu({ activeSection, setActiveSection, menuItems }: MobileMenuProps) {
    return (
        <div className="flex md:hidden w-full bg-white p-3 justify-around">
            {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`flex flex-1 items-center justify-center p-2 transition-colors ${activeSection === item.id
                            ? "text-gray-900"
                            : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        {Icon && <Icon className="h-6 w-6" />}
                    </button>
                );
            })}
        </div>
    );
}
