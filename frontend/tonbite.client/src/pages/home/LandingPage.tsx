import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import Tonbite from "../../assets/tonbite.svg";
import { Icons } from "../../utils";
import { FeatureCard } from "../../components";

export const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
            <div className="flex flex-col items-center space-y-4">
                <img src={Tonbite} alt="Tonbite Logo" className="w-32 h-32 drop-shadow-[0_0_15px_rgba(0,152,234,0.5)]" />
                <h1 className="text-4xl font-bold text-gradient">Welcome to Tonbite</h1>
                <p className="text-xl text-center max-w-2xl text-white/90">
                    The future of decentralized education is here. Buy, create, and sell online courses using TON blockchain and TON coins.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
                <FeatureCard
                    icon={Icons.SETTINGS}
                    title="Modern Payments"
                    description="Experience secure, transparent, and instant transactions using TON blockchain. No intermediaries, no hidden fees."
                    color="blue"
                />
                <FeatureCard
                    icon={Icons.CREATE}
                    title="Create & Sell"
                    description="Share your knowledge and earn TON coins directly. Full control over your content and earnings."
                    color="purple"
                />
                <FeatureCard
                    icon={Icons.HOME}
                    title="Learn & Grow"
                    description="Access high-quality courses and pay securely with TON coins. Your education, your way."
                    color="pink"
                />
            </div>

            <div className="flex flex-col items-center space-y-4">
                <div className="flex space-x-4">
                    <Button 
                        as={Link} 
                        href="/register" 
                        color="primary" 
                        size="lg"
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                    >
                        Get Started
                    </Button>
                </div>
                <p className="text-sm text-white/70">
                    Already have an account? <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">Sign in</Link>
                </p>
            </div>
        </div>
    );
}; 