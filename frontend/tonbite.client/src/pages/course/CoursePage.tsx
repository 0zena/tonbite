import { useEffect, useState } from "react";
import { CourseType } from "../../states";
import { CourseService } from "../../services/CourseService.ts";
import { useNavigate, useParams } from "react-router-dom";
import { Visibility } from "../../states/Course.ts";
import { useAuth } from "../../provider/AuthProvider.tsx";
import { Button } from "@heroui/button";
import { ConfirmModal, useConfirmModal } from "../../components";

export const CoursePage = () => {
    const { isOpen, onOpenChange, confirmAction, handleConfirmResult } = useConfirmModal();
    const [course, setCourse] = useState<CourseType | undefined>();
    const navigate = useNavigate();
    const {id} = useParams();
    const {client} = useAuth();

    const Delete = async () => {
        if (!await confirmAction()) return;
        const result = await CourseService.Delete(id);
        if (result != undefined)
            navigate("/");
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
            ) : (<>Suck dick</>)}

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
