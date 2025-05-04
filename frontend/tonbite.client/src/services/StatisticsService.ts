import { SummaryForm } from "../states/SummaryForm";
import { api } from "./Api";

export class StatisticsService {
    public static async getSummary(): Promise<SummaryForm> {
        const response = await api.get("/statistics");
        return response.data as SummaryForm;
    }
}

