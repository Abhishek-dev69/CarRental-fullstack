import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion as Motion } from 'motion/react'

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate()

  return (
    <Motion.article whileHover={{ y: -6 }} onClick={() => { navigate(`/car-details/${car._id}`); scrollTo(0, 0) }} className='group luxury-card cursor-pointer overflow-hidden'>
      <div className='relative h-56 overflow-hidden bg-slate-950'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_56%),linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.55))]' />
        <img src={car.image} alt={`${car.brand} ${car.model}`} className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110' />

        {car.isAvaliable && <p className='absolute left-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md'>Available Now</p>}

        <div className='absolute bottom-4 right-4 rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-white backdrop-blur-md'>
          <span className='font-semibold'>{currency}{car.pricePerDay}</span>
          <span className='text-sm text-white/80'> / day</span>
        </div>
      </div>

      <div className='p-5 sm:p-6'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-400'>{car.category}</p>
            <h3 className='mt-2 text-2xl font-semibold text-slate-900'>{car.brand} {car.model}</h3>
            <p className='mt-1 text-sm text-slate-500'>{car.year} model year</p>
          </div>
          <div className='rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary'>
            {car.location}
          </div>
        </div>

        <div className='mt-5 grid grid-cols-2 gap-3 text-slate-600'>
          <div className='rounded-2xl bg-slate-50 px-3 py-3 text-sm'>
            <div className='flex items-center gap-2'>
              <img src={assets.users_icon} alt="" className='h-4' />
              <span>{car.seating_capacity} Seats</span>
            </div>
          </div>
          <div className='rounded-2xl bg-slate-50 px-3 py-3 text-sm'>
            <div className='flex items-center gap-2'>
              <img src={assets.fuel_icon} alt="" className='h-4' />
              <span>{car.fuel_type}</span>
            </div>
          </div>
          <div className='rounded-2xl bg-slate-50 px-3 py-3 text-sm'>
            <div className='flex items-center gap-2'>
              <img src={assets.car_icon} alt="" className='h-4' />
              <span>{car.transmission}</span>
            </div>
          </div>
          <div className='rounded-2xl bg-slate-50 px-3 py-3 text-sm'>
            <div className='flex items-center gap-2'>
              <img src={assets.location_icon} alt="" className='h-4' />
              <span>{car.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Motion.article>
  )
}

export default CarCard
