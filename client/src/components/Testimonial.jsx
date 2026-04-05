import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import { motion as Motion } from 'motion/react'

const Testimonial = () => {
  const testimonials = [
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial: "I've rented cars from various companies, but the experience with CarRental was exceptional."
    },
    {
      name: "John Smith",
      location: "New York, USA",
      image: assets.testimonial_image_2,
      testimonial: "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!"
    },
    {
      name: "Ava Johnson",
      location: "Sydney, Australia",
      image: assets.testimonial_image_1,
      testimonial: "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service."
    }
  ]

  return (
    <section className="section-shell py-28">
      <div className='section-frame'>
        <Title title="Trusted by modern travelers" subTitle="The platform should feel as polished as the vehicles it offers, so every interaction reinforces speed, trust, and premium service." />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
              key={testimonial.name}
              className="luxury-card p-7"
            >
              <div className="flex items-center gap-4">
                <img className="h-14 w-14 rounded-2xl object-cover" src={testimonial.image} alt={testimonial.name} />
                <div>
                  <p className="text-lg font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-1">
                {Array(5).fill(0).map((_, ratingIndex) => (
                  <img key={ratingIndex} src={assets.star_icon} alt="star-icon" />
                ))}
              </div>

              <p className="mt-5 text-base leading-8 text-slate-600">"{testimonial.testimonial}"</p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonial
