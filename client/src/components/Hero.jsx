import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { motion as Motion } from 'motion/react'
import ThreeHero from './ThreeHero'

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('')
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext()
  const popularCities = cityList.slice(0, 6)
  const bookingSteps = [
    { title: 'Choose your city', description: 'Start with the pickup city where you want to collect the car.' },
    { title: 'Select your dates', description: 'Add trip dates to instantly see cars available for that schedule.' },
    { title: 'Book with clarity', description: 'Compare price, transmission, fuel type, and seats before confirming.' },
  ]

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
              <span className='eyebrow'>Built For Indian Travel</span>
              <h1 className='mt-6 max-w-2xl text-5xl font-semibold leading-[1.02] text-slate-950 md:text-6xl'>
                Self-drive and chauffeur-ready rentals across India, without the usual confusion.
              </h1>
              <p className='mt-5 max-w-xl text-base leading-8 text-slate-600 md:text-lg'>
                Search by city, compare verified car details, and book faster for airport pickups, business trips, weekend drives, and family travel.
              </p>

              <div className='mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-600'>
                <div className='rounded-full border border-white/80 bg-white/75 px-4 py-2 shadow-sm'>Instant city-based availability</div>
                <div className='rounded-full border border-white/80 bg-white/75 px-4 py-2 shadow-sm'>SUVs, sedans, and premium options</div>
                <div className='rounded-full border border-white/80 bg-white/75 px-4 py-2 shadow-sm'>Clear, mobile-friendly booking flow</div>
              </div>

              <div className='mt-8'>
                <p className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-400'>Popular pickup cities</p>
                <div className='mt-3 flex flex-wrap gap-2.5'>
                  {popularCities.map((city) => (
                    <button
                      key={city}
                      type='button'
                      onClick={() => setPickupLocation(city)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold cursor-pointer ${pickupLocation === city ? 'bg-slate-900 text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)]' : 'border border-white/80 bg-white/80 text-slate-600 shadow-sm hover:bg-white'}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
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
                    <span className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>Pickup City</span>
                    <select required value={pickupLocation} onChange={(e)=>setPickupLocation(e.target.value)}>
                      <option value="">Select a city</option>
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
                  <div className='pl-1 text-sm text-slate-500'>
                    <p>{pickupLocation ? `Showing options for ${pickupLocation}` : 'Choose your city and travel dates to see the available fleet.'}</p>
                    <p className='mt-1 text-xs text-slate-400'>Best for airport transfers, outstation weekends, city commutes, and family travel.</p>
                  </div>

                  <Motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='button-primary w-full cursor-pointer md:w-auto'>
                    <img src={assets.search_icon} alt="search" className='brightness-300' />
                    Search Cars
                  </Motion.button>
                </div>
              </Motion.form>

              <div className='mt-8 grid gap-3 sm:grid-cols-3'>
                {bookingSteps.map((step, index) => (
                  <div key={step.title} className='rounded-[24px] border border-white/70 bg-white/72 p-4 shadow-sm backdrop-blur-md'>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>Step {index + 1}</p>
                    <h3 className='mt-2 text-lg font-semibold text-slate-900'>{step.title}</h3>
                    <p className='mt-2 text-sm leading-6 text-slate-500'>{step.description}</p>
                  </div>
                ))}
              </div>
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
