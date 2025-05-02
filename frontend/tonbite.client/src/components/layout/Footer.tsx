import { Icons } from "../../utils";
import { FooterLink } from "./FooterLink";

export const Footer = () => {
    return (
        <footer className="text-white py-6">
            <div className="mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4 max-sm:flex-col">
                        <FooterLink to="https://tonscan.org/" icon={Icons.LINK} text="TONScan" />
                        <FooterLink to="https://github.com/0zena/tonbite" icon={Icons.GITHUB} text="Source Code" />
                        <FooterLink to="/report" icon={Icons.REPORT} text="Report Problem" />
                    </div>
                    <p className="text-sm text-gray-400 max-sm:text-xs">
                        © 2025 Tonbite. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
