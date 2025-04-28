import { Icon } from "../icon/Icon.tsx";

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    color: 'blue' | 'purple' | 'pink';
    variant?: 'gradient' | 'grey';
}

const colorClasses = {
    blue: {
        gradient: 'border-blue-500/20 hover:border-blue-500/40 text-blue-400 bg-gradient-to-br from-blue-500/10 to-purple-500/10',
        grey: 'border-blue-500/20 hover:border-blue-500/40 text-blue-400 bg-zinc-800/50'
    },
    purple: {
        gradient: 'border-purple-500/20 hover:border-purple-500/40 text-purple-400 bg-gradient-to-br from-purple-500/10 to-pink-500/10',
        grey: 'border-purple-500/20 hover:border-purple-500/40 text-purple-400 bg-zinc-800/50'
    },
    pink: {
        gradient: 'border-pink-500/20 hover:border-pink-500/40 text-pink-400 bg-gradient-to-br from-pink-500/10 to-blue-500/10',
        grey: 'border-pink-500/20 hover:border-pink-500/40 text-pink-400 bg-zinc-800/50'
    }
};

export const FeatureCard = ({ icon, title, description, color, variant = 'gradient' }: FeatureCardProps) => {
    return (
        <div className={`p-6 rounded-xl backdrop-blur-sm border ${colorClasses[color][variant]} transition-all duration-300`}>
            <div className="flex items-center space-x-2 mb-2">
                <Icon icon={icon} />
                <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <p className="text-white/80">
                {description}
            </p>
        </div>
    );
};