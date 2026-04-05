import React from 'react'
import { assets } from '../assets/assets'
import { motion as Motion } from 'motion/react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='section-shell pb-10'>
      <div className='section-frame'>
        <Motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className='glass-panel rounded-[36px] px-6 py-10 text-sm text-slate-500 md:px-10'>
          <div className='grid gap-10 border-b border-slate-200/80 pb-8 lg:grid-cols-[1.1fr_1fr]'>
            <div>
              <img src={assets.logo} alt="CarRental logo" className='h-9' />
              <p className='mt-4 max-w-md text-base leading-8 text-slate-600'>
                Premium car rental service with a visual experience that feels fast, trustworthy, and elevated from the first click to the final booking.
              </p>
              <div className='mt-6 flex items-center gap-3'>
                <a href="#"><img src={assets.facebook_logo} className='h-5 w-5' alt="Facebook" /></a>
                <a href="#"><img src={assets.instagram_logo} className='h-5 w-5' alt="Instagram" /></a>
                <a href="#"><img src={assets.twitter_logo} className='h-5 w-5' alt="Twitter" /></a>
                <a href="#"><img src={assets.gmail_logo} className='h-5 w-5' alt="Email" /></a>
              </div>
            </div>

            <div className='grid gap-8 sm:grid-cols-3'>
              <div>
                <h2 className='text-base font-semibold uppercase tracking-[0.16em] text-slate-800'>Quick Links</h2>
                <ul className='mt-4 flex flex-col gap-2.5'>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/cars">Browse Cars</Link></li>
                  <li><Link to="/my-bookings">My Bookings</Link></li>
                  <li><a href="#">About Us</a></li>
                </ul>
              </div>

              <div>
                <h2 className='text-base font-semibold uppercase tracking-[0.16em] text-slate-800'>Resources</h2>
                <ul className='mt-4 flex flex-col gap-2.5'>
                  <li><a href="#">Help Center</a></li>
                  <li><a href="#">Terms of Service</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Insurance</a></li>
                </ul>
              </div>

              <div>
                <h2 className='text-base font-semibold uppercase tracking-[0.16em] text-slate-800'>Contact</h2>
                <ul className='mt-4 flex flex-col gap-2.5'>
                  <li>1234 Luxury Drive</li>
                  <li>San Francisco, CA 94107</li>
                  <li>+1 234 567890</li>
                  <li>info@example.com</li>
                </ul>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center justify-between gap-3 pt-5 md:flex-row'>
            <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
            <div className='flex items-center gap-4'>
              <a href="#">Privacy</a>
              <span>|</span>
              <a href="#">Terms</a>
              <span>|</span>
              <a href="#">Cookies</a>
            </div>
          </div>
        </Motion.div>
      </div>
    </footer>
  )
}

export default Footer
