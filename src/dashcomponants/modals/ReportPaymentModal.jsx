import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSales } from '../../redux/SaleSlice'; 

function ReportPaymentModal() {
    const dispatch = useDispatch();

    const { totalSoldProducts, totalIncome, Draft, Cheque, NetBanking, isLoading, error } = useSelector(state => state.sales);

    useEffect(() => {
        dispatch(getSales());
    }, [dispatch]);

    const safeTotalIncome = Number(totalIncome) || 0;

    if (isLoading) {
        return <div>Loading payment data...</div>;
    }

    if (error) {
        return <div>Error fetching payment data: {error}</div>;
    }

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
