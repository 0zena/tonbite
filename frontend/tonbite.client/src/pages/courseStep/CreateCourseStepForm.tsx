import { copyCoursStepFrom, CourseStepSchema, CourseStepType } from "../../states";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseStepService } from "../../services";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../utils";

// UI components
import { Icon, TextEditor, ValidationError } from "../../components";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";

interface CreateCourseStepFormProps {
    courseId: number;
    step?: CourseStepType;
    editing?: boolean;
    onSubmit?: () => void;
}

export const CreateCourseStepForm = ({courseId, step, editing, onSubmit}: CreateCourseStepFormProps) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CourseStepType>({ resolver: zodResolver(CourseStepSchema)});
    const navigate = useNavigate();

    const submit = async (form: CourseStepType) => {
        if (!editing) {
            form.parentId = courseId;
            await CourseStepService.create(form);
            navigate(`/courses/${courseId}`);
        } else {
            copyCoursStepFrom(step!, form);
            await CourseStepService.update(step!);
            onSubmit!();
        }
    }

    return (
        <Card className={"p-4"}>
            <form onSubmit={handleSubmit(submit)} className={"space-y-4"}>
                <Input label={"Title"}
                       defaultValue={step?.name}
                       placeholder={"Introduction to..."}
                       {...register("name")} />
                <ValidationError error={errors.name} />
                <Textarea label={"Bio"}
                    defaultValue={step?.bio}
                    placeholder={"In this part of the course..."}
                    {...register("bio")} />
                <ValidationError error={errors.bio} />
                <TextEditor value={step?.content ?? watch("content")}
                            onChange={(val) => setValue("content", val)}
                            placeholder={"Write something..."} />
                <ValidationError error={errors.content} />
                <span className={"flex w-full"}>
                    {editing && (
                        <Button startContent={<Icon icon={Icons.CANCEL} />} color="warning" variant={"light"} onPress={onSubmit}>
                            Cancel
                        </Button>
                    )}

                    <Button startContent={<Icon icon={editing ? Icons.APPLY : Icons.ADD} />} color="primary" type={"submit"} className={"ml-auto"}>
                        {editing ? "Update" : "Create"}
                    </Button>
                </span>
            </form>
        </Card>
    );
}