import React from 'react'

const Title = ({ title, subTitle, align }) => {
  return (
    <div className={`flex flex-col justify-center gap-4 ${align === "left" ? "items-start text-left" : "items-center text-center"}`}>
      <span className='eyebrow'>Curated Fleet</span>
      <div className={`flex w-full ${align === "left" ? "justify-start" : "justify-center"}`}>
        <span className='h-px w-24 bg-gradient-to-r from-primary via-cyan-400 to-transparent' />
      </div>
      <div className='space-y-3'>
        <h1 className='text-4xl font-semibold leading-tight text-slate-900 md:text-[46px]'>{title}</h1>
        <p className='max-w-3xl text-sm leading-7 text-slate-600 md:text-base'>{subTitle}</p>
      </div>
    </div>
  )
}

export default Title
