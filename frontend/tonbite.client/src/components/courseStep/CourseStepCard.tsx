import {CourseStepType} from "../../states";

// UI Components
import {Card} from "@heroui/card";
import {Link} from "@heroui/link";
import {CourseStepMenuButton} from "./CourseStepMenuButton.tsx";

interface CourseStepCardProps {
    item: CourseStepType;
    isOwner: boolean;
    onDelete: (id: number) => void;
}

export const CourseStepCard = ({item, isOwner, onDelete}: CourseStepCardProps) => {
    const deleteItem = () => {
        onDelete(item.id!);
    }

    return (
      <Card className={"flex flex-row p-4 w-full max-w-[900px]"}>
          <Link href={`/course-step/${item.id}`} className={"flex flex-col w-full hover:underline"}>
              <h3 className={"text-2xl font-bold text-blue-400"}>{item.name}</h3>
              <h3 className={"text-white text-start w-full"}>{item.bio}</h3>
          </Link>
          {isOwner && (<CourseStepMenuButton onDelete={deleteItem} />)}
      </Card>
    );
}