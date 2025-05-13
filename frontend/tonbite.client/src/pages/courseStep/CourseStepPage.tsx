import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CourseService, CourseStepService} from "../../services";
import {CourseStepType, CourseType} from "../../states";
import {Icons} from "../../utils/Icons.ts";
import {usePDF} from "react-to-pdf";
import {useAuth} from "../../provider/AuthProvider.tsx";

// UI Components
import {CourseStepContent} from "./CourseStepContent.tsx";
import {NotFoundError} from "../error/NotFoundError.tsx";
import {Icon, LoadingLayout} from "../../components";
import {Button} from "@heroui/button";
import {CreateCourseStepForm} from "./CreateCourseStepForm.tsx";
import {Link} from "@heroui/link";

export const CourseStepPage = () => {
    const [step, setStep] = useState<CourseStepType | undefined>();
    const [course, setCourse] = useState<CourseType | undefined>();
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const {id} = useParams();
    const {client} = useAuth();
    const {toPDF, targetRef} = usePDF({filename: `course-step-${id}.pdf`});

    useEffect(() => {
        setLoading(true);
        CourseStepService.get(id).then(x => {
            setStep(x)
            setLoading(false);
        });
    }, [id]);

    useEffect(() => {
        if (step?.parentId) {
            CourseService.get(step?.parentId.toString()).then(x => {
                setCourse(x)
            });
        }
    }, [step?.parentId]);

    const handleDownload = () => {
        toPDF();
    }

    const edit = () => {
        setEditing(!editing);
    }

    if (loading) return <LoadingLayout />;
    if (!loading && !step) return <NotFoundError />

    if (editing && course?.id) {
        return (
            <CreateCourseStepForm courseId={course?.id} step={step} editing={editing} onSubmit={edit} />
        )
    }

    return (
        <div className={"course-step space-y-6 p-4 h-full overflow-y-hidden"}>
            <h3 className={"text-4xl font-bold text-blue-400"}>{step?.name}</h3>
            <p className={"text-xl text-start border-b pb-2"}>{step?.bio}</p>
            <span className={"flex flex-row gap-2"}>
                <Button startContent={<Icon icon={Icons.BACK} />} as={Link} href={`/courses/${step?.parentId}`}>Back</Button>
                {course?.users?.isCourseOwner(client) || client?.roles?.hasRole("Admin") ? (<Button startContent={<Icon icon={Icons.EDIT} />} onPress={edit}>Edit</Button>) : null}
                {step?.content && (<Button startContent={<Icon icon={Icons.PDF} />} onPress={handleDownload}>Download PDF</Button>)}
            </span>
            <div ref={targetRef} className="max-h-full h-full">
                {step?.content && (<CourseStepContent html={step.content} />)}
            </div>
        </div>
    );
}