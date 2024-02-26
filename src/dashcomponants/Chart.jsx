import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { useSelector } from 'react-redux';


const barData = [
  { name: 'Jan', Sales: 4000, Orders: 2400, Tasks: 3350 },
  { name: 'Feb', Sales: 3000, Orders: 1398, Tasks: 4400 },
  // More data can be added as needed
];
const monthlyRevenueData = [
  { month: 'Jan', Revenue: 4000 },
  { month: 'Feb', Revenue: 3000 },
  // Add more data as needed
];

function Chart() {

  const { details } = useSelector((state) => state.customer);
  const { totalTasks } = useSelector(state => state.tasks);
  const { totalOrders } = useSelector(state => state.orders);

  const COLORS = ['#0088FE', '#00C49F', '#fff'];
  const pieData = [
    { name: 'vendors', value: details.vendors },
    { name: 'vip', value: details.vipCustomers },
    { name: 'regular', value: details.regularCustomers },
  ];
  return (
    <div className="dashboardContent" style={{ flexGrow: 1, padding: '20px' }}>
      {/* Cards for Totals */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap' }}>
        <Card sx={{ flex: '1 0 200px', margin: '0 10px', marginBottom: '20px' }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Customers
            </Typography>
            <Typography variant="h5" component="h2">
              {details.totalCustomers}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: '1 0 200px', margin: '0 10px', marginBottom: '20px' }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Orders
            </Typography>
            <Typography variant="h5" component="h2">
              {totalOrders}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: '1 0 200px', margin: '0 10px', marginBottom: '20px' }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Tasks
            </Typography>
            <Typography variant="h5" component="h2">
              {totalTasks}
            </Typography>
          </CardContent>
        </Card>
      </div>
      {/* Bar Chart for Sales and Orders */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '50%', paddingRight: '10px' }}>
          <ResponsiveContainer width="100%" height={300}> {/* Set height explicitly */}
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3 " />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Sales" fill="#8884d8" />
              <Bar dataKey="Orders" fill="#82ca9d" />
              <Bar dataKey="Tasks" fill="#fff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Customer Details */}
        <div style={{ width: '50%', paddingLeft: '10px', marginBottom: '20px' }}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Line Chart for Monthly Revenue Flow */}
      <div style={{ width: '100%', marginBottom: '20px' }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Chart;