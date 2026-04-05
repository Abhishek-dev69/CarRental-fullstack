import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion as Motion } from 'motion/react'

const CarDetails = () => {
  const { id } = useParams()
  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate } = useAppContext()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const currency = import.meta.env.VITE_CURRENCY

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/bookings/create', {
        car: id,
        pickupDate,
        returnDate
      })

      if (data.success) {
        toast.success(data.message)
        navigate('/my-bookings')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setCar(cars.find(carItem => carItem._id === id))
  }, [cars, id])

  return car ? (
    <div className='section-shell pb-24 pt-8'>
      <div className='section-frame'>
        <button onClick={() => navigate(-1)} className='mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 cursor-pointer'>
          <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65' />
          Back to all cars
        </button>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:gap-10'>
          <Motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className='space-y-6'>
            <Motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className='relative overflow-hidden rounded-[34px] border border-white/70 bg-slate-950 shadow-[0_24px_60px_rgba(8,17,33,0.18)]'>
              <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%),linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.6))]' />
              <img src={car.image} alt={`${car.brand} ${car.model}`} className='w-full h-auto object-cover md:max-h-[520px]' />
              <div className='absolute left-5 top-5 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md'>
                {car.category}
              </div>
              <div className='absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4 text-white'>
                <div>
                  <h1 className='text-3xl font-semibold md:text-4xl'>{car.brand} {car.model}</h1>
                  <p className='mt-2 text-base text-white/75'>{car.location} • {car.year}</p>
                </div>
                <div className='rounded-[22px] border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md'>
                  <p className='text-xs uppercase tracking-[0.18em] text-white/60'>Starting at</p>
                  <p className='mt-1 text-2xl font-semibold'>{currency}{car.pricePerDay}<span className='text-base font-medium text-white/70'> / day</span></p>
                </div>
              </div>
            </Motion.div>

            <Motion.div className='luxury-card space-y-8 p-6 md:p-8' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                {[
                  { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
                  { icon: assets.fuel_icon, text: car.fuel_type },
                  { icon: assets.car_icon, text: car.transmission },
                  { icon: assets.location_icon, text: car.location },
                ].map(({ icon, text }) => (
                  <Motion.div key={text} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className='rounded-[22px] bg-slate-50 p-4 text-center text-sm font-medium text-slate-700'>
                    <img src={icon} alt="" className='mx-auto mb-2 h-5' />
                    {text}
                  </Motion.div>
                ))}
              </div>

              <div>
                <h2 className='text-2xl font-semibold text-slate-900'>Description</h2>
                <p className='mt-3 text-base leading-8 text-slate-600'>{car.description}</p>
              </div>

              <div>
                <h2 className='text-2xl font-semibold text-slate-900'>Features</h2>
                <ul className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2'>
                  {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((item) => (
                    <li key={item} className='flex items-center rounded-2xl bg-slate-50 px-4 py-3 text-slate-600'>
                      <img src={assets.check_icon} className='mr-2 h-4' alt="" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Motion.div>
          </Motion.div>

          <Motion.form initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} onSubmit={handleSubmit} className='glass-panel h-max rounded-[30px] p-6 text-slate-600 lg:sticky lg:top-28'>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>Secure your reservation</p>
            <h2 className='mt-3 text-3xl font-semibold text-slate-900'>{currency}{car.pricePerDay}<span className='text-base font-medium text-slate-400'> / day</span></h2>
            <p className='mt-2 text-sm leading-7 text-slate-500'>No credit card required to reserve. Confirm your dates and continue to booking.</p>

            <div className='mt-6 space-y-4'>
              <label htmlFor="pickup-date" className='field-shell flex flex-col gap-2'>
                <span className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Pickup Date</span>
                <input value={pickupDate} onChange={(e)=>setPickupDate(e.target.value)} type="date" required id='pickup-date' min={new Date().toISOString().split('T')[0]} />
              </label>

              <label htmlFor="return-date" className='field-shell flex flex-col gap-2'>
                <span className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Return Date</span>
                <input value={returnDate} onChange={(e)=>setReturnDate(e.target.value)} type="date" required id='return-date' />
              </label>
            </div>

            <button className='button-primary mt-6 w-full cursor-pointer rounded-2xl py-3.5'>Book Now</button>

            <div className='mt-6 grid grid-cols-2 gap-3 text-sm text-slate-500'>
              <div className='rounded-2xl bg-slate-50 px-4 py-3'>
                <p className='text-xs uppercase tracking-[0.16em] text-slate-400'>Support</p>
                <p className='mt-1 font-semibold text-slate-800'>24/7 help</p>
              </div>
              <div className='rounded-2xl bg-slate-50 px-4 py-3'>
                <p className='text-xs uppercase tracking-[0.16em] text-slate-400'>Policy</p>
                <p className='mt-1 font-semibold text-slate-800'>Flexible pickup</p>
              </div>
            </div>
          </Motion.form>
        </div>
      </div>
    </div>
  ) : <Loader />
}

export default CarDetails
