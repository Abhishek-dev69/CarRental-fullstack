import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const NavbarOwner = () => {
  const { user } = useAppContext()

  return (
    <div className='sticky top-0 z-40 border-b border-white/70 bg-white/75 px-4 py-4 backdrop-blur-xl md:px-6'>
      <div className='mx-auto flex w-full max-w-[1440px] items-center justify-between rounded-[28px] border border-white/70 bg-white/70 px-5 py-4 shadow-[0_16px_40px_rgba(8,17,33,0.08)]'>
        <Link to='/'>
          <img src={assets.logo} alt="CarRental logo" className="h-8" />
        </Link>

        <div className='text-right'>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-400'>Owner Console</p>
          <p className='mt-1 text-sm font-semibold text-slate-800 md:text-base'>Welcome, {user?.name || "Owner"}</p>
        </div>
      </div>
    </div>
  )
}

export default NavbarOwner
