import { Card, CardBody, CardHeader } from "@heroui/react";

interface StatisticsSummaryCardProps {
    title: string;
    value: string | number;
}

export const StatisticsSummaryCard = ({ title, value }: StatisticsSummaryCardProps) => {
    return (
        <Card>
            <CardHeader>
                <p className="text-xl font-semibold text-gradient text-center">{title}</p>
            </CardHeader>   
            <CardBody>
                <p className="text-3xl font-bold text-blue-300 text-center">{value}</p>
            </CardBody>
        </Card>
    );
}
