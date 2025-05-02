import { z } from "zod";

export type ReportProblemFormProps = {
    author: string;
    problem: string;
}

export const ReportProblemFormSchema = z.object({
    author: z.string().min(1, { message: "Author is required" }).max(255, { message: "Author cannot be longer than 255 symbols." }),
    problem: z.string().min(1, { message: "Problem is required" }).max(3000, { message: "Describe problem in less than 3000 symbols." }),
});
