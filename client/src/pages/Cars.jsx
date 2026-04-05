import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion as Motion } from 'motion/react'

const Cars = () => {
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const { cars, axios } = useAppContext()

  const [input, setInput] = useState('')
  const isSearchData = pickupLocation && pickupDate && returnDate
  const [filteredCars, setFilteredCars] = useState([])

  const applyFilter = async () => {
    if (input === '') {
      setFilteredCars(cars)
      return null
    }

    const filtered = cars.slice().filter((car) => {
      return car.brand.toLowerCase().includes(input.toLowerCase())
      || car.model.toLowerCase().includes(input.toLowerCase())
      || car.category.toLowerCase().includes(input.toLowerCase())
      || car.transmission.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)
  }

  const searchCarAvailablity = async () => {
    const { data } = await axios.post('/api/bookings/check-availability', { location: pickupLocation, pickupDate, returnDate })
    if (data.success) {
      setFilteredCars(data.availableCars)
      if (data.availableCars.length === 0) {
        toast('No cars available')
      }
      return null
    }
  }

  useEffect(() => {
    isSearchData && searchCarAvailablity()
  }, [])

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter()
  }, [input, cars])

  return (
    <div className='section-shell pb-24 pt-8'>
      <div className='section-frame'>
        <Motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className='glass-panel rounded-[34px] px-6 py-10 md:px-10'>
          <div className='flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
            <Title title='Available Cars' subTitle='Browse a premium lineup of vehicles and refine by model, category, or drivetrain.' align='left' />

            <div className='glass-panel flex max-w-xl items-center gap-3 rounded-full px-4 py-3'>
              <img src={assets.search_icon} alt="" className='h-4 w-4 opacity-60' />
              <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Search by make, model, or features' className='w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400' />
              <img src={assets.filter_icon} alt="" className='h-4 w-4 opacity-60' />
            </div>
          </div>

          {isSearchData && (
            <div className='mt-6 flex flex-wrap gap-3 text-sm text-slate-500'>
              <div className='rounded-full bg-slate-100 px-4 py-2'>Location: {pickupLocation}</div>
              <div className='rounded-full bg-slate-100 px-4 py-2'>Pickup: {pickupDate}</div>
              <div className='rounded-full bg-slate-100 px-4 py-2'>Return: {returnDate}</div>
            </div>
          )}
        </Motion.div>

        <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className='mt-10'>
          <div className='flex items-center justify-between gap-4'>
            <p className='text-sm font-medium uppercase tracking-[0.16em] text-slate-500'>Showing {filteredCars.length} cars</p>
          </div>

          {filteredCars.length > 0 ? (
            <div className='mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {filteredCars.map((car, index) => (
                <Motion.div key={car._id || index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * index, duration: 0.35 }}>
                  <CarCard car={car} />
                </Motion.div>
              ))}
            </div>
          ) : (
            <div className='luxury-card mt-6 rounded-[30px] px-6 py-10 text-center text-slate-500'>
              No matching vehicles found for the current filter.
            </div>
          )}
        </Motion.div>
      </div>
    </div>
  )
}

export default Cars
