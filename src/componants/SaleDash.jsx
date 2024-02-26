import React from 'react'
import Nav from '../dashcomponants/Nav'
import SalesSideBar from '../dashcomponants/sidebars/SalesSideBar'
import { Outlet } from 'react-router-dom'





export const SaleDash = () => {
  return (
    <>
      <Nav />
      <div style={{ display: 'flex', width: '100%' }}>
        <SalesSideBar />
        <div style={{ flex: 1 }}>
      
          <Outlet /> 
        </div>
      </div>
    </>
  )
}
