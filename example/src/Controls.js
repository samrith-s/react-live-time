import React from 'react'

export default function Controls ({
  actions: { removeMinute, removeHour, resetDate }
}) {
  return (
    <div className='controls__buttons'>
      <button onClick={removeMinute}>Minute</button>
      <button onClick={removeHour}>Hour</button>
      <button onClick={resetDate}>Reset Date</button>
    </div>
  )
}
