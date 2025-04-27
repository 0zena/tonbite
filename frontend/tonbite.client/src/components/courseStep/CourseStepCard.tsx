import { CourseStepType } from "../../states";
import { Card } from "@heroui/card";
import { Link } from "@heroui/link";

export const CourseStepCard = ({item}: {item: CourseStepType}) => {
    return (
      <Card as={Link} href={`/course-step/${item.id}`} className={"p-4 hover:opacity-85"}>
          <h3 className={"text-2xl font-bold text-blue-400"}>{item.name}</h3>
          <h3>{item.bio}</h3>
      </Card>
    );
}