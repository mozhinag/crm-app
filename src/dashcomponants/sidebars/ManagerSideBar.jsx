import React from 'react';
import { FaHouseChimney, FaUsers, FaFirstOrder,  FaLaptop, FaFileLines, FaChevronDown, FaChevronRight } from "react-icons/fa6";
import { FaProductHunt, FaCartArrowDown, FaTicketAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { HiUsers } from "react-icons/hi";
import { FaUsersCog } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ManagerSideBar() {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token")
    navigate('/login');
  };
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    textTransform: 'capitalize',
    marginTop: '20px', // Adjust the top margin as per your design
    display: 'flex',
    alignItems: 'center',
    gap: '12px' // This creates space between the icon and the text
  };

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  return (
    <>
      <div style={{ width: '200px', height: '100vh', backgroundColor: 'pink', padding: '1rem' }}>
        <ul style={{ listStyle: 'none', color: 'black', fontSize: '1rem' }}>
          <li><Link to='/managerdash/chart' style={linkStyle}><FaHouseChimney size="20" style={{ marginRight: '12px' }} />Dashboard</Link></li>
          <li><Link to='/managerdash/customers' style={linkStyle}><FaUsers size="20" style={{ marginRight: '12px' }} />Customers</Link></li>
          <li><Link to='/managerdash/products' style={linkStyle}><FaProductHunt size="20" style={{ marginRight: '12px' }} />Products</Link></li>
          <li><Link to='/managerdash/orders' style={linkStyle}><FaFirstOrder size="20" style={{ marginRight: '12px' }} />Orders</Link></li>
          <li><Link to='/managerdash/sales' style={linkStyle}><FaCartArrowDown size="20" style={{ marginRight: '12px' }} />Sales</Link></li>
          <li><Link to='/managerdash/task' style={linkStyle}><FaLaptop size="20" style={{ marginRight: '12px' }} />Task</Link></li>
          <li><Link to='/managerdash/tickets' style={linkStyle}><FaTicketAlt size="20" style={{ marginRight: '12px' }} />Tickets</Link></li>
          <li><Link to='/managerdash/report' style={linkStyle}><FaFileLines size="20" style={{ marginRight: '12px' }} />Reports</Link></li>

          <li style={{ marginTop: '20px' }}>
            <div onClick={toggleSettings} style={{ ...linkStyle, cursor: 'pointer' }}>
              <IoMdSettings />
              Settings
              {isSettingsOpen ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {isSettingsOpen && (
              <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
                <li><Link to='/managerdash/userlist' style={linkStyle}><HiUsers />Users List</Link></li>
                <li><Link to='/managerdash/userprofile' style={linkStyle}><FaUsersCog />Profile Settings</Link></li>
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

export default ManagerSideBar;
