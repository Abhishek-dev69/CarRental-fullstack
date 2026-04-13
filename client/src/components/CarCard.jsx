import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion as Motion } from 'motion/react'

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate()

  return (
    <Motion.article whileHover={{ y: -4 }} onClick={() => { navigate(`/car-details/${car._id}`); scrollTo(0, 0) }} className='group luxury-card cursor-pointer overflow-hidden'>
      <div className='relative h-56 overflow-hidden bg-[#f5f5f7]'>
        <img src={car.image} alt={`${car.brand} ${car.model}`} className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105' />

        {car.isAvaliable && <p className='absolute left-4 top-4 rounded-full bg-white px-[12px] py-[6px] text-[12px] font-semibold tracking-[-0.12px] text-[#1d1d1f] shadow-sm'>Available Now</p>}

        <div className='absolute bottom-4 right-4 rounded-full bg-[#1d1d1f] px-4 py-2 text-white'>
          <span className='font-semibold'>{currency}{car.pricePerDay}</span>
          <span className='text-sm text-white/80'> / day</span>
        </div>
      </div>

      <div className='p-5 sm:p-6'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <p className='apple-caption font-semibold text-black/48'>{car.category}</p>
            <h3 className='mt-2 text-[28px] font-normal leading-[1.14] tracking-[0.196px] text-[#1d1d1f]'>{car.brand} {car.model}</h3>
            <p className='apple-caption mt-1 text-black/80'>{car.year} model year</p>
          </div>
          <div className='rounded-full border border-primary px-3 py-1 text-[12px] font-normal tracking-[-0.12px] text-primary'>
            {car.location}
          </div>
        </div>

        <div className='mt-5 grid grid-cols-2 gap-3 text-black/80'>
          <div className='rounded-[8px] bg-white px-3 py-3 text-sm'>
            <div className='flex items-center gap-2'>
              <img src={assets.users_icon} alt="" className='h-4' />
              <span>{car.seating_capacity} Seats</span>
            </div>
          </div>
          <div className='rounded-[8px] bg-white px-3 py-3 text-sm'>
            <div className='flex items-center gap-2'>
              <img src={assets.fuel_icon} alt="" className='h-4' />
              <span>{car.fuel_type}</span>
            </div>
          </div>
          <div className='rounded-[8px] bg-white px-3 py-3 text-sm'>
            <div className='flex items-center gap-2'>
              <img src={assets.car_icon} alt="" className='h-4' />
              <span>{car.transmission}</span>
            </div>
          </div>
          <div className='rounded-[8px] bg-white px-3 py-3 text-sm'>
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
