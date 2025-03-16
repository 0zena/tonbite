import { api } from "./Api.ts";
import {TransactionType} from "../states";

export class TransactionService
{
    public static send = async (form: TransactionType): Promise<TransactionType | undefined> => {
        try {
            const result = await api.post("/transactions", form);
            return result.data as TransactionType;
        } catch {
            return undefined;
        }
    }
}