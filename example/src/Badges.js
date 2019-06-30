import React from 'react'

import BADGES from './badges.json'

export default function Badges () {
  return (
    <div className='badges'>
      {BADGES.map(({ name, link, image }) => (
        <a
          target='_blank'
          rel='nofollow noopener noreferrer'
          href={link}
          key={name}
        >
          <img src={image} alt={name} height='20' />
        </a>
      ))}
    </div>
  )
}
