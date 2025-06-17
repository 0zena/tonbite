import { useParams } from "react-router-dom";
import { CreateCourseStepForm } from "./CreateCourseStepForm.tsx";
import { FeatureCard } from "../../components/index.ts";
import { Icons } from "../../utils/Icons.ts";

export const CreateCourseStepPage = () => {
    const {id} = useParams();

    return (
        <div className={"mt-10"}>
            <div className={"max-w-4xl mx-auto space-y-8"}>
                <div className="flex flex-col items-center space-y-4 text-center">
                    <h1 className="text-4xl font-bold text-gradient">Create Course Step</h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        Break your course into clear, structured lessons. Each step helps your students progress and stay engaged through their learning journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FeatureCard
                        icon={Icons.SETTINGS}
                        title="Step Details"
                        description="Give each lesson a clear title and summary so students know what to expect. Focus on one topic or concept per step."
                        color="blue"
                        variant="grey"
                    />
                    <FeatureCard
                        icon={Icons.CREATE}
                        title="Engagement"
                        description="Keep each step interactive and concise. Use examples, visuals, and questions to keep students involved and motivated."
                        color="pink"
                        variant="grey"
                    />
                </div>
                <CreateCourseStepForm courseId={Number(id)} />
            </div>
        </div>
    );
}