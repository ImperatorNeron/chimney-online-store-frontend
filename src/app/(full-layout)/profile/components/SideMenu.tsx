import { UserIcon } from '@heroicons/react/24/outline';

interface MenuItem {
    id: number;
    title: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface SideMenuProps {
    activeSection: number;
    setActiveSection: (id: number) => void;
    menuItems: MenuItem[];
    username: string;
}

export default function SideMenu({ activeSection, setActiveSection, menuItems, username }: SideMenuProps) {

    return (
        <aside className="hidden md:block lg:w-80 p-6 border-r border-gray-200">
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-gray-600" />
                </div>
                <span className="font-semibold text-gray-700">{username}</span>
            </div>
            <nav>
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded transition-colors ${activeSection === item.id
                                        ? "bg-gray-100 text-gray-900 font-medium"
                                        : "hover:bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {Icon && <Icon className="h-5 w-5" />}
                                    <span>{item.title}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
