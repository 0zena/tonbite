import { useEffect, useState } from "react";
import {CourseType, TransactionType} from "../../states";
import {CourseService, TransactionService} from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import { Visibility } from "../../states/Course.ts";
import { useAuth } from "../../provider/AuthProvider.tsx";
import { Button } from "@heroui/button";
import { ConfirmModal, useConfirmModal } from "../../components";
import {SendTransactionRequest, useTonConnectUI, TonConnectButton, useTonAddress } from '@tonconnect/ui-react';

const transaction: SendTransactionRequest = {
    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
    messages: [
        {
            address:
                "UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ", // message destination in user-friendly format
            amount: "20000000",
        },
    ],
};

export const CoursePage = () => {
    const { isOpen, onOpenChange, confirmAction, handleConfirmResult } = useConfirmModal();
    const [course, setCourse] = useState<CourseType | undefined>();
    const clientAddress = useTonAddress();
    const [tonConnectUI] = useTonConnectUI();
    const navigate = useNavigate();
    const {id} = useParams();
    const {client} = useAuth();

    const Delete = async () => {
        if (!await confirmAction()) return;
        const result = await CourseService.Delete(id);
        if (result != undefined)
            navigate("/");
    }

    const Pay = async () => {
        try {
            const result = await tonConnectUI.sendTransaction(transaction, {
                modals: ['before', 'success', 'error'],
                notifications: ['before', 'success', 'error'],

            });

            console.log("transaction success " + result);

        } catch (error) {
            console.log("transaction failed " + error);
        } finally {
            const form: TransactionType = {
                senderId: client!.id!,
                recipientId: course!.userId!,
                senderAddress: clientAddress,
                recipientAddress: course!.walletAddress!,
                amount: "20000000",
            }

            const result = await TransactionService.Send(form);
            console.log("transaction saved " + result);
        }

    }

    useEffect(() => {
        CourseService.Get(id).then(r => setCourse(r));
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
