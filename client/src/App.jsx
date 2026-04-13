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
    <div className={isOwnerPath ? 'min-h-screen bg-[#f5f5f7] text-[#1d1d1f]' : 'app-shell'}>
      <Toaster
        position='top-center'
        toastOptions={{
          style: {
            borderRadius: '12px',
            border: '1px solid rgba(0,0,0,0.06)',
            background: '#f5f5f7',
            color: '#1d1d1f',
            boxShadow: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px',
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
