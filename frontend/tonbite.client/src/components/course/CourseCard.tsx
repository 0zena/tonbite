import { CourseType } from "../../states";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Link } from "@heroui/link";
import { Visibility } from "../../states/Course.ts";

export const CourseCard = ({item, showStatus}: {item: CourseType, showStatus: boolean}) => {
    const visibilityName = item?.visibility !== undefined ? Visibility[item.visibility] : '';

    return (
        <Card as={Link} href={`/courses/${item.id}`} className={"w-full hover:opacity-85"}>
            <CardHeader className={"flex"}>
                <h3 className={"text-xl font-bold text-start text-gradient"}>{item.name}</h3>
                <p className={"self-start text-nowrap ml-auto text-primary font-bold text-xs"}>{item.price} TON</p>
            </CardHeader>
            <CardBody>
                <p className={"line-clamp-4 text-default-600 text-sm"}>{item.bio}</p>
            </CardBody>
            {showStatus && (
                <CardFooter>
                    <p className={"ml-auto text-warning text-xs"}>{visibilityName}</p>
                </CardFooter>
            )}
        </Card>
    );
}