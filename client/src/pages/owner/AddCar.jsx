import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddCar = () => {
  const { axios, currency } = useAppContext()

  const [image, setImage] = useState(null)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (isLoading) return null

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))

      const { data } = await axios.post('/api/owner/add-car', formData)

      if (data.success) {
        toast.success(data.message)
        setImage(null)
        setCar({
          brand: '',
          model: '',
          year: 0,
          pricePerDay: 0,
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: 0,
          location: '',
          description: '',
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='space-y-8'>
      <Title title="Add New Car" subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications." />

      <form onSubmit={onSubmitHandler} className='glass-panel max-w-5xl space-y-6 rounded-[30px] p-6 text-sm text-slate-600 md:p-8'>
        <div className='flex flex-col gap-5 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-400'>Car imagery</p>
            <h2 className='mt-2 text-2xl font-semibold text-slate-900'>Upload a strong first impression</h2>
          </div>

          <label htmlFor="car-image" className='flex cursor-pointer items-center gap-4 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-5 py-4'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded object-cover' />
            <div>
              <p className='font-semibold text-slate-800'>Select cover image</p>
              <p className='text-xs text-slate-500'>PNG or JPG for best results</p>
            </div>
            <input type="file" id="car-image" accept="image/*" hidden onChange={e => setImage(e.target.files[0])} />
          </label>
        </div>

        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          <label className='field-shell flex flex-col gap-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Brand</span>
            <input type="text" placeholder="e.g. BMW, Mercedes, Audi..." required value={car.brand} onChange={e => setCar({ ...car, brand: e.target.value })} />
          </label>
          <label className='field-shell flex flex-col gap-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Model</span>
            <input type="text" placeholder="e.g. X5, E-Class, M4..." required value={car.model} onChange={e => setCar({ ...car, model: e.target.value })} />
          </label>
        </div>

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          <label className='field-shell flex flex-col gap-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Year</span>
            <input type="number" placeholder="2025" required value={car.year} onChange={e => setCar({ ...car, year: e.target.value })} />
          </label>
          <label className='field-shell flex flex-col gap-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Daily Price ({currency})</span>
            <input type="number" placeholder="100" required value={car.pricePerDay} onChange={e => setCar({ ...car, pricePerDay: e.target.value })} />
          </label>
          <label className='field-shell flex flex-col gap-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Category</span>
            <select onChange={e => setCar({ ...car, category: e.target.value })} value={car.category}>
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </label>
        </div>

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          <label className='field-shell flex flex-col gap-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Transmission</span>
            <select onChange={e => setCar({ ...car, transmission: e.target.value })} value={car.transmission}>
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </label>
          <label className='field-shell flex flex-col gap-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Fuel Type</span>
            <select onChange={e => setCar({ ...car, fuel_type: e.target.value })} value={car.fuel_type}>
              <option value="">Select a fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </label>
          <label className='field-shell flex flex-col gap-2'>
            <span className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Seating Capacity</span>
            <input type="number" placeholder="4" required value={car.seating_capacity} onChange={e => setCar({ ...car, seating_capacity: e.target.value })} />
          </label>
        </div>

        <label className='field-shell flex flex-col gap-2'>
          <span className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Location</span>
          <select onChange={e => setCar({ ...car, location: e.target.value })} value={car.location}>
            <option value="">Select a location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Houston">Houston</option>
            <option value="Chicago">Chicago</option>
          </select>
        </label>

        <label className='field-shell flex flex-col gap-2'>
          <span className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Description</span>
          <textarea rows={5} placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine." required value={car.description} onChange={e => setCar({ ...car, description: e.target.value })}></textarea>
        </label>

        <button className='button-primary cursor-pointer px-6 py-3.5'>
          <img src={assets.tick_icon} alt="" />
          {isLoading ? 'Listing...' : 'List Your Car'}
        </button>
      </form>
    </div>
  )
}

export default AddCar
