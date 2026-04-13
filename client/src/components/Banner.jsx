import React from 'react'
import { assets } from '../assets/assets'
import { motion as Motion } from 'motion/react'

const Banner = () => {
  return (
    <section className='section-shell apple-section-dark py-24'>
      <div className='section-frame'>
        <Motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className='grid items-center gap-12 md:grid-cols-[1fr_0.9fr]'>
          <div className='text-white'>
            <span className='eyebrow text-[#2997ff]'>India Owner Network</span>
            <h2 className='mt-4 text-[40px] font-semibold leading-[1.1] tracking-[-0.28px]'>List your car in high-demand Indian cities and earn from every idle day.</h2>
            <p className='apple-body mt-4 max-w-2xl text-white/80'>
              Build an additional income stream with a cleaner dashboard, clearer booking management, and a more premium showcase for your fleet.
            </p>

            <div className='mt-8 flex flex-wrap gap-4 apple-caption text-white/80'>
              <div>Suitable for city and outstation demand</div>
              <div>•</div>
              <div>Owner dashboard included</div>
              <div>•</div>
              <div>Availability controls</div>
            </div>

            <div className='mt-8 flex flex-wrap gap-4'>
              <Motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='button-primary cursor-pointer'>
                Start listing
              </Motion.button>
              <button className='button-secondary border-[#2997ff] text-[#2997ff] cursor-pointer'>
                Learn more
              </button>
            </div>
          </div>

          <Motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} className='flex items-center justify-center'>
            <img src={assets.banner_car_image} alt="Luxury car showcase" className='max-h-72 w-full max-w-md object-contain' />
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  )
}

export default Banner
