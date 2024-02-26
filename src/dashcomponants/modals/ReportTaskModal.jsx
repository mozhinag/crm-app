import React from 'react';
import { useSelector } from 'react-redux';

function ReportTaskModal() {
  const { totalTasks, assignedTasks, unassignedTasks } = useSelector(state => state.tasks);

  return (
    <div>
      <h2>Task Report</h2>
      <table className="table">
        <thead className="table-pink">
          <tr>
            <th>Total No of Tasks</th>
            <th>Assigned</th>
            <th>Unassigned</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalTasks}</td>
            <td>{assignedTasks}</td>
            <td>{unassignedTasks}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportTaskModal;
