import DOMPurify from "dompurify";
import "./CourseStepContent.scss";

export const CourseStepContent = ({html}: {html: string}) => {
    const sanitizedHtml = DOMPurify.sanitize(html);

    return (
        <div
            className="course-step-content justify-self-center prose"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
    );
}