import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { AnimatePresence, motion as Motion } from 'motion/react'

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const changeRole = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-role')
      if (data.success) {
        setIsOwner(true)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='section-shell sticky top-0 z-50 pt-4'>
      <div className='section-frame'>
        <nav className={`glass-panel relative flex items-center justify-between px-5 py-4 md:px-7 ${location.pathname === '/' ? 'bg-white/72' : 'bg-white/82'}`}>
          <Link to='/'>
            <Motion.img whileHover={{ scale: 1.04 }} src={assets.logo} alt="CarRental logo" className="h-9" />
          </Link>

          <div className='hidden items-center gap-2 lg:flex'>
            {menuLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          <div className='hidden items-center gap-3 lg:flex'>
            <div className='field-shell flex min-w-60 items-center gap-2 rounded-full px-4 py-2.5'>
              <img src={assets.search_icon} alt="" className='h-4 w-4 opacity-60' />
              <input type="text" placeholder='Search cars' className='text-sm placeholder:text-slate-400' />
            </div>

            <button onClick={() => isOwner ? navigate('/owner') : changeRole()} className='button-secondary cursor-pointer'>
              {isOwner ? 'Dashboard' : 'List Cars'}
            </button>

            <button onClick={() => { user ? logout() : setShowLogin(true) }} className='button-primary cursor-pointer'>
              {user ? 'Logout' : 'Login'}
            </button>
          </div>

          <button className='flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 sm:hidden' aria-label="Menu" onClick={() => setOpen(!open)}>
            <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <Motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className='section-frame sm:hidden'>
            <div className='glass-panel mt-3 flex flex-col gap-4 px-5 py-5'>
              {menuLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setOpen(false)} className='rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100'>
                  {link.name}
                </Link>
              ))}

              <div className='field-shell flex items-center gap-2 rounded-2xl'>
                <img src={assets.search_icon} alt="" className='h-4 w-4 opacity-60' />
                <input type="text" placeholder='Search cars' className='text-sm placeholder:text-slate-400' />
              </div>

              <button onClick={() => { setOpen(false); isOwner ? navigate('/owner') : changeRole() }} className='button-secondary cursor-pointer'>
                {isOwner ? 'Dashboard' : 'List Cars'}
              </button>

              <button onClick={() => { setOpen(false); user ? logout() : setShowLogin(true) }} className='button-primary cursor-pointer'>
                {user ? 'Logout' : 'Login'}
              </button>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.header>
  )
}

export default Navbar
