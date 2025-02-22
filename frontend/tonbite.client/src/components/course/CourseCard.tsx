import { CourseType } from "../../states";
import { Card, CardHeader, CardBody } from "@heroui/card";

export const CourseCard = ({item}: {item: CourseType}) => {
    return (
        <Card>
            <CardHeader className={"flex"}>
                <h3 className={"text-lg text-start"}>{item.name}</h3>
                <p className={"self-start text-nowrap ml-auto text-default-500 text-xs"}>{item.price} TON</p>
            </CardHeader>
            <CardBody>
                <p className={"line-clamp-4 text-sm"}>{item.bio}</p>
            </CardBody>
        </Card>
    );
}