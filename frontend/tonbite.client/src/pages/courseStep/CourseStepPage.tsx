import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CourseStepService} from "../../services";
import {CourseStepType} from "../../states";

// UI Components
import {CourseStepContent} from "./CourseStepContent.tsx";

export const CourseStepPage = () => {
    const [step, setStep] = useState<CourseStepType | undefined>();
    const {stepId} = useParams();

    useEffect(() => {
        CourseStepService.get(stepId).then(x => setStep(x));
    }, [stepId]);

    return (
      <div className={"space-y-6"}>
          <h3 className={"text-4xl font-bold text-blue-400"}>{step?.name}</h3>
          <p className={"text-xl text-start border-b pb-2"}>{step?.bio}</p>
          {step?.content && (<CourseStepContent html={step.content} />)}
      </div>
    );
}