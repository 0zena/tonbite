import { TonConnectButton, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { TransactionHandler } from "../../TON/TransactionHandler.ts";
import { CourseService, TransactionService } from "../../services";
import { ConfirmModal, useConfirmModal } from "../../components";
import { CourseType, TransactionType } from "../../states";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider.tsx";
import { Visibility } from "../../states/Course.ts";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";

export const CoursePage = () => {
    const {isOpen, onOpenChange, confirmAction, handleConfirmResult} = useConfirmModal();
    const [course, setCourse] = useState<CourseType | undefined>();
    const navigate = useNavigate();
    const clientAddress = useTonAddress();
    const [tonConnectUI] = useTonConnectUI();
    const {client} = useAuth();
    const {id} = useParams();

    const Delete = async () => {
        if (!await confirmAction()) return;
        const result = await CourseService.delete(id);
        if (result != undefined)
            navigate("/");
    }

    const Pay = async () => {
        if (course?.walletAddress == undefined || course?.price == undefined) return;
        const sender = new TransactionHandler();
        const transaction = sender.createTransaction(course.walletAddress, course.price);

        try {
            const form: TransactionType = {
                ownerId: client!.id!,
                recipientId: course!.userId!,
                senderAddress: clientAddress,
                recipientAddress: course!.walletAddress!,
                amount: course!.price!.toString(),
            }

            await tonConnectUI.sendTransaction(transaction, sender.defaultModalOptions);
            await TransactionService.send(form);
        } catch (error) {
            console.log("transaction failed " + error);
        }
    }

    useEffect(() => {
        CourseService.get(id).then(r => setCourse(r));
    }, [id]);

    const visibilityName = course?.visibility !== undefined ? Visibility[course.visibility] : '';

    return (
        <main>
            {client?.id === course?.userId || client?.roles?.hasRole("Admin") ? (
                <>
                    <ConfirmModal isOpen={isOpen}
                                  onOpenChange={onOpenChange}
                                  onConfirm={handleConfirmResult}
                                  title="Delete Course?"
                                  message="Are you sure you want to delete this course? This action cannot be undone." />
                    <Button onPress={Delete}>Delete</Button>
                </>
            ) : (<>Purchase Course.</>)}

            <Button onPress={Pay}>
                Send transaction
            </Button>

            <TonConnectButton />

            {course != undefined ? (
                <div className={"text-start"}>
                    <p>{course.name}</p>
                    <p>{course.bio}</p>
                    <p>{visibilityName}</p>
                </div>
            ) : (
                <>progress</>
            )}
        </main>
    )
}
