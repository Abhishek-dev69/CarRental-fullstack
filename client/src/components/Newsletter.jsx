import React from 'react'
import { motion as Motion } from 'motion/react'

const Newsletter = () => {
  return (
    <section className='section-shell pb-32 pt-8'>
      <div className='section-frame'>
        <Motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="night-card mx-auto max-w-5xl px-6 py-12 text-center md:px-10">
          <Motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-3xl font-semibold md:text-5xl">
            Stay ahead of new arrivals and limited offers.
          </Motion.h1>

          <Motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300">
            Subscribe for curated updates, premium fleet drops, and special pricing windows.
          </Motion.p>

          <Motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <input
              className="min-h-14 w-full rounded-full border border-white/15 bg-white/10 px-5 text-white outline-none placeholder:text-slate-400"
              type="text"
              placeholder="Enter your email id"
              required
            />
            <button type="submit" className="button-primary min-h-14 cursor-pointer sm:px-8">
              Subscribe
            </button>
          </Motion.form>
        </Motion.div>
      </div>
    </section>
  )
}

export default Newsletter
