import React from 'react'
import Sidebar from '../AdminComponents/Sidebar'
import Navbar from '../AdminComponents/Navbar'
import { Outlet } from 'react-router-dom'

const AdminPageLayout = () => {
  return (
    <div className='flex relative'>
        <Sidebar />
        <div className='relative flex flex-col flex-1 ml-64'>
           <Navbar />
            <Outlet />
        </div>
    </div>
  )
}

export default AdminPageLayout