import React from 'react'

import AdminSideBar from '../dashcomponants/sidebars/AdminSideBar';
import Nav from '../dashcomponants/Nav';
import { Outlet } from 'react-router-dom';








export const ManagerDash = () => {
  return (
    <>
      <Nav />
      <div style={{ display: 'flex', width: '100%' }}>
        <AdminSideBar />
        <div style={{ flex: 1 }}>
      
          <Outlet />
          </div>
      </div>

    </>
  )
}
