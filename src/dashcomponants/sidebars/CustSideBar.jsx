import React from 'react';
import { FaHouseChimney, FaUsers, FaFirstOrder } from "react-icons/fa6";
import { FaProductHunt, FaTicketAlt } from "react-icons/fa";

import { LuLogOut } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function CustSideBar() {

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token")
    navigate('/login');
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    textTransform: 'capitalize',
    marginTop: '20px', // Adjust the top margin as per your design
    display: 'flex',
    alignItems: 'center',
    gap: '12px' // This creates space between the icon and the text
  };



  return (
    <>
      <div style={{ width: '200px', height: '100vh', backgroundColor: 'pink', padding: '1rem' }}>
        <ul style={{ listStyle: 'none', color: 'black', fontSize: '1rem' }}>
          <li><Link to='/custdash/chart' style={linkStyle}><FaHouseChimney size="20" style={{ marginRight: '12px' }} />Dashboard</Link></li>
          <li><Link to='/custdash/customers' style={linkStyle}><FaUsers size="20" style={{ marginRight: '12px' }} />Customers</Link></li>
          <li><Link to='/custdash/products' style={linkStyle}><FaProductHunt size="20" style={{ marginRight: '12px' }} />Products</Link></li>
          <li><Link to='/custdash/orders' style={linkStyle}><FaFirstOrder size="20" style={{ marginRight: '12px' }} />Orders</Link></li>

          <li><Link to='/custdash/tickets' style={linkStyle}><FaTicketAlt size="20" style={{ marginRight: '12px' }} />Tickets</Link></li>


          <li>
            <button onClick={logoutHandler} style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer' }}>
              <LuLogOut size="20" style={{ marginRight: '12px' }} />Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default CustSideBar