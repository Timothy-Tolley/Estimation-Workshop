import React from 'react'
import request from 'superagent'

class AnalysisThree extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      brierScore1: null,
      brierScore2: null
    }
  }

  componentDidMount () {
    const userId = localStorage.getItem('user_id')
    const analysisThreeUrl = `https://estimation-workshop.herokuapp.com/api/v1/brier/${userId}`
    request
      .get(analysisThreeUrl)
      .then(res => {
        this.setState({
          brierScore1: res.body.brier_one,
          brierScore2: res.body.brier_two
        })
      })
  }

  render () {
    return (
      <div className = 'analysis-page'>
        <h1 className = 'analysis-text'>
          Your Original Score: {this.state.brierScore1}
        </h1>
        <h1 className = 'analysis-text'>
          Your Score After Training: {this.state.brierScore1}
        </h1>
        <button className = 'spacer-button' onClick = {() => { location.href = 'https://estimation-workshop.herokuapp.com/final' }}>
          Next
        </button>
      </div>
    )
  }
}

export default AnalysisThree
