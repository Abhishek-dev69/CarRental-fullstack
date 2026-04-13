import React from 'react'
import { assets } from '../assets/assets'
import { motion as Motion } from 'motion/react'

const Banner = () => {
  return (
    <section className='section-shell py-10'>
      <div className='section-frame'>
        <Motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className='night-card relative overflow-hidden px-8 py-10 md:px-12 md:py-12'>
          <div className='pointer-events-none absolute -left-10 top-0 h-52 w-52 rounded-full bg-primary/30 blur-3xl' />
          <div className='pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl' />

          <div className='grid items-center gap-8 md:grid-cols-[1fr_0.8fr]'>
            <div className='relative z-10 text-white'>
              <span className='inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100'>
                India Owner Network
              </span>
              <h2 className='mt-6 text-3xl font-semibold md:text-4xl'>List your car in high-demand Indian cities and earn from every idle day.</h2>
              <p className='mt-4 max-w-2xl text-base leading-8 text-slate-300'>
                Build an additional income stream with a cleaner dashboard, clearer booking management, and a more premium showcase for your fleet.
              </p>

              <div className='mt-8 flex flex-wrap gap-4 text-sm text-slate-200'>
                <div className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3'>Suitable for city and outstation demand</div>
                <div className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3'>Owner dashboard included</div>
                <div className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3'>Availability and booking controls</div>
              </div>

              <Motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className='mt-8 inline-flex cursor-pointer items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900'>
                Start listing
              </Motion.button>
            </div>

            <Motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} className='relative z-10 flex items-center justify-center'>
              <div className='absolute h-56 w-56 rounded-full bg-white/10 blur-3xl' />
              <img src={assets.banner_car_image} alt="Luxury car showcase" className='relative max-h-56 w-full max-w-md object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]' />
            </Motion.div>
          </div>
        </Motion.div>
      </div>
    </section>
  )
}

export default Banner
