import React, { PureComponent } from 'react'
import Button from './Button'
import Slider from './Slider'



export default class Oscillator extends PureComponent {
  constructor(props) {
    super(props)

    const { audioContext, oscillatorNode, frequency } = props

    oscillatorNode.type = 'square'
    oscillatorNode.frequency.setValueAtTime(frequency, audioContext.currentTime)

    this.state = {
      started: false
    }

    console.log(oscillatorNode)

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
}

handleDetuneChange = (detune) => {
  const { audioContext, oscillatorNode } = this.props
  oscillatorNode.detune.setValueAtTime(detune,audioContext.currentTime)
}

render () {
    const { oscillatorNode, frequency } = this.props

    return (
     <div>
      <Button text="START" handleClick={this.handleStart} />
      <Button text="STOP" handleClick={this.handleStop} />
      <Slider min="0" max="1320" value={oscillatorNode.frequency.value} handleChange={this.handleFrequencyChange} />
      <Slider min="-100" max="100" value={oscillatorNode.detune.value} handleChange={this.handleDetuneChange} />


    </div>
  )
  }
}
