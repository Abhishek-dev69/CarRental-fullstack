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
    <Motion.header initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className='sticky top-0 z-50'>
      <div className='apple-nav'>
        <nav className='mx-auto flex h-12 w-full max-w-[1100px] items-center justify-between px-4 text-white md:px-6'>
          <Link to='/'>
            <Motion.img whileHover={{ scale: 1.02 }} src={assets.logo} alt="CarRental logo" className='h-5 brightness-[6]' />
          </Link>

          <div className='hidden items-center gap-6 lg:flex'>
            {menuLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[12px] font-normal tracking-[-0.12px] ${isActive ? 'text-white' : 'text-white/78 hover:text-white'}`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          <div className='hidden items-center gap-4 lg:flex'>
            <button onClick={() => isOwner ? navigate('/owner') : changeRole()} className='text-[12px] font-normal tracking-[-0.12px] text-white/78 cursor-pointer hover:text-white'>
              {isOwner ? 'Dashboard' : 'List Cars'}
            </button>

            <button onClick={() => { user ? logout() : setShowLogin(true) }} className='button-primary cursor-pointer text-[14px]'>
              {user ? 'Logout' : 'Login'}
            </button>
          </div>

          <button className='flex h-10 w-10 items-center justify-center sm:hidden' aria-label="Menu" onClick={() => setOpen(!open)}>
            <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className='brightness-[6]' />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <Motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className='apple-nav sm:hidden'>
            <div className='mx-auto flex max-w-[1100px] flex-col gap-4 px-6 py-5 text-white'>
              {menuLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setOpen(false)} className='text-[17px] font-normal tracking-[-0.374px] text-white'>
                  {link.name}
                </Link>
              ))}

              <button onClick={() => { setOpen(false); isOwner ? navigate('/owner') : changeRole() }} className='text-left text-[17px] font-normal tracking-[-0.374px] text-white cursor-pointer'>
                {isOwner ? 'Dashboard' : 'List Cars'}
              </button>

              <button onClick={() => { setOpen(false); user ? logout() : setShowLogin(true) }} className='button-primary w-fit cursor-pointer'>
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
