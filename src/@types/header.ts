interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

type MobileMenuHeaderProps = {
    onClose: () => void;
};

interface NavIconProps {
    href: string;
    iconSrc: string;
    alt: string;
    count?: number;
    countColor?: string;
    label: string;
}

type NavItemProps = {
    href: string;
    iconSrc: string;
    alt: string;
    label: string;
    count?: number;
    countColor?: string;
    onClose: () => void;
};