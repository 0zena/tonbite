import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReportProblemFormSchema, ReportProblemFormProps } from "../../states";
import { ValidationError } from "../../components";
import { EmailService } from "../../services";

export const ProblemReport = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ReportProblemFormProps>({
        resolver: zodResolver(ReportProblemFormSchema),
    });

    const onSubmit = async (data: ReportProblemFormProps) => {
        await EmailService.sendProblemReport(data);
        reset();
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-gradient">Problem Report</h1>
                <p>
                    If you have any problems with the site, please report them
                    to the developers.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-[500px]">
                <Input label="Author" placeholder="Your name, email or TON address" {...register("author")} />
                <ValidationError error={errors.author} />
                <Textarea label="Problem Description" placeholder="Describe the problem..." {...register("problem")} />
                <ValidationError error={errors.problem} />
                <Button type="submit">Report</Button>
            </form>
        </div>
    );
};
