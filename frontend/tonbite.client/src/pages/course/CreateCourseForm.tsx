import Toncoin from "../../assets/toncoin.svg";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseService } from "../../services";
import { Icon, ValidationError } from "../../components";
import { CourseType, CourseSchema } from "../../states";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../utils";

export const CreateCourseForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CourseType>({ resolver: zodResolver(CourseSchema)});
    const navigate = useNavigate();

    const Submit = async (form: CourseType) => {
        const course = await CourseService.create(form);
        if (course != undefined)
            navigate(`/courses/${course.id}`);
    }

    return (
        <Card className={"p-6 space-y-6"}>
            <h2 className={"text-xl"}>Create a new Course</h2>
            <p>You will be able to add steps later.</p>
            <form onSubmit={handleSubmit(Submit)} className={"space-y-4"}>
                <span className={"flex flex-col md:w-2/3"}>
                    <Input label={"Title"}
                           placeholder={"TON blockchain benefits"}
                           {...register("name")} />
                    <ValidationError error={errors.name} />
                </span>
                <Textarea label={"Bio"}
                          placeholder={"In this course..."}
                          {...register("bio")}  />
                <ValidationError error={errors.bio} />
                <div className={"grid grid-cols-1 md:grid-cols-3 max-md:space-y-4 md:space-x-4"}>
                    <span className={"col-span-2"}>
                        <Input label={"Wallet address"}
                               placeholder={"Your TON wallet"}
                               {...register("walletAddress")}  />
                        <ValidationError error={errors.walletAddress} />
                    </span>
                    <span className={""}>
                        <Input label={"Price"}
                               step={"any"}
                               type={"number"}
                               placeholder={"0.00"}
                               endContent={"TON"} min={0}
                               startContent={<img src={Toncoin} alt="TON" className="size-5" />}
                               {...register("price", { valueAsNumber: true })} />
                        <ValidationError error={errors.price} />
                    </span>
                </div>

                <span className={"flex w-full justify-end"}>
                    <Button color="primary" type={"submit"}>
                        <Icon icon={Icons.ADD} />
                        Create
                    </Button>
                </span>
            </form>
        </Card>
    )
}