import { CreateCourseForm } from "./CreateCourseForm.tsx";
import { Icons } from "../../utils";
import { FeatureCard } from "../../components";

export const CreateCoursePage = () => {
    return (
        <div className={"mt-10"}>
            <div className={"max-w-4xl mx-auto space-y-8"}>
                <div className="flex flex-col items-center space-y-4 text-center">
                    <h1 className="text-4xl font-bold text-gradient">Create Your Course</h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        Share your knowledge with the world and earn TON coins through decentralized payment system.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={Icons.SETTINGS}
                        title="Course Details"
                        description="Provide a clear title and description that accurately represents your course content. This helps students find and understand your course better."
                        color="blue"
                        variant="grey"
                    />
                    <FeatureCard
                        icon={Icons.ADD}
                        title="Pricing"
                        description="Set a fair price in TON coins. Consider the value you're providing and the market demand for similar courses."
                        color="purple"
                        variant="grey"
                    />
                    <FeatureCard
                        icon={Icons.CREATE}
                        title="Content Quality"
                        description="Create engaging, well-structured content. High-quality courses attract more students and maintain good ratings."
                        color="pink"
                        variant="grey"
                    />
                </div>

                <CreateCourseForm />
            </div>
        </div>
    );
}