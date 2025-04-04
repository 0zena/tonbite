import { CourseStepType } from "../../states";
import { Card } from "@heroui/card";

export const CourseStepCard = ({item}: {item: CourseStepType}) => {
    return (
      <Card className={"p-4"}>
          <h3 className={"text-2xl font-bold text-blue-400"}>{item.name}</h3>
          <h3>{item.bio}</h3>
      </Card>
    );
}