import { ReportProblemFormProps } from "../states";
import { api } from "./Api";

export class EmailService {
    public static async sendProblemReport(data: ReportProblemFormProps): Promise<string | undefined> {
        const response = await api.post("/email/report", data);
        return response.data;
    }
}

