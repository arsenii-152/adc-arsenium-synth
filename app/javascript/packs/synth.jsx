import React from 'react'
import ReactDOM from 'react-dom'
import SynthContainer from '../containers/SynthContainer'

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body
  const props = JSON.parse(body.dataset.props)
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()

  ReactDOM.render(
    <SynthContainer oscillators={props} audioContext={audioContext} />,
    body.appendChild(document.createElement('div')),
  )
})
