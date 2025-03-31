import { CourseStepType } from "../../states";
import { Card } from "@heroui/card";

export const CourseStepCard = ({item}: {item: CourseStepType}) => {
    return (
      <Card>
          <h3>{item.name}</h3>
          <h3>{item.bio}</h3>
      </Card>
    );
}