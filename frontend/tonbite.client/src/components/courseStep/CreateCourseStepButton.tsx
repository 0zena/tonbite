import { Icon } from "../icon/Icon.tsx";
import { Icons } from "../../utils";
import { useNavigate } from "react-router-dom";

export const CreateCourseStepButton = () => {
    const navigate = useNavigate();

    const toCreateStepPage = () => {
        navigate(`create-step`);
    }

    return (
        <div onClick={toCreateStepPage} className={"p-6 w-full rounded-xl border border-dashed cursor-pointer max-w-[900px] hover:opacity-20"}>
            <Icon icon={Icons.ADD} />
        </div>
    )
}