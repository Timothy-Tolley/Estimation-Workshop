import React from 'react'
import request from 'superagent'

class AnalysisThree extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      brierScore1: null,
      brierScore2: null
    }
    this.setDecimalPlaces = this.setDecimalPlaces.bind(this)
  }

  setDecimalPlaces (number) {
    let numberString = number.toString()
    if (numberString.length > 4) {
      return number.toFixed(3)
    } else return number.toFixed(2)
  }

  componentDidMount () {
    const userId = localStorage.getItem('user_id')
    const analysisThreeUrl = `/api/v1/brier/${userId}`
    request
      .get(analysisThreeUrl)
      .then(res => {
        const brierFull1 = res.body[0].brier1
        const brierShort1 = this.setDecimalPlaces(brierFull1)
        const brierFull2 = res.body[0].brier2
        const brierShort2 = this.setDecimalPlaces(brierFull2)
        this.setState({
          brierScore1: brierShort1,
          brierScore2: brierShort2
        })
      })
  }

  render () {
    return (
      <div className = 'analysis-page'>
        <h1 className = 'analysis-text'>
          Your Score After Training: {this.state.brierScore2}
          <br/>
          <br/>
          Your Score Before Training was: {this.state.brierScore1}
        </h1>
        <br/>
        <button className = 'spacer-button' onClick = {() => { location.href = '/final' }}>
          Next
        </button>
      </div>
    )
  }
}

export default AnalysisThree
