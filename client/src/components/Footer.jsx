import React from 'react'
import { assets } from '../assets/assets'
import { motion as Motion } from 'motion/react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='section-shell bg-white pb-10'>
      <div className='section-frame'>
        <Motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className='border-t border-black/10 px-0 py-10 text-sm text-black/48'>
          <div className='grid gap-10 border-b border-black/10 pb-8 lg:grid-cols-[1.1fr_1fr]'>
            <div>
              <img src={assets.logo} alt="CarRental logo" className='h-9' />
              <p className='apple-body mt-4 max-w-md text-black/80'>
                Premium car rental service for Indian cities, built to make search, comparison, and booking feel faster, clearer, and more trustworthy.
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
                <h2 className='apple-caption font-semibold text-[#1d1d1f]'>Quick Links</h2>
                <ul className='mt-4 flex flex-col gap-2.5'>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/cars">Browse Cars</Link></li>
                  <li><Link to="/my-bookings">My Bookings</Link></li>
                  <li><a href="#">About Us</a></li>
                </ul>
              </div>

              <div>
                <h2 className='apple-caption font-semibold text-[#1d1d1f]'>Resources</h2>
                <ul className='mt-4 flex flex-col gap-2.5'>
                  <li><a href="#">Help Center</a></li>
                  <li><a href="#">Terms of Service</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Insurance</a></li>
                </ul>
              </div>

              <div>
                <h2 className='apple-caption font-semibold text-[#1d1d1f]'>Contact</h2>
                <ul className='mt-4 flex flex-col gap-2.5'>
                  <li>Indiranagar Mobility Hub</li>
                  <li>Bengaluru, Karnataka 560038</li>
                  <li>+91 80 4567 8900</li>
                  <li>hello@carrental.in</li>
                </ul>
              </div>
            </div>
          </div>

          <div className='apple-caption flex flex-col items-center justify-between gap-3 pt-5 md:flex-row'>
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
