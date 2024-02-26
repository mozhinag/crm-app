
import './App.css';
import './loginpage/login.css';
import Login from './loginpage/Login';
import Register from './loginpage/Register';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import { ManagerDash } from './componants/ManagerDash';
import AdminDash from './componants/AdminDash';
import { CustDash } from './componants/CustDash';
import { SaleDash } from './componants/SaleDash';
import Customers from './dashcomponants/Customers';
import Chart from './dashcomponants/Chart';
import Products from './dashcomponants/Products';
import Orders from './dashcomponants/Orders';
import Sales from './dashcomponants/Sales';
import Task from './dashcomponants/Task';
import Tickets from './dashcomponants/Tickets';
import Report from './dashcomponants/Report'
import UserList from './dashcomponants/UserList';
import ProfileSettings from './dashcomponants/ProfileSettings'






function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* AdminDash */}
        <Route path="/admindash" element={<AdminDash />}>
          <Route path="customers" element={<Customers />} />
          <Route path="chart" element={<Chart />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path='sales' element={<Sales />} />
          <Route path='task' element={<Task />} />
          <Route path ='tickets' element={<Tickets />} />
          <Route path ='report' element={<Report />} />
          <Route path ='userlist' element={<UserList />} />
          <Route path ='profilesettings' element={<ProfileSettings />} />
        
        </Route>
        {/* //CustDash */} 
        <Route path="/custdash" element={<CustDash />} >
          <Route path="customers" element={<Customers />} />
          <Route path="chart" element={<Chart />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path ='tickets' element={<Tickets />} />
        </Route>
        {/* //ManagerDash */}
        <Route path="/managerdash" element={<ManagerDash />} >
          <Route path="customers" element={<Customers />} />
          <Route path="chart" element={<Chart />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path='sales' element={<Sales />} />
          <Route path='task' element={<Task />} />
          <Route path ='tickets' element={<Tickets />} />
          <Route path ='report' element={<Report />} />
          <Route path ='userlist' element={<UserList />} />
          <Route path ='profilesettings' element={<ProfileSettings />} />
        
        </Route>
        {/* //SaleDash */}
        <Route path="/saledash" element={<SaleDash />} >
          <Route path='customers' element={<Customers />} />
          <Route path='chart' element={<Chart />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path='sales' element={<Sales />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
