import React from 'react'
import ReactLiveTime from 'react-live-time'

export default function CustomStyle ({ date, format, showSeconds }) {
  return (
    <span
      className='custom__style'
      style={{
        color: 'purple'
      }}
    >
      <ReactLiveTime time={date} format={format} showSeconds={showSeconds} />
    </span>
  )
}
