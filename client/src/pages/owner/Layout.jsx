import React, { useEffect } from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const { isOwner, navigate } = useAppContext()

  useEffect(() => {
    if (!isOwner) {
      navigate('/')
    }
  }, [isOwner])

  return (
    <div className='min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef3f8_100%)]'>
      <NavbarOwner />
      <div className='mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 pb-8 pt-6 lg:flex-row lg:px-6'>
        <Sidebar />
        <div className='min-w-0 flex-1'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
