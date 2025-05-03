import { useState } from "react";
import { useEffect } from "react";
import { TransactionService } from "../../services";
import { useParams } from "react-router-dom";
import { TransactionType } from "../../states";
import { Icons } from "../../utils";
import "./TransactionPage.scss";

// UI Components
import { TransactionRow } from "./TransactionRow";
import { usePDF } from 'react-to-pdf';
import { Button } from "@heroui/react";
import { Icon } from "../../components";

export const TransactionPage = () => {
    const { id } = useParams();
    const { toPDF, targetRef } = usePDF({filename: `transaction-check-${id}.pdf`});
    const [transaction, setTransaction] = useState<TransactionType | undefined>(undefined);

    useEffect(() => {
        TransactionService.get(id!).then(setTransaction);
    }, [id]);

    const handleDownload = () => {
        toPDF();
    }

    if (!transaction) {
        return <p>Transaction not found</p>;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="transaction-page max-sm:scale-50" ref={targetRef}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Transaction Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TransactionRow label="Transaction ID" value={transaction?.id?.toString()} />
                        <TransactionRow label="Date" value={transaction?.time?.toLocaleString()} />
                        <TransactionRow label="Sender" value={transaction?.ownerId?.toString()} />
                        <TransactionRow label="Recipient" value={transaction?.recipientId?.toString()} />
                        <TransactionRow label="Sender Address" value={transaction?.senderAddress} />
                        <TransactionRow label="Recipient Address" value={transaction?.recipientAddress} />
                        <TransactionRow label="Amount" value={transaction?.amount ? `${transaction?.amount} TON` : undefined} />
                    </tbody>
                </table>
            </div>
            <span>
                <Button startContent={<Icon icon={Icons.PDF} />} onPress={handleDownload}>Download PDF</Button>
            </span>
        </div>
    );
}
