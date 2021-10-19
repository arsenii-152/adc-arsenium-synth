import React, { PureComponent } from 'react'
import * as Tone from 'tone'

import Button from '../control_components/Button'
import ToneSynth from '../module_components/ToneSynth'

export default class SynthContainer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      webAudioStarted: false,
      instruments: []
    }
  }

  startWebAudio = () => {
    Tone.start()
    const instruments = this.initInstruments()

    this.setState({
      webAudioStarted: true,
      instruments
    })
  }

  generateUniqId = () => {
    return Math.floor(Math.random() * Date.now())
  }

  renderToneStartButton = () => {
    return <Button text="START" handleClick={this.startWebAudio} />
  }

  initInstruments = () => {
    const synthSettings = {
      volume: 0.8,
      detune: 0,
      portamento: 0.05,
      envelope: {
        attack: 0.05,
        attackCurve: 'exponential',
        decay: 0.2,
        decayCurve: 'exponential',
        sustain: 0.2,
        release: 1.5,
        releaseCurve: 'exponential'
      },
      oscillator: {
        type: 'triangle',
        modulationType: 'sine',
        // partialCount: 0,
        // partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    }

    const synthNode = new Tone.Synth(synthSettings).toDestination()

    const instruments = [
      {
        id: this.generateUniqId(),
        type: 'ToneSynth',
        node: synthNode,
        settings: synthSettings
      }
    ]

    // prettier-ignore
    const seq = new Tone.Sequence(
      (time, note) => {
        synthNode.triggerAttackRelease(note, 0.1, time)
        // subdivisions are given as subarrays
      },
      [
        'C4', 'E4', 'G4', 'A4', 'C4', 'E4', 'G4', 'A4',
        ['C4', 'C4'], ['E4', 'E4'], ['G4', 'G4'], ['A4', 'A4'], ['C4', 'C4'], ['E4', 'E4'], ['G4', 'G4'], ['A4', 'A4'],
        ['C4', null, null, null], [null, null, 'E4', null], [null, null, 'G4', null], [null, null, null, null], ['C4', 'C4', 'C4', 'C4'], ['E4', 'E4', 'E4', 'E4'], ['G4', 'G4', 'G4', 'G4'], ['A4', 'A4', 'A4', 'A4']
      ]
    ).start(0)

    Tone.Transport.bpm.value = 60
    Tone.Transport.start()

    return instruments
  }

  handlePropertyValueChange = (property, value) => {
    const instruments = []

    this.state.instruments.forEach((instrument, i) => {
      const { type, node, settings } = instrument

      const newInstrument = {
        type: type,
        node: node,
        settings: Object.assign({}, settings)
      }

      if (property.length === 1) {
        newInstrument.settings[property] = value
      } else if (property.length === 2) {
        newInstrument.settings[property[0]][property[1]] = value
      }
      instruments.push(newInstrument)
    })

    this.setState({
      instruments
    })
  }

  renderSynthRoom = () => {
    const { instruments } = this.state

    return (
      <div>
        <ToneSynth
          id={instruments[0].id}
          node={instruments[0].node}
          settings={instruments[0].settings}
          handlePropertyValueChange={this.handlePropertyValueChange}
        />
      </div>
    )
  }

  render() {
    const { webAudioStarted } = this.state

    return (
      <div>
        {webAudioStarted === true
          ? this.renderSynthRoom()
          : this.renderToneStartButton()}
      </div>
    )
  }
}
