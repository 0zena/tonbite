import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseService } from "../../services";
import { CourseType, CourseSchema, copyFrom } from "../../states";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../utils";

// UI components
import { Icon, ValidationError } from "../../components";
import Toncoin from "../../assets/toncoin.svg";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";

interface CreateCourseFormProps {
    course?: CourseType;
    editing?: boolean;
    onSubmit?: () => void;
}

export const CreateCourseForm = ({course = {} as CourseType, editing = false, onSubmit}: CreateCourseFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<CourseType>({ resolver: zodResolver(CourseSchema)});
    const navigate = useNavigate();

    const Submit = async (form: CourseType) => {
        let result: CourseType | undefined;
        if (!course?.id || !course) {
            result = await CourseService.create(form);
            if (result)
                navigate(`/courses/${result.id}`);
        } else {
            copyFrom(course, form);
            result = await CourseService.update(course);
            if (result && onSubmit)
                onSubmit();
        }
    }

    return (
        <Card className={"p-6 space-y-6 w-full"}>
            <h2 className={"text-xl"}>{editing ? ("Edit Course") : ("Create a new Course")}</h2>
            <p>{editing ? ("Add steps below") : ("You will be able to add steps later.")}</p>
            <form onSubmit={handleSubmit(Submit)} className={"space-y-4"}>
                <span className={"flex flex-col md:w-2/3"}>
                    <Input label={"Title"}
                           defaultValue={course?.name}
                           placeholder={"TON blockchain benefits"}
                           {...register("name")} />
                    <ValidationError error={errors.name} />
                </span>
                <Textarea label={"Bio"}
                          defaultValue={course?.bio}
                          placeholder={"In this course..."}
                          {...register("bio")} />
                <ValidationError error={errors.bio} />
                <div className={"grid grid-cols-1 md:grid-cols-3 max-md:space-y-4 md:space-x-4"}>
                    <span className={"col-span-2"}>
                        <Input label={"Wallet address"}
                               defaultValue={course?.walletAddress}
                               placeholder={"Your TON wallet"}
                               {...register("walletAddress")}  />
                        <ValidationError error={errors.walletAddress} />
                    </span>
                    <span className={""}>
                        <Input label={"Price"}
                               step={"any"}
                               type={"number"}
                               placeholder={"0.00"}
                               endContent={"TON"}
                               min={0} max={10}
                               defaultValue={course?.price?.toString() ?? "0"}
                               startContent={<img src={Toncoin} alt="TON" className="size-5" />}
                               {...register("price", { valueAsNumber: true })} />
                        <ValidationError error={errors.price} />
                    </span>
                </div>

                <span className={"flex w-full"}>
                    {editing && (
                        <Button color="warning" variant={"light"} onPress={onSubmit}>
                            <Icon icon={Icons.CANCEL} />
                            Cancel
                        </Button>
                    )}

                    <Button color="primary" type={"submit"} className={"ml-auto"}>
                        <Icon icon={Icons.ADD} />
                        {editing ? ("Save") : ("Create")}
                    </Button>
                </span>
            </form>
        </Card>
    )
}