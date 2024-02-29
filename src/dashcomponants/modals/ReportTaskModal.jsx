import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../../redux/TaskSlice'; 

function ReportTaskModal() {
  const dispatch = useDispatch();
  const { totalTasks, assignedTasks, unassignedTasks, isLoading, error } = useSelector(state => state.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading tasks data...</div>;
  }

  if (error) {
    return <div>Error fetching tasks data: {error}</div>;
  }

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
