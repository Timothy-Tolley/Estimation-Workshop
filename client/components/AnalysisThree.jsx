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
    const analysisThreeUrl = `/api/v1/brier/${userId}`
    request
      .get(analysisThreeUrl)
      .then(res => {
        this.setState({
          brierScore1: res.body[0].brier1,
          brierScore2: res.body[0].brier2
        })
      })
  }

  render () {
    return (
      <div className = 'analysis-page'>
        <h1 className = 'analysis-text'>
          Your Original Score: {this.state.brierScore1}
          <br/>
          Your Score After Training: {this.state.brierScore2}
        </h1>
        <button className = 'spacer-button' onClick = {() => { location.href = '/final' }}>
          Next
        </button>
      </div>
    )
  }
}

export default AnalysisThree
