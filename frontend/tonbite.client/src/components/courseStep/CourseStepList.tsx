import {CourseStepType} from "../../states";

// UI Components
import {CourseStepCard} from "./CourseStepCard.tsx";
import {ConfirmModal, useConfirmModal} from "../modal";
import {CourseStepService} from "../../services";

interface CourseStepListProps {
    isOwner: boolean | undefined;
    data: CourseStepType[];
    onDelete: (id: number) => void;
}

export const CourseStepList = ({data, onDelete, isOwner}: CourseStepListProps) => {
    const {isOpen, onOpenChange, confirmAction, handleConfirmResult} = useConfirmModal();

    const remove = async (id: number) => {
        if (!await confirmAction()) return;
        const result = await CourseStepService.delete(id);
        if (result)
            onDelete(id);
    }

    return (
        <>
            <ConfirmModal isOpen={isOpen}
                          onOpenChange={onOpenChange}
                          onConfirm={handleConfirmResult}
                          title="Delete Course Step?"
                          message="Are you sure you want to delete this course step? This action cannot be undone." />

            <div className={"flex flex-col space-y-4 w-full items-center"}>
                {data.map((item, index) => (
                    <CourseStepCard item={item} isOwner={isOwner ?? false} onDelete={remove} key={index} />
                ))}
            </div>
        </>
    );
}