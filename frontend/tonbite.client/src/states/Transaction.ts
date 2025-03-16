import { z, ZodType } from "zod";

export type TransactionType = {
    id?: number;
    ownerId: number;
    recipientId: number;
    senderAddress: string;
    recipientAddress: string;
    amount: string;
    time?: Date;
}

export const TransactionSchema: ZodType<TransactionType> = z.object({
    id: z.number().optional(),
    ownerId: z.number(),
    recipientId: z.number(),
    senderAddress: z.string(),
    recipientAddress: z.string(),
    amount: z.string(),
    time: z.date().optional(),
})