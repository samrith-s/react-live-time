import React from 'react'

export default function Footer () {
  return (
    <footer>
      <p>
        For formatting date, check out{' '}
        <a
          href='https://github.com/felixge/node-dateformat#mask-options'
          rel='noopener noreferrer'
          target='_blank'
        >
          mask options
        </a>{' '}
        and{' '}
        <a
          href='https://github.com/felixge/node-dateformat#named-formats'
          rel='noopener noreferrer'
          target='_blank'
        >
          named formats
        </a>
        . <br />
        Powered by{' '}
        <a
          href='https://github.com/felixge/node-dateformat'
          rel='noopener noreferrer'
          target='_blank'
        >
          dateformat
        </a>
        .
      </p>
      <p>
        Made with{' '}
        <span role='img' aria-label='Heart emoji'>
          ❤️
        </span>{' '}
        using Hooks
      </p>
    </footer>
  )
}
