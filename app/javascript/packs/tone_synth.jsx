import React from 'react'
import ReactDOM from 'react-dom'
import ToneSynthContainer from '../containers/ToneSynthContainer'

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body

  ReactDOM.render(
    <ToneSynthContainer />,
    body.appendChild(document.createElement('div'))
  )
})
