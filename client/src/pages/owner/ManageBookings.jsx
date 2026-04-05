import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageBookings = () => {
  const { currency, axios } = useAppContext()
  const [bookings, setBookings] = useState([])

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/owner')
      data.success ? setBookings(data.bookings) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', { bookingId, status })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerBookings()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  return (
    <div className='space-y-8'>
      <Title title="Manage Bookings" subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses." />

      <div className='glass-panel overflow-hidden rounded-[30px]'>
        <div className='overflow-x-auto'>
          <table className='min-w-full border-collapse text-left text-sm text-slate-600'>
            <thead className='bg-slate-50 text-slate-500'>
              <tr>
                <th className="p-4 font-semibold">Car</th>
                <th className="p-4 font-semibold max-md:hidden">Date Range</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold max-md:hidden">Payment</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className='border-t border-slate-200/80 bg-white/50 text-slate-600'>
                  <td className='p-4'>
                    <div className='flex items-center gap-3'>
                      <img src={booking.car.image} alt="" className='h-14 w-14 rounded-2xl object-cover' />
                      <p className='font-semibold text-slate-900'>{booking.car.brand} {booking.car.model}</p>
                    </div>
                  </td>

                  <td className='p-4 max-md:hidden'>
                    {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}
                  </td>

                  <td className='p-4 font-semibold text-slate-800'>{currency}{booking.price}</td>

                  <td className='p-4 max-md:hidden'>
                    <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500'>offline</span>
                  </td>

                  <td className='p-4'>
                    {booking.status === 'pending' ? (
                      <select onChange={e => changeBookingStatus(booking._id, e.target.value)} value={booking.status} className='rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none'>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    ) : (
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${booking.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {booking.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageBookings
