import { SendTransactionRequest } from "@tonconnect/ui-react";
import { ActionConfiguration } from "@tonconnect/ui";

export class TransactionHandler
{
    public defaultModalOptions: ActionConfiguration = {
        modals: ["success", "error", "before"],
    }

    private readonly defaultTransactionOptions: SendTransactionRequest = {
        validUntil: Date.now() + 5 * 60 * 1000, // 5min
        messages: [],
    }

    public createTransaction = (address: string, amount: number): SendTransactionRequest => {
        return {
            ...this.defaultTransactionOptions,
            messages: [
                {
                    address: address ?? '',
                    amount: ((amount ?? 0) * Math.pow(10, 9)).toString(),
                },
            ],
        };
    }
}