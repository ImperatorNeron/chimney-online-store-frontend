interface QuickLinkProps {
    href: string;
    label: string;
}

interface QuickLinksProps {
    links: Array<QuickLinkProps>;
}

interface ContactItem {
    icon: string;
    text: string;
    alt: string;
}

interface ContactInfoProps {
    items: ContactItem[];
}

interface SocialLink {
    href: string;
    icon: string;
    alt: string;
}

interface SocialLinksProps {
    links: SocialLink[];
}
