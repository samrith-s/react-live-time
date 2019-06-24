import React from 'react'
import ReactLiveTime from 'react-live-time'

export default function CustomRenderer ({ date, format, showSeconds }) {
  const customRenderer = ({ text, status }) => {
    let emoji, info

    switch (status) {
      default:
      case 'fresh': {
        emoji = '😎'
        info = 'WOW!!'
        break
      }

      case 'psec': {
        emoji = '🤓'
        info = 'The clock is ticking!'
        break
      }

      case 'pmin': {
        emoji = '😌'
        info = 'Its been a while'
        break
      }

      case 'phr': {
        emoji = '🤨'
        info = 'Hmm..'
        break
      }

      case 'static': {
        emoji = '🙃'
        info = 'Well, now its over'
        break
      }
    }

    return (
      <span>
        {emoji} {info} ({text})
      </span>
    )
  }

  return (
    <ReactLiveTime
      time={date}
      format={format}
      showSeconds={showSeconds}
      renderer={customRenderer}
    />
  )
}
