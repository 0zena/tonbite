import { Input, Textarea } from "@heroui/input";
import { Card } from "@heroui/card";
import Toncoin from "../../assets/toncoin.svg";
import { CourseType, CourseSchema } from "../../states";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { ValidationError } from "../../components";

export const CreateCourseForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CourseType>({ resolver: zodResolver(CourseSchema)});

    const Submit = (form: CourseType) => {
        console.log(form);
    }

    return (
        <Card className={"p-4"}>
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
                       placeholder={"0.00"}
                       type="number"
                       step={"any"}
                       endContent={"TON"} min={0}
                       startContent={<img src={Toncoin} alt="TON" className="w-5 h-5" />}
                       {...register("price", { valueAsNumber: true })} />
                <ValidationError error={errors.price} />

                <Button type={"submit"}>Create</Button>
            </form>
        </Card>
    )
}