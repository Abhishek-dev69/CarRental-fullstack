import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion as Motion } from 'motion/react'

const Dashboard = () => {
  const { axios, isOwner, currency } = useAppContext()

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored },
    { title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored },
  ]

  const fetchDashboardData = async () => {
    try {
      const { data: response } = await axios.get('/api/owner/dashboard')
      if (response.success) {
        setData(response.dashboardData)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData()
    }
  }, [isOwner])

  return (
    <div className='space-y-8'>
      <Title title="Admin Dashboard" subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities." />

      <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-4'>
        {dashboardCards.map((card, index) => (
          <Motion.div key={card.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} className='glass-panel rounded-[26px] p-5'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-400'>{card.title}</p>
                <p className='mt-3 text-3xl font-semibold text-slate-900'>{card.value}</p>
              </div>
              <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10'>
                <img src={card.icon} alt="" className='h-6 w-6' />
              </div>
            </div>
          </Motion.div>
        ))}
      </div>

      <div className='grid gap-6 xl:grid-cols-[1.2fr_0.8fr]'>
        <div className='glass-panel rounded-[30px] p-6'>
          <h2 className='text-2xl font-semibold text-slate-900'>Recent Bookings</h2>
          <p className='mt-2 text-sm text-slate-500'>Latest customer activity across your fleet.</p>

          <div className='mt-6 space-y-4'>
            {data.recentBookings.map((booking, index) => (
              <Motion.div key={booking._id || index} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.06 }} className='flex flex-col gap-4 rounded-[24px] bg-slate-50 p-4 md:flex-row md:items-center md:justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10'>
                    <img src={assets.listIconColored} alt="" className='h-5 w-5' />
                  </div>
                  <div>
                    <p className='font-semibold text-slate-800'>{booking.car.brand} {booking.car.model}</p>
                    <p className='text-sm text-slate-500'>{booking.createdAt.split('T')[0]}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <p className='font-semibold text-slate-800'>{currency}{booking.price}</p>
                  <p className='rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500'>
                    {booking.status}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>

        <div className='night-card px-6 py-8'>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-400'>Monthly Revenue</p>
          <p className='mt-4 text-5xl font-semibold'>{currency}{data.monthlyRevenue}</p>
          <p className='mt-4 max-w-sm text-sm leading-7 text-slate-300'>
            Revenue generated this month from bookings confirmed through your owner dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
