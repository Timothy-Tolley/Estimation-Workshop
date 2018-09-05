import React from 'react'
import request from 'superagent'

class SplitTwo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      brier: null
    }
  }

  componentDidMount () {
    const userId = localStorage.getItem('user_id')
    const url = `https://estimation-workshop.herokuapp.com/api/v1/brier/trivia-one/${userId}`
    request
      .get(url)
      .then(res =>
        this.setState({
          brier: res.body
        }))
  }

  render () {
    return (
      <div className = 'spacer-page'>
        <h1 className = 'spacer-text'>
         Your Current Brier Score is: {this.state.brier}
        </h1>
        <h1 className = 'spacer-text'>
         Please wait for Graham to explain the next steps before continuing..
        </h1>
        <button className = 'spacer-button' onClick = {() => { location.href = 'https://estimation-workshop.herokuapp.com/trivia-two' }}>
          Next
        </button>
      </div>
    )
  }
}

export default SplitTwo
