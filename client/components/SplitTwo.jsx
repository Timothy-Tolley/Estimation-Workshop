import React from 'react'

class SplitTwo extends React.Component {
  render () {
    return (
      <div className = 'spacer-page'>
        <h1 className = 'spacer-text'>
         Please wait for Graham to explain the next steps before continuing..
        </h1>
        <button className = 'spacer-button' onClick = {() => { location.href = '/cost' }}>
          Next
        </button>
      </div>
    )
  }
}

export default SplitTwo
