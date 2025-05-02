export const UserSummaryCard = ({value, label}: {value: number, label: string}) => {
    return (
        <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700">
            <p className="text-2xl font-bold text-blue-400">
                {value}
            </p>
            <p className="text-sm text-gray-400">{label}</p>
        </div>
    );
}