import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext()
  const location = useLocation()
  const [image, setImage] = useState(null)

  const updateImage = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)

      const { data } = await axios.post('/api/owner/update-image', formData)

      if (data.success) {
        fetchUser()
        toast.success(data.message)
        setImage(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <aside className='w-full lg:max-w-[300px]'>
      <div className='glass-panel rounded-[30px] p-5'>
        <div className='flex flex-col items-center text-center'>
          <div className='group relative'>
            <label htmlFor="image">
              <img src={image ? URL.createObjectURL(image) : user?.image || assets.user_profile} alt="" className='h-20 w-20 rounded-[24px] object-cover shadow-md' />
              <input type="file" id='image' accept="image/*" hidden onChange={e => setImage(e.target.files[0])} />
              <div className='absolute inset-0 hidden items-center justify-center rounded-[24px] bg-black/25 group-hover:flex cursor-pointer'>
                <img src={assets.edit_icon} alt="" />
              </div>
            </label>
          </div>

          <p className='mt-4 text-xl font-semibold text-slate-900'>{user?.name || 'Owner'}</p>
          <p className='mt-1 text-sm text-slate-500'>Manage listings, bookings, and profile settings.</p>

          {image && (
            <button className='button-primary mt-4 cursor-pointer px-5 py-2.5 text-sm' onClick={updateImage}>
              Save image
              <img src={assets.check_icon} width={13} alt="" />
            </button>
          )}
        </div>

        <div className='mt-6 grid gap-2'>
          {ownerMenuLinks.map((link) => {
            const active = link.path === location.pathname
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 rounded-[22px] px-4 py-3 text-sm font-semibold ${active ? 'bg-slate-900 text-white shadow-[0_16px_35px_rgba(15,23,42,0.2)]' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <img src={active ? link.coloredIcon : link.icon} alt={`${link.name} icon`} className={active ? 'brightness-[3]' : ''} />
                <span>{link.name}</span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
