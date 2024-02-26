import React from 'react'
import Nav from '../dashcomponants/Nav'
import CustSideBar from '../dashcomponants/sidebars/CustSideBar'
import { Outlet } from 'react-router-dom'








export const CustDash = () => {
  return (

    <>
      <Nav />
      <div style={{ display: 'flex', width: '100%' }}>
        <CustSideBar />
        <div style={{ flex: 1 }}>
      
          <Outlet /> {/* This will render the selected page content */}
        </div>
      </div>
    </>
  )
}
