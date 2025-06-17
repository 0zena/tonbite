import {useTonAddress, useTonConnectUI} from '@tonconnect/ui-react';
import {TransactionHandler} from "../../TON/TransactionHandler.ts";
import {CourseService, TransactionService, UserService} from "../../services";
import {CourseType, TransactionType, UserCourseStatus, UserType} from "../../states";
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
import { CourseOwner } from './CourseOwner.tsx';

export const CoursePage = () => {
    const {isOpen, onOpenChange, confirmAction, handleConfirmResult} = useConfirmModal();
    const [course, setCourse] = useState<CourseType | undefined>();
    const [owner, setOwner] = useState<UserType | undefined>();
    const [editing, setEditing] = useState<boolean>(false);
    const navigate = useNavigate();
    const clientAddress = useTonAddress();
    const [tonConnectUI] = useTonConnectUI();
    const {client} = useAuth();
    const {id} = useParams();

    const isOwner = course?.users?.isCourseOwner(client) || client?.roles?.hasRole("Admin");
    const Created = course?.created ? new Date(course?.created) : null;
    const visibilityName = course?.visibility !== undefined ? Visibility[course.visibility] : '';
    const ownerId = course?.users?.find(x => x.status == UserCourseStatus.creator)?.userId;
    const formattedDate = Created
        ? `${Created.getFullYear()}-${String(Created.getMonth() + 1).padStart(2, '0')}-${String(Created.getDate()).padStart(2, '0')}`
        : "N/A";


    useEffect(() => {
        CourseService.get(id, true).then(setCourse);
    }, [id]);

    useEffect(() => {
        if (ownerId) {
            UserService.getById(ownerId).then(setOwner);
        }
    }, [ownerId])

    const changeVisibility = async () => {
        let visibility: Visibility;
        if (course!.visibility === Visibility.public)
            visibility = Visibility.private;
        else visibility = Visibility.public;

        const response = await CourseService.changeVisibility(id, visibility)
        if (response) setCourse(response);
    }

    const edit = () => {
        setEditing(!editing);
    }

    const remove = async () => {
        if (!await confirmAction()) return;
        const result = await CourseService.delete(id);
        if (result != undefined)
            navigate("/");
    }

    const buy = async () => {
        const sender = new TransactionHandler();
        const transaction = sender.createTransaction(course?.walletAddress ?? "", course?.price ?? 0);

        try {
            const form: TransactionType = {
                ownerId: client!.id!,
                recipientId: course!.users?.find(x => x.status === UserCourseStatus.creator)?.userId ?? 0,
                senderAddress: clientAddress,
                recipientAddress: course!.walletAddress ?? "",
                amount: course!.price!.toString(),
            }

            if (course?.price !== 0 && course?.walletAddress !== undefined)
                await tonConnectUI.sendTransaction(transaction, sender.defaultModalOptions);
            
            const transactionId = await TransactionService.send(form);
            await CourseService.purchase(id)

            if (transactionId)
                window.open(`/transaction/${transactionId}`, '_blank');

            location.reload();
        } catch (error) {
            console.log("transaction failed " + error);
        }
    }

    const stepDeleted = (id: number) => {
        setCourse(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                steps: prev.steps?.filter(step => step.id !== id)
            };
        });
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

            <header className={"flex justify-center items-center gap-4 max-md:flex-col max-md:items-end"}>
                <div className="flex gap-2 items-center">
                    <CourseHeaderAction editing={editing} client={client} course={course}
                                    Buy={buy} Delete={remove} Edit={edit} Change={changeVisibility} />
                    <CourseOwner user={owner} />
                </div>
                <div className="flex items-center gap-4 max-sm:flex-col max-sm:items-end">
                    <Chip radius="sm" size='lg'
                      variant="bordered"
                      startContent={<img src={Toncoin} alt={"toncoin"} className={"size-4"} />}>
                        {course?.price === 0 ? "Free" : `${course?.price} TON`}
                    </Chip>
                    <Chip radius="sm" size='lg' variant="dot" color={"danger"}>{visibilityName}</Chip>
                    <Chip radius="sm" size='lg' variant="dot" color={"secondary"}>{formattedDate}</Chip>
                </div>
            </header>

            {editing ? (
                <div className={"flex flex-col items-center gap-8"}>
                    <div className={"w-full max-w-[900px]"}>
                        <CreateCourseForm course={course} editing={editing} onSubmit={edit} />
                    </div>
                    {course?.steps && (
                        <CourseStepList isOwner={isOwner} data={course?.steps} onDelete={stepDeleted} />
                    )}
                    <CreateCourseStepButton />
                </div>
            ) : (
                <div className={"flex flex-col items-center gap-2"}>
                    {(
                        <CourseSummary course={course}/>
                    )}
                    {course?.steps && (
                        <CourseStepList isOwner={isOwner} data={course?.steps} onDelete={stepDeleted} />
                    )}
                </div>
            )}
        </main>
    )
}
