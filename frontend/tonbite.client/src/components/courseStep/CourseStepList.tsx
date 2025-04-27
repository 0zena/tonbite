import {CourseStepType} from "../../states";
import {useState} from "react";

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
    const [editing, setEditing] = useState(false);

    const edit = () => {
        setEditing(!editing);
    }
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
                          title="Delete Course?"
                          message="Are you sure you want to delete this course? This action cannot be undone." />

            <div className={"space-y-4 w-full max-w-[900px]"}>
                {data.map((item, index) => (
                    <CourseStepCard item={item} isOwner={isOwner ?? false} editing={editing} onEdit={edit} onDelete={remove} key={index} />
                ))}
            </div>
        </>
    );
}