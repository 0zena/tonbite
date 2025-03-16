import { SendTransactionRequest } from "@tonconnect/ui-react";
import { ActionConfiguration } from "@tonconnect/ui";

export class TransactionHandler
{
    public DefaultModalOptions: ActionConfiguration = {
        modals: ["success", "error", "before"],
    }

    private DefaultTransactionOptions: SendTransactionRequest = {
        validUntil: Date.now() + 5 * 60 * 1000, // 5min
        messages: [],
    }

    public CreateTransaction = (address: string, amount: number): SendTransactionRequest => {
        return {
            ...this.DefaultTransactionOptions,
            messages: [
                {
                    address: address ?? "",
                    amount: ((amount ?? 0) * 1000000000).toString(),
                },
            ],
        };
    }
}