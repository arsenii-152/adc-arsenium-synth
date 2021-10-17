import React, { PureComponent } from 'react'
import * as Tone from 'tone'

import Button from '../components/Button'
import Oscillator from '../components/Oscillator'

export default class SynthContainer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      audioContextStarted: false
    }
  }

playSound = () => {
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now()
  // trigger the attack immediately
  synth.triggerAttack("C4", now)
  // wait one second before triggering the release
  synth.triggerRelease(now + 1)
}

audioContextStart = () => {
 this.setState({
   audioContextStarted: true
 })

}

renderaudioContextStartButton = () => {
  return <Button text="START AUDIO" handleClick={this.audioContextStart} />
}

renderOscillators = () => {
  const { oscillators, audioContext } = this.props
  const oscillatorElements = []

  oscillators.forEach((oscillator, i) => {
    const oscillatorNode = audioContext.createOscillator()

    oscillator.key = i
    oscillator.detune = 0

    oscillatorElements.push(
      <Oscillator
      audioContext={audioContext}
      oscillatorNode={oscillatorNode}
      {...oscillator}
      />
    )
  });

  return oscillatorElements
}

render () {
    const { audioContextStarted } = this.state

    return (
      <div>
      {audioContextStarted === true
         ? this.renderOscillators()
         : this.renderaudioContextStartButton()}
      <Button text="PLAYSOUND" handleClick={this.playSound} />
    </div>
    )
  }
}
