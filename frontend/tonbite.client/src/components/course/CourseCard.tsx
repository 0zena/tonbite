import { CourseType } from "../../states";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";

export const CourseCard = ({item}: {item: CourseType}) => {
    return (
        <Card className={"max-w-96"}>
            <CardHeader>
                <h3>{item.name}</h3>
            </CardHeader>
            <CardBody>
                <p>{item.bio}</p>
            </CardBody>
            <CardFooter>
                <h3>{item.price}</h3>
            </CardFooter>
        </Card>
    );
}