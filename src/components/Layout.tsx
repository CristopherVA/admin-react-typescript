import React from 'react'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
        <Header />
        <div className='flex'>
        <Sidebar />
        
        <main className='flex-1 p-8'>
            <Outlet />
        </main>
        </div>
    </>
  )
}

export default Layout