import Toncoin from "../../assets/toncoin.svg";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseService } from "../../services/CourseService.ts";
import { ValidationError } from "../../components";
import { CourseType, CourseSchema } from "../../states";
import {useNavigate} from "react-router-dom";

export const CreateCourseForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CourseType>({ resolver: zodResolver(CourseSchema)});
    const navigate = useNavigate();

    const Submit = async (form: CourseType) => {
        const course = await CourseService.Create(form);
        if (course != undefined)
            navigate(`/courses/${course.id}`);
    }

    return (
        <Card className={"p-6"}>
            <form onSubmit={handleSubmit(Submit)} className={"space-y-4"}>
                <Input label={"Title"}
                       placeholder={"TON blockchain benefits"}
                       {...register("name")}  />
                <ValidationError error={errors.name} />
                <Textarea label={"Bio"}
                          placeholder={"In this course..."}
                          {...register("bio")}  />
                <ValidationError error={errors.bio} />
                <Input label={"Wallet address"}
                       placeholder={"Your TON wallet"}
                       {...register("walletAddress")}  />
                <ValidationError error={errors.walletAddress} />
                <Input label={"Price"}
                       step={"any"}
                       type={"number"}
                       placeholder={"0.00"}
                       endContent={"TON"} min={0}
                       startContent={<img src={Toncoin} alt="TON" className="size-5" />}
                       {...register("price", { valueAsNumber: true })} />
                <ValidationError error={errors.price} />

                <Button type={"submit"}>Create</Button>
            </form>
        </Card>
    )
}