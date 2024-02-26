import React from 'react';
import { useSelector } from 'react-redux';

function ReportPaymentModal() {
    // Directly destructure the required properties from the sales slice of the Redux state
    const { totalSoldProducts, totalIncome, Draft, Cheque, NetBanking } = useSelector(state => state.sales);

    // Ensure totalIncome is treated as a number. Convert to 0 if it's not a number.
    const safeTotalIncome = Number(totalIncome) || 0;

    return (
        <div>
            <h2>Payment Reports</h2>
            <table className="table">
                <thead className="table-pink">
                    <tr>
                        <th>Total No of Sold Products</th>
                        <th>Income</th>
                        <th>Draft</th>
                        <th>Cheque</th>
                        <th>NetBanking</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{totalSoldProducts}</td>
                        <td>${safeTotalIncome.toFixed(2)}</td>
                        <td>{Draft || 0}</td>
                        <td>{Cheque || 0}</td>
                        <td>{NetBanking || 0}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
}

export default ReportPaymentModal;
