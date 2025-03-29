import { CourseStepSchema, CourseStepType } from "../../states";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseStepService } from "../../services";
import { useForm } from "react-hook-form";
import { Icons } from "../../utils";

// UI components
import { Icon, ValidationError } from "../../components";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";

export const CreateCourseStepForm = (courseId: number) => {
    const { register, handleSubmit, formState: { errors } } = useForm<CourseStepType>({ resolver: zodResolver(CourseStepSchema)});
    const Submit = async (form: CourseStepType) => {
        form.parentId = courseId;
        await CourseStepService.create(form);
    }

    return (
        <Card>
            <form onSubmit={handleSubmit(Submit)}>
                <Input label={"Title"}
                       placeholder={"Introduction to..."}
                       {...register("name")} />
                <ValidationError error={errors.name} />
                <Textarea label={"Bio"}
                    placeholder={"In this part of the course..."}
                    {...register("bio")} />
                <ValidationError error={errors.bio} />
                <span className={"flex w-full justify-end"}>
                    <Button color="primary" type={"submit"}>
                        <Icon icon={Icons.ADD} />
                        Create
                    </Button>
                </span>
            </form>
        </Card>
    );
}