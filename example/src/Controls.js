import React, { useContext } from 'react'
import Clock from 'react-clock'

export default function Controls ({
  context,
  actions: {
    removeMinute,
    removeHour,
    resetDate,
    changeFormat,
    changeShowSeconds
  }
}) {
  const { date, format, showSeconds } = useContext(context)

  const handleCheckboxChange = () => {
    changeShowSeconds(!showSeconds)
  }

  return (
    <div className='controls'>
      <Clock value={new Date(date)} size={100} className='controls__clock' />
      <div className='controls__group'>
        <div className='controls__buttons'>
          <button onClick={removeMinute}>Minute</button>
          <button onClick={removeHour}>Hour</button>
          <button onClick={resetDate}>Reset Date</button>
        </div>
        <div className='controls__input'>
          <input
            type='text'
            onChange={changeFormat}
            value={format}
            placeholder='Add format'
          />
          <div className='control__checkbox' />
          <label htmlFor='showSeconds' onClick={handleCheckboxChange}>
            <input
              hidden
              type='checkbox'
              name='showSeconds'
              value={showSeconds}
            />
            <span
              role='img'
              aria-label='show seconds option'
              className={showSeconds ? 'is--checked' : 'is--unchecked'}
            >
              ✅
            </span>
            Show seconds?
          </label>
        </div>
      </div>
    </div>
  )
}
