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
    { title: 'Choose your city', description: 'Select where you want to collect the car before you compare options.' },
    { title: 'Select your dates', description: 'Add pickup and return dates to see what is available for your trip.' },
    { title: 'Book with clarity', description: 'Check seats, fuel type, transmission, and price before you reserve.' },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
  }

  return (
    <section className='section-shell apple-section-light pt-10 md:pt-16'>
      <div className='section-frame'>
        <div className='pb-24'>
          <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='mx-auto max-w-[920px] text-center'>
            <span className='eyebrow mx-auto'>CarRental India</span>
            <h1 className='apple-hero-title mt-4'>
              Find the right car for your trip, faster.
            </h1>
            <p className='apple-body mx-auto mt-4 max-w-[720px] text-black/80'>
              Choose your pickup city, add dates, and compare verified options for airport pickups, work travel, family outings, and weekend drives across India.
            </p>

            <div className='mt-8 flex flex-wrap items-center justify-center gap-3 apple-caption text-black/80'>
              <div>Available in major Indian cities</div>
              <div>•</div>
              <div>Clear date-based search</div>
              <div>•</div>
              <div>Easy to compare before booking</div>
            </div>

            <div className='mt-10'>
              <p className='apple-caption font-semibold text-black/48'>Popular pickup cities</p>
              <div className='mt-4 flex flex-wrap justify-center gap-2.5'>
                {popularCities.map((city) => (
                  <button
                    key={city}
                    type='button'
                    onClick={() => setPickupLocation(city)}
                    className={`rounded-full px-[15px] py-[8px] text-[14px] tracking-[-0.224px] cursor-pointer ${pickupLocation === city ? 'bg-[#1d1d1f] text-white' : 'border border-black/10 bg-white text-[#1d1d1f]'}`}
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
              className='mx-auto mt-10 flex w-full max-w-[980px] flex-col gap-4 rounded-[8px] bg-white px-4 py-4 shadow-[rgba(0,0,0,0.08)_0px_4px_16px]'
            >
              <div className='grid gap-3 md:grid-cols-3'>
                <label className='field-shell flex flex-col gap-2'>
                  <span className='apple-caption font-semibold text-black/48'>Pickup City</span>
                  <select required value={pickupLocation} onChange={(e)=>setPickupLocation(e.target.value)}>
                    <option value="">Select a city</option>
                    {cityList.map((city)=> <option key={city} value={city}>{city}</option>)}
                  </select>
                </label>

                <label className='field-shell flex flex-col gap-2'>
                  <span className='apple-caption font-semibold text-black/48'>Pickup Date</span>
                  <input value={pickupDate} onChange={e=>setPickupDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split('T')[0]} required />
                </label>

                <label className='field-shell flex flex-col gap-2'>
                  <span className='apple-caption font-semibold text-black/48'>Return Date</span>
                  <input value={returnDate} onChange={e=>setReturnDate(e.target.value)} type="date" id="return-date" required />
                </label>
              </div>

              <div className='flex flex-col items-center justify-between gap-4 md:flex-row md:items-center'>
                <div className='pl-1 apple-caption text-left text-black/48'>
                  <p>{pickupLocation ? `Showing options for ${pickupLocation}` : 'Choose your city and travel dates to see the available fleet.'}</p>
                  <p className='mt-1'>Built to reduce guesswork before you book.</p>
                </div>

                <Motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='button-primary w-full cursor-pointer md:w-auto'>
                  <img src={assets.search_icon} alt="search" className='brightness-300' />
                  Search Cars
                </Motion.button>
              </div>
            </Motion.form>

            <div className='mt-14 grid gap-5 sm:grid-cols-3'>
              {bookingSteps.map((step, index) => (
                <div key={step.title} className='bg-transparent p-2 text-center'>
                  <p className='apple-caption font-semibold text-primary'>Step {index + 1}</p>
                  <h3 className='mt-2 text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-[#1d1d1f]'>{step.title}</h3>
                  <p className='apple-caption mt-2 text-black/80'>{step.description}</p>
                </div>
              ))}
            </div>

            <Motion.div initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.18 }} className='mt-14'>
              <ThreeHero />
            </Motion.div>

            <div className='mt-6 flex flex-wrap items-center justify-center gap-6 apple-caption text-black/48'>
              <div className='flex items-center gap-2'>
                <img src={assets.location_icon} alt="" className='h-4 opacity-70' />
                Pan-India city search
              </div>
              <div className='flex items-center gap-2'>
                <img src={assets.car_icon} alt="" className='h-4 opacity-70' />
                Clear comparison before checkout
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
