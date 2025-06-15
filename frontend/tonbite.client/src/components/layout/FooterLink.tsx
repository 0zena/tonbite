import { Icon } from "../icon/Icon";

interface FooterLinkProps {
    to: string;
    icon: string;
    text: string;
}

export const FooterLink = (props: FooterLinkProps) => {
    return (
        <a href={props.to}
           target="_blank"
           rel="noopener noreferrer"
           className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors max-sm:text-xs">
            <Icon icon={props.icon} />
            <span>{props.text}</span>
        </a>
    );
};
