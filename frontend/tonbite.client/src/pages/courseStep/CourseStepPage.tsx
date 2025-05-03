import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CourseStepService} from "../../services";
import {CourseStepType} from "../../states";
import {Icons} from "../../utils/Icons.ts";
import {usePDF} from "react-to-pdf";

// UI Components
import {CourseStepContent} from "./CourseStepContent.tsx";
import {NotFoundError} from "../error/NotFoundError.tsx";
import {Icon, LoadingLayout} from "../../components";
import {Button} from "@heroui/react";

export const CourseStepPage = () => {
    const [step, setStep] = useState<CourseStepType | undefined>();
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const {toPDF, targetRef} = usePDF({filename: `course-step-${id}.pdf`});

    useEffect(() => {
        setLoading(true);
        CourseStepService.get(id).then(x => {
            setStep(x)
            setLoading(false);
        });
    }, [id]);

    const handleDownload = () => {
        toPDF();
    }


    if (loading) return <LoadingLayout />;
    if (!loading && !step) return <NotFoundError />

    return (
        <div className={"course-step space-y-6 p-4 h-full overflow-y-hidden"}>
            <h3 className={"text-4xl font-bold text-blue-400"}>{step?.name}</h3>
            <p className={"text-xl text-start border-b pb-2"}>{step?.bio}</p>
            {step?.content && (<Button startContent={<Icon icon={Icons.PDF} />} onPress={handleDownload}>Download PDF</Button>)}
            <div ref={targetRef} className="max-h-full h-full">
                {step?.content && (<CourseStepContent html={step.content} />)}
            </div>
        </div>
    );
}