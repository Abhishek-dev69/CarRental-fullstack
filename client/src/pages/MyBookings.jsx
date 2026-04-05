import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion as Motion } from 'motion/react'

const MyBookings = () => {
  const { axios, user, currency } = useAppContext()
  const [bookings, setBookings] = useState([])

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user')
      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    user && fetchMyBookings()
  }, [user])

  return (
    <Motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className='section-shell pb-24 pt-8 text-sm'>
      <div className='section-frame'>
        <Title title='My Bookings' subTitle='Review every reservation, its dates, status, and total cost in one place.' align="left" />

        <div className='mt-10 space-y-5'>
          {bookings.map((booking, index) => (
            <Motion.div key={booking._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.4 }} className='luxury-card grid grid-cols-1 gap-6 p-6 md:grid-cols-[1fr_1.1fr_0.7fr]'>
              <div>
                <div className='mb-3 overflow-hidden rounded-[22px]'>
                  <img src={booking.car.image} alt="" className='aspect-video h-auto w-full object-cover' />
                </div>
                <p className='mt-2 text-xl font-semibold text-slate-900'>{booking.car.brand} {booking.car.model}</p>
                <p className='text-slate-500'>{booking.car.year} • {booking.car.category} • {booking.car.location}</p>
              </div>

              <div>
                <div className='flex items-center gap-2'>
                  <p className='rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-600'>Booking #{index + 1}</p>
                  <p className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${booking.status === 'confirmed' ? 'bg-green-400/15 text-green-600' : booking.status === 'pending' ? 'bg-amber-400/15 text-amber-600' : 'bg-red-400/15 text-red-600'}`}>{booking.status}</p>
                </div>

                <div className='mt-4 flex items-start gap-3'>
                  <img src={assets.calendar_icon_colored} alt="" className='mt-1 h-4 w-4' />
                  <div>
                    <p className='text-slate-500'>Rental Period</p>
                    <p>{booking.pickupDate.split('T')[0]} To {booking.returnDate.split('T')[0]}</p>
                  </div>
                </div>

                <div className='mt-4 flex items-start gap-3'>
                  <img src={assets.location_icon_colored} alt="" className='mt-1 h-4 w-4' />
                  <div>
                    <p className='text-slate-500'>Pick-up Location</p>
                    <p>{booking.car.location}</p>
                  </div>
                </div>
              </div>

              <div className='flex flex-col justify-between gap-6 md:items-end'>
                <div className='text-sm text-slate-500 md:text-right'>
                  <p>Total Price</p>
                  <h1 className='text-3xl font-semibold text-primary'>{currency}{booking.price}</h1>
                  <p>Booked on {booking.createdAt.split('T')[0]}</p>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </Motion.div>
  )
}

export default MyBookings
