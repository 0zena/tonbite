import { SummaryForm } from "../../states/SummaryForm";
import { StatisticsSummaryCard } from "./StatisticsSummaryCard";
export const StatisticsSummary = ({summary}: {summary: SummaryForm}) => {
    return (
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2">
            <StatisticsSummaryCard title="Payments Today" value={summary.paymentsToday} />
            <StatisticsSummaryCard title="Created Courses Today" value={summary.createdCoursesToday} />
            <StatisticsSummaryCard title="Avarage Course Price" value={`~ ${summary.avaragePrice.toString().slice(0, 5)} TON`} />
            <StatisticsSummaryCard title="Total Payments" value={summary.totalPayments} />
            <StatisticsSummaryCard title="Total Courses" value={summary.totalCourses} />
            <StatisticsSummaryCard title="Total Users" value={summary.totalUsers} />
        </div>
    );
}
