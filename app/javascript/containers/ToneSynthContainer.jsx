import React, { PureComponent } from 'react'
import * as Tone from 'tone'

import Button from '../components/Button'
import Slider from '../components/Slider'

let synthInstrument, distortionEffect

export default class SynthContainer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      toneStarted: false,
      distortion: 0.8
    }
  }

  handleToneStart = () => {
    Tone.start()

    this.setState({
      toneStarted: true
    })
  }

  handleDistortionChange = (value) => {
    distortionEffect.distortion = value

    this.setState({
      distortion: value
    })
  }

  renderToneStartButton = () => {
    return <Button text="START" handleClick={this.handleToneStart} />
  }

  renderToneSynth = () => {
    const { distortion } = this.state

    synthInstrument = new Tone.Synth()

    synthInstrument.oscillator.type = 'sawtooth'
    synthInstrument.oscillator.partials = [0.5, 0.5, 0.5]
    synthInstrument.oscillator.phase = 100
    synthInstrument.envelope.attack = 0.0
    synthInstrument.envelope.decay = 0.1
    synthInstrument.envelope.sustain = 0.9
    synthInstrument.envelope.release = 0.9

    distortionEffect = new Tone.Distortion({
      distortion: distortion,
      oversample: 'none'
    }).toDestination()

    synthInstrument.connect(distortionEffect)

    const seq = new Tone.Sequence(
      (time, note) => {
        synthInstrument.triggerAttackRelease(note, 0.1, time)
        // subdivisions are given as subarrays
      },
      ['C4', 'E4', 'G4', ['A4', 'C3']]
    ).start(0)

    Tone.Transport.start()

    return (
      <Slider
        min={0}
        max={1}
        value={distortion}
        handleChange={this.handleDistortionChange}
      />
    )
  }

  render() {
    const { toneStarted } = this.state

    return (
      <div>
        {toneStarted === true
          ? this.renderToneSynth()
          : this.renderToneStartButton()}
      </div>
    )
  }
}
