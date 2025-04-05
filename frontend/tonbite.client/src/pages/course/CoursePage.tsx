import {useTonAddress, useTonConnectUI} from '@tonconnect/ui-react';
import {TransactionHandler} from "../../TON/TransactionHandler.ts";
import {CourseService, TransactionService} from "../../services";
import {CourseType, TransactionType, UserCourseStatus} from "../../states";
import {useAuth} from "../../provider/AuthProvider.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

// UI Components
import {CourseSummary} from "./CourseSummary.tsx";
import {ConfirmModal, CreateCourseStepButton, useConfirmModal} from "../../components";
import {Visibility} from "../../states/Course.ts";
import {CreateCourseForm} from "./CreateCourseForm.tsx";
import Toncoin from "../../assets/toncoin.svg";
import {CourseStepList} from "../../components/courseStep/CourseStepList.tsx";
import {CourseHeaderAction} from "./CourseHeaderAction.tsx";
import {NotFoundError} from "../error/NotFoundError.tsx";
import {Chip} from "@heroui/chip";

export const CoursePage = () => {
    const {isOpen, onOpenChange, confirmAction, handleConfirmResult} = useConfirmModal();
    const [course, setCourse] = useState<CourseType | undefined>();
    const [editing, setEditing] = useState<boolean>(false);
    const navigate = useNavigate();
    const clientAddress = useTonAddress();
    const [tonConnectUI] = useTonConnectUI();
    const {client} = useAuth();
    const {id} = useParams();

    const Created = course?.created ? new Date().toLocaleDateString() : "null";
    const visibilityName = course?.visibility !== undefined ? Visibility[course.visibility] : '';

    useEffect(() => {
        CourseService.get(id, true).then(r => setCourse(r));
    }, [id]);

    const ChangeVisibility = async () => {
        let visibility: Visibility;
        if (course!.visibility === Visibility.public)
            visibility = Visibility.private;
        else visibility = Visibility.public;

        const response = await CourseService.changeVisibility(id, visibility)
        if (response) setCourse(response);
    }

    const Edit = () => {
        setEditing(!editing);
    }

    const Delete = async () => {
        if (!await confirmAction()) return;
        const result = await CourseService.delete(id);
        if (result != undefined)
            navigate("/");
    }

    const Buy = async () => {
        if (!course?.walletAddress || !course?.price) return;
        const sender = new TransactionHandler();
        const transaction = sender.createTransaction(course.walletAddress, course.price);

        try {
            const form: TransactionType = {
                ownerId: client!.id!,
                recipientId: course!.users!.find(x => x.status === UserCourseStatus.creator)!.userId!,
                senderAddress: clientAddress,
                recipientAddress: course!.walletAddress!,
                amount: course!.price!.toString(),
            }

            await tonConnectUI.sendTransaction(transaction, sender.defaultModalOptions);
            await TransactionService.send(form);
            await CourseService.purchase(id);
        } catch (error) {
            console.log("transaction failed " + error);
        }
    }

    if (!course || course?.visibility === Visibility.private && !course?.users?.isCourseOwner(client))
        return <NotFoundError />

    return (
        <main className={"space-y-6 mt-6"}>
            <ConfirmModal isOpen={isOpen}
                          onOpenChange={onOpenChange}
                          onConfirm={handleConfirmResult}
                          title="Delete Course?"
                          message="Are you sure you want to delete this course? This action cannot be undone." />

            <header className={"flex justify-center items-center gap-4"}>
                <CourseHeaderAction editing={editing} client={client} course={course}
                                    Buy={Buy} Delete={Delete} Edit={Edit} Change={ChangeVisibility} />
                <Chip radius="sm"
                      variant="bordered"
                      startContent={<img src={Toncoin} alt={"toncoin"} className={"size-4"} />}>
                    {course?.price === 0 ? "Free" : `${course?.price} TON`}
                </Chip>
                <Chip radius="sm" variant="dot" color={"secondary"}>{Created}</Chip>
                <Chip radius="sm" variant="dot" color={"danger"}>{visibilityName}</Chip>
            </header>

            {editing ? (
                <>
                    <CreateCourseForm course={course} editing={editing} onSubmit={Edit} />
                    {course?.steps && (
                        <CourseStepList data={course?.steps} />
                    )}
                    <CreateCourseStepButton />
                </>
            ) : (
                <div className={"flex flex-col items-center gap-2"}>
                    <CourseSummary course={course} />
                    {course?.steps && (
                        <CourseStepList data={course?.steps} />
                    )}
                </div>
            )}
        </main>
    )
}
