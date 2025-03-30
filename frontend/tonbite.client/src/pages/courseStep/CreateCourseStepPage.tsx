import { useParams } from "react-router-dom";
import { CreateCourseStepForm } from "./CreateCourseStepForm.tsx";

export const CreateCourseStepPage = () => {
    const {id} = useParams();

    return (
        <div className={"mt-10"}>
            <div className={"max-w-4xl mx-auto"}>
                <CreateCourseStepForm courseId={Number(id)} />
            </div>
        </div>
    );
}