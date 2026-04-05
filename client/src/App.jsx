import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CarDetails from './pages/CarDetails'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ManageCars from './pages/owner/ManageCars'
import ManageBookings from './pages/owner/ManageBookings'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {
  const location = useLocation()
  const {showLogin} = useAppContext()
  const isOwnerPath = location.pathname.startsWith('/owner')

  return (
    <div className={isOwnerPath ? 'min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#edf2f7_100%)] text-slate-900' : 'app-shell'}>
      {!isOwnerPath && (
        <div className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
          <div className='absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/12 blur-3xl' />
          <div className='absolute right-0 top-24 h-80 w-80 rounded-full bg-cyan-300/18 blur-3xl' />
          <div className='absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-slate-200/70 blur-3xl' />
        </div>
      )}

      <Toaster
        position='top-center'
        toastOptions={{
          style: {
            borderRadius: '18px',
            border: '1px solid rgba(255,255,255,0.65)',
            background: 'rgba(255,255,255,0.88)',
            color: '#0f172a',
            boxShadow: '0 16px 40px rgba(15, 23, 42, 0.12)',
            backdropFilter: 'blur(16px)',
          },
        }}
      />
      {showLogin && <Login/>}

      {!isOwnerPath && <Navbar/>}

      <main className='relative'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/car-details/:id' element={<CarDetails/>}/>
          <Route path='/cars' element={<Cars/>}/>
          <Route path='/my-bookings' element={<MyBookings/>}/>
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />}/>
            <Route path="add-car" element={<AddCar />}/>
            <Route path="manage-cars" element={<ManageCars />}/>
            <Route path="manage-bookings" element={<ManageBookings />}/>
          </Route>
        </Routes>
      </main>

      {!isOwnerPath && <Footer />}
    </div>
  )
}

export default App
