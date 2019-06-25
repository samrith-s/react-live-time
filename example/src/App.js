import React, { useState } from 'react'

import * as EXAMPLE_TYPES from './types'

import Controls from './Controls'
import Footer from './Footer'
import Post from './Post'

import EXAMPLES from './examples.json'

const Context = React.createContext({})

export default function App () {
  const [date, setDate] = useState(Date.now())
  const [format, setFormat] = useState('dddd, d mmmm yyyy h:MMtt')
  const [showSeconds, setShowSeconds] = useState(false)

  const removeMinute = () => {
    const __d = new Date(date)
    setDate(__d.setMinutes(__d.getMinutes() - 1))
  }

  const removeHour = () => {
    const __d = new Date(date)
    setDate(__d.setHours(__d.getHours() - 1))
  }

  const resetDate = () => {
    setDate(Date.now())
    setFormat('dddd, d mmmm yyyy h:MMtt')
  }

  const changeFormat = e => {
    setFormat(e.target.value)
  }

  const changeShowSeconds = showSeconds => {
    setShowSeconds(showSeconds)
  }

  const renderExamples = () => {
    return EXAMPLES.map(({ type, ...data }) => (
      <Post
        data={data}
        context={Context}
        renderComponent={EXAMPLE_TYPES[type]}
        file={type}
        key={type}
      />
    ))
  }

  return (
    <Context.Provider value={{ date, format, showSeconds }}>
      <main>
        <a className='logo' href={window.location.href} alt='this page'>
          <div className='logo__image' />
          <div className='logo__content'>
            <h1 className='logo__content-heading'>React Live-Time</h1>
            <h2 className='logo__content-heading-sub'>
              A simple time-ago component for React. Made with{' '}
              <span role='img' aria-label='heart-emoji'>
                ❤️
              </span>
              using hooks!
            </h2>
          </div>
        </a>
        <Controls
          actions={{
            removeMinute,
            removeHour,
            resetDate,
            changeFormat,
            changeShowSeconds
          }}
          context={Context}
        />
        {renderExamples()}
        <Footer />
      </main>
    </Context.Provider>
  )
}
