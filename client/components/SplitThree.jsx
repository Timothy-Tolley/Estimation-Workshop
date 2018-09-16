import React from 'react'
import request from 'superagent'

class SplitTwo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      brier: null
    }
    this.setDecimalPlaces = this.setDecimalPlaces.bind(this)
  }

  setDecimalPlaces (number) {
    let num = Number(number)
    let numberString = num.toString()
    if (numberString.length > 4) {
      return num.toFixed(3)
    } else return num.toFixed(2)
  }

  componentDidMount () {
    const userId = localStorage.getItem('user_id')
    const url = `/api/v1/brier/trivia-one/${userId}`
    request
      .get(url)
      .then(res => {
        const brierFull = res.body.brier_score_total
        const brierShort = this.setDecimalPlaces(brierFull)
        this.setState({
          brier: brierShort
        })
      })
  }

  render () {
    return (
      <div className = 'spacer-page'>
        <h1 className = 'spacer-text'>
          Your Brier Score for those questions is: {this.state.brier}
          <br/>
          Please wait for your workshop leader to explain the next steps before continuing..
        </h1>
        <button className = 'spacer-button' onClick = {() => { location.href = '/trivia-two' }}>
          Next
        </button>
      </div>
    )
  }
}

export default SplitTwo
