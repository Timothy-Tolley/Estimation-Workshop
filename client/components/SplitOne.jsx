import React from 'react'

class SplitOne extends React.Component {
  render () {
    return (
      <div className = 'spacer-page'>
        <h1 className = 'spacer-text'>
        Please wait for the workshop leader to explain the next steps before clicking <q>Next</q>
        </h1>
        <button className = 'spacer-button' onClick = {() => { location.href = '/group-benefit' }}>
          Next
        </button>
      </div>
    )
  }
}

export default SplitOne
