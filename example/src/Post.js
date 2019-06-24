import React, { useContext } from 'react'

export default function Post ({
  data: { image, description },
  file,
  context,
  renderComponent: LiveTimeComponent
}) {
  const { date, format, showSeconds } = useContext(context)
  console.log('data', date)

  return (
    <div className='post'>
      <div className='post__file'>
        <span role='img' aria-label='post file icon'>
          🗃
        </span>
        <a href='#' rel='noopener noreferrer' target='_blank'>
          example/types/{file}.js
        </a>
      </div>
      <div className='post__content'>
        <div className='post__profile-info'>
          <a
            href='https://twitter.com/tueieo'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://avatars0.githubusercontent.com/u/9032162?s=400&u=22380f9a8b469dbb2563e1880f558826783e3c47&v=4'
              alt='samrith-pic'
            />
            samrith-s
          </a>{' '}
          posted this photo somewhere on the internet.
        </div>
        <div
          className='post__photo'
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className='post__photo-description'>{description}</div>
      </div>
      <div className='post__time'>
        Uploaded{' '}
        <LiveTimeComponent
          date={date}
          format={format}
          showSeconds={showSeconds}
        />
      </div>
    </div>
  )
}