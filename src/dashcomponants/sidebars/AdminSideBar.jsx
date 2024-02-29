import React from 'react';
import { FaHouseChimney, FaUsers, FaFirstOrder, FaLaptop, FaFileLines, FaChevronDown, FaChevronRight } from "react-icons/fa6";
import { FaProductHunt, FaCartArrowDown, FaTicketAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { HiUsers } from "react-icons/hi";
import { FaUsersCog } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/UserSlice';

function AdminSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("token");
   
    
  
    dispatch(logoutAction());
    
    navigate('/login');
  };
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    textTransform: 'capitalize',
    marginTop: '20px', 
    display: 'flex',
    alignItems: 'center',
    gap: '12px' 
  };

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  return (
    <>
      <div style={{ width: '200px', height: '100vh', backgroundColor: 'pink', padding: '1rem' }}>
        <ul style={{ listStyle: 'none', color: 'black', fontSize: '1rem' }}>
          <li><Link to='/admindash/chart' style={linkStyle}><FaHouseChimney size="20" style={{ marginRight: '12px' }} />Dashboard</Link></li>
          <li><Link to='/admindash/customers' style={linkStyle}><FaUsers size="20" style={{ marginRight: '12px' }} />Customers</Link></li>
          <li><Link to='/admindash/products' style={linkStyle}><FaProductHunt size="20" style={{ marginRight: '12px' }} />Products</Link></li>
          <li><Link to='/admindash/orders' style={linkStyle}><FaFirstOrder size="20" style={{ marginRight: '12px' }} />Orders</Link></li>
          <li><Link to='/admindash/sales' style={linkStyle}><FaCartArrowDown size="20" style={{ marginRight: '12px' }} />Sales</Link></li>
          <li><Link to='/admindash/task' style={linkStyle}><FaLaptop size="20" style={{ marginRight: '12px' }} />Task</Link></li>
          <li><Link to='/admindash/tickets' style={linkStyle}><FaTicketAlt size="20" style={{ marginRight: '12px' }} />Tickets</Link></li>
          <li><Link to='/admindash/report' style={linkStyle}><FaFileLines size="20" style={{ marginRight: '12px' }} />Reports</Link></li>

          <li style={{ marginTop: '20px' }}>
            <div onClick={toggleSettings} style={{ ...linkStyle, cursor: 'pointer' }}>
              <IoMdSettings />
              Settings
              {isSettingsOpen ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {isSettingsOpen && (
              <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                <li><Link to='/admindash/userlist' style={linkStyle}><HiUsers />Users List</Link></li>
                <li><Link to='/admindash/profilesettings' style={linkStyle}><FaUsersCog />Profile Settings</Link></li>
              </ul>
            )}
          </li>
          <li>
            <button onClick={logoutHandler} style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer' }}>
              <LuLogOut size="20" style={{ marginRight: '12px' }} />Logout
            </button>
          </li>        </ul>
      </div>
    </>
  );
}

export default AdminSideBar;
