import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { motion as Motion } from 'motion/react'
import ThreeHero from './ThreeHero'

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('')
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
  }

  return (
    <section className='section-shell pb-20 pt-8 md:pb-24'>
      <div className='section-frame'>
        <div className='relative overflow-hidden rounded-[40px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.84),rgba(240,247,255,0.72)_45%,rgba(220,234,255,0.68)_100%)] px-6 py-10 shadow-[0_24px_70px_rgba(8,17,33,0.12)] md:px-10 lg:px-12 lg:py-12'>
          <div className='pointer-events-none absolute -left-16 top-8 h-48 w-48 rounded-full bg-primary/12 blur-3xl' />
          <div className='pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl' />

          <div className='grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]'>
            <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='relative z-10'>
              <span className='eyebrow'>Premium Mobility</span>
              <h1 className='mt-6 max-w-2xl text-5xl font-semibold leading-[1.02] text-slate-950 md:text-6xl'>
                Rent exceptional cars with a luxury-first digital experience.
              </h1>
              <p className='mt-5 max-w-xl text-base leading-8 text-slate-600 md:text-lg'>
                Discover refined vehicles, faster bookings, and a smoother journey from search to pickup.
              </p>

              <div className='mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-600'>
                <div className='rounded-full border border-white/80 bg-white/75 px-4 py-2 shadow-sm'>Instant availability checks</div>
                <div className='rounded-full border border-white/80 bg-white/75 px-4 py-2 shadow-sm'>Premium, SUV, and city-ready cars</div>
                <div className='rounded-full border border-white/80 bg-white/75 px-4 py-2 shadow-sm'>Responsive on every device</div>
              </div>

              <Motion.form
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                onSubmit={handleSearch}
                className='glass-panel mt-10 flex flex-col gap-4 rounded-[30px] p-4 md:p-5'
              >
                <div className='grid gap-3 md:grid-cols-3'>
                  <label className='field-shell flex flex-col gap-2'>
                    <span className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>Location</span>
                    <select required value={pickupLocation} onChange={(e)=>setPickupLocation(e.target.value)}>
                      <option value="">Pickup Location</option>
                      {cityList.map((city)=> <option key={city} value={city}>{city}</option>)}
                    </select>
                  </label>

                  <label className='field-shell flex flex-col gap-2'>
                    <span className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>Pickup Date</span>
                    <input value={pickupDate} onChange={e=>setPickupDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split('T')[0]} required />
                  </label>

                  <label className='field-shell flex flex-col gap-2'>
                    <span className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>Return Date</span>
                    <input value={returnDate} onChange={e=>setReturnDate(e.target.value)} type="date" id="return-date" required />
                  </label>
                </div>

                <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
                  <p className='pl-1 text-sm text-slate-500'>
                    {pickupLocation ? `Pickup in ${pickupLocation}` : 'Choose a city and travel dates to explore the fleet.'}
                  </p>

                  <Motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='button-primary w-full cursor-pointer md:w-auto'>
                    <img src={assets.search_icon} alt="search" className='brightness-300' />
                    Search Cars
                  </Motion.button>
                </div>
              </Motion.form>
            </Motion.div>

            <Motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.18 }} className='relative z-10'>
              <ThreeHero />
            </Motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
