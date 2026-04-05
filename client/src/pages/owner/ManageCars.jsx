import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageCars = () => {
  const { isOwner, axios, currency } = useAppContext()
  const [cars, setCars] = useState([])

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get('/api/owner/cars')
      if (data.success) {
        setCars(data.cars)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this car?')
      if (!confirm) return null

      const { data } = await axios.post('/api/owner/delete-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isOwner && fetchOwnerCars()
  }, [isOwner])

  return (
    <div className='space-y-8'>
      <Title title="Manage Cars" subTitle="View all listed cars, update their details, or remove them from the booking platform." />

      <div className='glass-panel overflow-hidden rounded-[30px]'>
        <div className='overflow-x-auto'>
          <table className='min-w-full border-collapse text-left text-sm text-slate-600'>
            <thead className='bg-slate-50 text-slate-500'>
              <tr>
                <th className="p-4 font-semibold">Car</th>
                <th className="p-4 font-semibold max-md:hidden">Category</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold max-md:hidden">Status</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr key={index} className='border-t border-slate-200/80 bg-white/50'>
                  <td className='p-4'>
                    <div className='flex items-center gap-3'>
                      <img src={car.image} alt="" className="h-14 w-14 rounded-2xl object-cover" />
                      <div>
                        <p className='font-semibold text-slate-900'>{car.brand} {car.model}</p>
                        <p className='text-xs text-slate-500'>{car.seating_capacity} seats • {car.transmission}</p>
                      </div>
                    </div>
                  </td>

                  <td className='p-4 max-md:hidden'>{car.category}</td>
                  <td className='p-4 font-semibold text-slate-800'>{currency}{car.pricePerDay}/day</td>

                  <td className='p-4 max-md:hidden'>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${car.isAvaliable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {car.isAvaliable ? "Available" : "Unavailable"}
                    </span>
                  </td>

                  <td className='p-4'>
                    <div className='flex items-center gap-2'>
                      <button onClick={() => toggleAvailability(car._id)} className='flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 cursor-pointer'>
                        <img src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt="Toggle availability" />
                      </button>

                      <button onClick={() => deleteCar(car._id)} className='flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 cursor-pointer'>
                        <img src={assets.delete_icon} alt="Delete car" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageCars
