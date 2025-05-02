export const TransactionRow = ({ label, value }: { label: string, value: string | undefined }) => {
    if (value) 
        return (
            <tr>
                <td>
                    <label>{label}</label>
                </td>
                <td>
                    <p>{value}</p>
                </td>
            </tr>
        );
}
