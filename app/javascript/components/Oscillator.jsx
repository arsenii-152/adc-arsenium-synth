import React, { PureComponent } from 'react'
import Button from './Button'
import Slider from './Slider'



export default class Oscillator extends PureComponent {
  constructor(props) {
    super(props)

    const { audioContext, oscillatorNode, frequency, detune } = props

    oscillatorNode.type = 'square'
    oscillatorNode.frequency.setValueAtTime(frequency, audioContext.currentTime)

    this.state = {
      started: false,
      frequency,
      detune
    }


  }
   handleStart = () => {
    const { audioContext, oscillatorNode } = this.props
    const { started } = this.state

    oscillatorNode.connect(audioContext.destination)

    if (started === false) {
      oscillatorNode.start()

      this.setState({
        started: true
      })
    }
  }
   handleStop = () => {
    const { audioContext, oscillatorNode } = this.props


    oscillatorNode.disconnect(audioContext.destination)
  }

handleFrequencyChange = (frequency) => {
  const { audioContext, oscillatorNode } = this.props
  oscillatorNode.frequency.setValueAtTime(frequency,audioContext.currentTime)

  this.setState({
    frequency
  })
}

handleDetuneChange = (detune) => {
  const { audioContext, oscillatorNode } = this.props
  oscillatorNode.detune.setValueAtTime(detune,audioContext.currentTime)

  this.setState ({
    detune
  })
}

render () {
    const { oscillatorNode } = this.props
    const {  frequency, detune } = this.state


    return (
     <div>
      <Button text="START" handleClick={this.handleStart} />
      <Button text="STOP" handleClick={this.handleStop} />
      <Slider min="0" max="1320" value={frequency} handleChange={this.handleFrequencyChange} />
      <Slider min="-100" max="100" value={detune} handleChange={this.handleDetuneChange} />


    </div>
  )
  }
}
