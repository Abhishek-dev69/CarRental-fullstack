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
    <section className='section-shell bg-white py-24'>
      <div className='section-frame'>
        <Motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className='flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
          <Title title='Featured Vehicles' subTitle='Explore our most-requested vehicles, selected for comfort, design, and everyday performance.' align='left' />

          <div className='flex flex-wrap gap-5 rounded-[8px] bg-[#f5f5f7] px-5 py-4 text-black/80'>
            <div>
              <p className='apple-caption font-semibold text-black/48'>Fleet Snapshot</p>
              <p className='mt-1 text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-[#1d1d1f]'>{cars.length} vehicles ready</p>
            </div>
            <div className='h-auto w-px bg-black/10 max-sm:hidden' />
            <div>
              <p className='apple-caption font-semibold text-black/48'>Experience</p>
              <p className='mt-1 text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-[#1d1d1f]'>City, premium, outstation</p>
            </div>
          </div>
        </Motion.div>

        <Motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} className='mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {cars.slice(0, 6).map((car) => (
            <Motion.div key={car._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
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
