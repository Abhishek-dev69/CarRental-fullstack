import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { motion as Motion } from 'motion/react'

const FeaturedSection = () => {
  const navigate = useNavigate()
  const { cars } = useAppContext()

  return (
    <section className='section-shell py-24'>
      <div className='section-frame'>
        <Motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className='flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
          <Title title='Featured Vehicles' subTitle='Explore our most-requested vehicles, selected for comfort, design, and everyday performance.' align='left' />

          <div className='glass-panel flex flex-wrap gap-5 rounded-[26px] px-5 py-4 text-sm text-slate-600'>
            <div>
              <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Fleet Snapshot</p>
              <p className='mt-1 text-xl font-semibold text-slate-900'>{cars.length} vehicles ready</p>
            </div>
            <div className='h-auto w-px bg-slate-200 max-sm:hidden' />
            <div>
              <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Experience</p>
              <p className='mt-1 text-xl font-semibold text-slate-900'>Luxury, SUV, urban</p>
            </div>
          </div>
        </Motion.div>

        <Motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} className='mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {cars.slice(0, 6).map((car) => (
            <Motion.div key={car._id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}>
              <CarCard car={car} />
            </Motion.div>
          ))}
        </Motion.div>

        <Motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          onClick={() => {
            navigate('/cars')
            scrollTo(0, 0)
          }}
          className='button-secondary mt-12 cursor-pointer'
        >
          Explore all cars <img src={assets.arrow_icon} alt="arrow" />
        </Motion.button>
      </div>
    </section>
  )
}

export default FeaturedSection
