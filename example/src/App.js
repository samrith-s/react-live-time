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
        <h1 className='logo'>
          <img
            src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/facebook/158/atom-symbol_269b.png'
            alt='logo'
            width='48'
          />
          React Live-Time
        </h1>
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
