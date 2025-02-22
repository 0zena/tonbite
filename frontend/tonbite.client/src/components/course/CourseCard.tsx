import { CourseType } from "../../states";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";

export const CourseCard = ({item}: {item: CourseType}) => {
    return (
        <Card as={Link} href={`/courses/${item.id}`} className={"hover:opacity-85"}>
            <CardHeader className={"flex"}>
                <h3 className={"text-lg font-bold text-start"}>{item.name}</h3>
                <p className={"self-start text-nowrap ml-auto text-primary font-bold text-xs"}>{item.price} TON</p>
            </CardHeader>
            <CardBody>
                <p className={"line-clamp-4 text-default-600 text-sm"}>{item.bio}</p>
            </CardBody>
        </Card>
    );
}