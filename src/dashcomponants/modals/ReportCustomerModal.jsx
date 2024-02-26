// CustomerModal.js
import React from 'react';
import { useSelector } from 'react-redux';

function ReportCustomerModal() {
  // Access details from Redux store
  const { details } = useSelector((state) => state.customer);

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
