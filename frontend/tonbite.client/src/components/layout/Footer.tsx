import { Icon } from "../icon/Icon";
import { Icons } from "../../utils";

export const Footer = () => {
    return (
        <footer className="text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <a href="https://tonscan.org/" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                            <Icon icon={Icons.LINK} />
                            <span>TONScan</span>
                        </a>
                        <a href="https://github.com/0zena/tonbite" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                            <Icon icon={Icons.GITHUB} />
                            <span>Source Code</span>
                        </a>
                    </div>
                    <p className="text-sm text-gray-400">
                        © 2025 Tonbite. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
