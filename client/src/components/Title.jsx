import React from 'react'

const Title = ({ title, subTitle, align }) => {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center"
  const headingClass = align === "left" ? "apple-section-title text-left" : "apple-section-title"
  const bodyClass = align === "left" ? "apple-body text-left text-black/80" : "apple-body text-center text-black/80"

  return (
    <div className={`flex flex-col justify-center gap-3 ${alignment}`}>
      <span className='eyebrow'>CarRental India</span>
      <div className='space-y-3'>
        <h1 className={headingClass}>{title}</h1>
        <p className={`${bodyClass} max-w-3xl`}>{subTitle}</p>
      </div>
    </div>
  )
}

export default Title
