import React from 'react'
import { motion as Motion } from 'motion/react'

const Newsletter = () => {
  return (
    <section className='section-shell apple-section-dark py-28'>
      <div className='section-frame'>
        <Motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mx-auto max-w-[760px] text-center">
          <Motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="apple-section-title text-white md:text-[48px]">
            Stay updated on new arrivals and limited offers.
          </Motion.h1>

          <Motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="apple-body mx-auto mt-4 max-w-2xl text-white/80">
            Get updates on premium fleet drops, city launches, and special pricing windows.
          </Motion.p>

          <Motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <input
              className="min-h-12 w-full rounded-full border border-white/20 bg-transparent px-5 text-white outline-none placeholder:text-white/50"
              type="text"
              placeholder="Enter your email id"
              required
            />
            <button type="submit" className="button-primary min-h-12 cursor-pointer sm:px-8">
              Subscribe
            </button>
          </Motion.form>
        </Motion.div>
      </div>
    </section>
  )
}

export default Newsletter
