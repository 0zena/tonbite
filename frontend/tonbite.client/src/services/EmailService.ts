import { ReportProblemFormProps } from "../states";
import { api } from "./Api";

export class EmailService {
    public static async sendProblemReport(data: ReportProblemFormProps): Promise<string | undefined> {
        const response = await api.post("/email/report", data);
        return response.data;
    }

    public static async sendCode(email: string): Promise<string | undefined> {
        const response = await api.post("/email/send-code", JSON.stringify(email),
        {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    }
}

