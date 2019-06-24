import React from 'react'
import ReactLiveTime from 'react-live-time'

export default function Basic ({ date, format, showSeconds }) {
  return <ReactLiveTime time={date} format={format} showSeconds={showSeconds} />
}
