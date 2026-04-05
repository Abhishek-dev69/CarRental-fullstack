import React from 'react'

const Title = ({ title, subTitle }) => {
  return (
    <div className='space-y-3'>
      <span className='eyebrow'>Owner Console</span>
      <div>
        <h1 className='text-3xl font-semibold text-slate-900 md:text-4xl'>{title}</h1>
        <p className='mt-2 max-w-3xl text-sm leading-7 text-slate-600 md:text-base'>{subTitle}</p>
      </div>
    </div>
  )
}

export default Title
