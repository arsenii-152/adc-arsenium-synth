import React, { PureComponent } from 'react'

import Slider from '../control_components/Slider'
import ButtonSet from '../control_components/ButtonSet'
import Knob from '../control_components/Knob'

export default class ToneSynth extends PureComponent {
  constructor(props) {
    super(props)
  }

  updateNodeParams = () => {
    const { node, settings } = this.props
    const { volume, detune, oscillator, envelope } = settings
    const { type } = oscillator
    const { attack, decay, sustain, release } = envelope

    node.volume.value = volume
    node.detune.value = detune
    node.oscillator.type = type
    node.envelope.attack = attack
    node.envelope.decay = decay
    node.envelope.sustain = sustain
    node.envelope.release = release
  }

  handlePropertyValueChange = (property, value) => {
    const { id, handlePropertyValueChange } = this.props
    handlePropertyValueChange(id, property, value)
  }

  render() {
    const { id, settings } = this.props
    const { volume, detune, oscillator, envelope } = settings
    const { type } = oscillator
    const { attack, decay, sustain, release } = envelope

    const oscillatorTypes = ['sine', 'square', 'triangle', 'sawtooth']

    this.updateNodeParams()

    return (
      <div className="ToneSynth">
        <Slider
          name="Volume"
          property={['volume']}
          min={-20}
          max={10}
          step={0.01}
          value={volume}
          handleChange={this.props.handlePropertyValueChange}
        />

        <Knob
          name="Detune"
          property={['detune']}
          min={-100}
          max={100}
          value={detune}
          handleChange={this.props.handlePropertyValueChange}
        />

        <ButtonSet
          name="Type"
          property={['oscillator', 'type']}
          value={type}
          options={oscillatorTypes}
          handleChange={this.props.handlePropertyValueChange}
        />

        <h2>Envelope</h2>

        <Slider
          name="Attack"
          property={['envelope', 'attack']}
          min={0}
          max={1}
          step={0.01}
          value={attack}
          handleChange={this.props.handlePropertyValueChange}
        />

        <Slider
          name="Decay"
          property={['envelope', 'decay']}
          min={0}
          max={1}
          step={0.01}
          value={decay}
          handleChange={this.props.handlePropertyValueChange}
        />

        <Slider
          name="Sustain"
          property={['envelope', 'sustain']}
          min={0}
          max={1}
          step={0.01}
          value={sustain}
          handleChange={this.props.handlePropertyValueChange}
        />

        <Slider
          name="Release"
          property={['envelope', 'release']}
          min={0}
          max={1}
          step={0.01}
          value={release}
          handleChange={this.props.handlePropertyValueChange}
        />
      </div>
    )
  }
}
