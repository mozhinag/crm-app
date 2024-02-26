import React from 'react'
import { useState } from 'react';
import ReportCustomerModal from './modals/ReportCustomerModal'
import ReportPaymentModal from './modals/ReportPaymentModal';


import ReportTaskModal from './modals/ReportTaskModal';
function Report() {
    const [activeModal, setActiveModal] = useState('');

    const handleLinkClick = (modalName) => {
      setActiveModal(modalName);
    };
  
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center', // Centers the content horizontally
            gap: '20px', // Adds gap between the flex items
            padding: '20px', // Adds some padding around the entire flex container
            // backgroundColor: 'pink', // Sets the background color of the entire flex container
          }}>
            <div style={{
              width: '30%', // Adjust width as needed
              backgroundColor: '#f0f0f0', // Sets a different background color for the left container
              padding: '20px',
              borderRadius: '10px', // Optional: Adds rounded corners
            }}>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ cursor: 'pointer', marginBottom: '10px' }} onClick={() => handleLinkClick('customer')}>Customer Report</li>
                <li style={{ cursor: 'pointer', marginBottom: '10px' }} onClick={() => handleLinkClick('tasks')}>Task Report</li>
                <li style={{ cursor: 'pointer', marginBottom: '10px' }} onClick={() => handleLinkClick('payments')}>Payment Report</li>
              </ul>
            </div>
            <div style={{
              flex: 1, // Takes the remaining space
              backgroundColor: '#fff', // Sets a different background color for the right container
              padding: '20px',
              borderRadius: '10px', // Optional: Adds rounded corners
            }}>
              {activeModal === 'customer' && <ReportCustomerModal />}
               {activeModal === 'tasks' && <ReportTaskModal />}
               {activeModal === 'payments' && <ReportPaymentModal />}
            </div>
          </div>
        );
      }


export default Report