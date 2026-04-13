import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import { motion as Motion } from 'motion/react'

const Testimonial = () => {
  const testimonials = [
    {
      name: "Riya Mehta",
      location: "Mumbai, Maharashtra",
      image: assets.testimonial_image_1,
      testimonial: "The booking flow was clear from the start, and I found a clean SUV for my family trip without having to call three different vendors."
    },
    {
      name: "Arjun Nair",
      location: "Bengaluru, Karnataka",
      image: assets.testimonial_image_2,
      testimonial: "What stood out was how easy it was to compare cars, pickup dates, and features on mobile. It felt modern and straightforward."
    },
    {
      name: "Sneha Kapoor",
      location: "Delhi NCR",
      image: assets.testimonial_image_1,
      testimonial: "I used it for an airport pickup and the experience felt much more premium than the usual rental sites. Fast search, clear details, and no guessing."
    }
  ]

  return (
    <section className="section-shell apple-section-light py-28">
      <div className='section-frame'>
        <Title title="Trusted by Indian renters" subTitle="From airport pickups to weekend drives and work travel, users should understand the booking flow quickly and feel confident before they reserve." />

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
                <img className="h-14 w-14 rounded-[8px] object-cover" src={testimonial.image} alt={testimonial.name} />
                <div>
                  <p className="text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-[#1d1d1f]">{testimonial.name}</p>
                  <p className="apple-caption text-black/48">{testimonial.location}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-1">
                {Array(5).fill(0).map((_, ratingIndex) => (
                  <img key={ratingIndex} src={assets.star_icon} alt="star-icon" />
                ))}
              </div>

              <p className="apple-body mt-5 text-black/80">"{testimonial.testimonial}"</p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonial
