import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCustomers } from '../../redux/CustomerSlice'; 

function ReportCustomerModal() {
  const dispatch = useDispatch();
  const { details, isLoading, isError, message } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading customer data...</div>;
  }

  if (isError) {
    return <div>Error fetching customer data: {message}</div>;
  }

  return (
    <div>
      <h2>Customer Report</h2>
      <table className="table">
        <thead className="table-pink">
          <tr>
            <th>Total No of Customers</th>
            <th>Active Customers</th>
            <th>Inactive Customers</th>
            <th>VIP Customers</th>
            <th>Vendors</th>
            <th>Regular Customers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{details.totalCustomers}</td>
            <td>{details.activeCustomers}</td>
            <td>{details.inactiveCustomers}</td>
            <td>{details.vipCustomers}</td>
            <td>{details.vendors}</td>
            <td>{details.regularCustomers}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportCustomerModal;
