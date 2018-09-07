import React from 'react'
import request from 'superagent'
import jStat from 'jStat'

class AnalysisTwo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pess: [],
      opt: [],
      likely: [],
      pesstotal: null,
      optTotal: null,
      likeTotal: null,
      wbsMean: null,
      wbsStDev: null,
      wbsP10: null,
      wbsP50: null,
      wbsP90: null
    }
  }

  componentDidMount () {
    const userId = localStorage.getItem('user_id')
    const analysisTwoUrl = `/api/v1/estimation/analysis-two/${userId}`
    request
      .get(analysisTwoUrl)
      .then(res => {
        let pTot = res.body[0].pessimistic_one + res.body[0].pessimistic_two + res.body[0].pessimistic_three + res.body[0].pessimistic_four + res.body[0].pessimistic_five
        let oTot = res.body[0].optimistic_one + res.body[0].optimistic_two + res.body[0].optimistic_three + res.body[0].optimistic_four + res.body[0].optimistic_five
        let lTot = res.body[0].likely_one + res.body[0].likely_two + res.body[0].likely_three + res.body[0].likely_four + res.body[0].likely_five
        let wbsEstimates = [
          pTot,
          oTot,
          lTot
        ]
        let wMean = jStat.mean(wbsEstimates)
        let wStDev = jStat.stdev(wbsEstimates, true)
        let wp10 = jStat.lognormal.inv(0.1, wMean, wStDev)
        let wp50 = jStat.lognormal.inv(0.5, wMean, wStDev)
        let wp90 = jStat.lognormal.inv(0.9, wMean, wStDev)
        this.setState({
          pess: [
            res.body[0].pessimistic_one,
            res.body[0].pessimistic_two,
            res.body[0].pessimistic_three,
            res.body[0].pessimistic_four,
            res.body[0].pessimistic_five
          ],
          opt: [
            res.body[0].optimistic_one,
            res.body[0].optimistic_two,
            res.body[0].optimistic_three,
            res.body[0].optimistic_four,
            res.body[0].optimistic_five
          ],
          likely: [
            res.body[0].likely_one,
            res.body[0].likely_two,
            res.body[0].likely_three,
            res.body[0].likely_four,
            res.body[0].likely_five
          ],
          pesstotal: pTot,
          optTotal: oTot,
          likeTotal: lTot,
          wbsMean: wMean,
          wbsStDev: wStDev,
          wbsP10: wp10,
          wbsP50: wp50,
          wbsP90: wp90
        })
      })
  }

  render () {
    return (
      <div className = 'analysis-page'>

        <h1 className = 'analysis-text'>
          <p className = 'analysis-text-small' >
                  Elements Estimation - Pessimistic Total Cost = {this.state.pesstotal}
          </p>
          <p className = 'analysis-text-small' >
                  Elements Estimation - Optimistic Total Cost = {this.state.optTotal}
          </p>
          <p className = 'analysis-text-small' >
                  Elements Estimation - Likely Total Cost = {this.state.likeTotal}
          </p>
          <p className = 'analysis-text-small' >
                  Elements Estimation - MEAN = {this.state.wbsMean}
          </p>
          <p className = 'analysis-text-small' >
                  Elements Estimation - STANDARD DEVIATION = {this.state.wbsStDev}
          </p>
          <p className = 'analysis-text-small' >
                  Elements Estimation - P10 = {this.state.wbsP10}
          </p>
          <p className = 'analysis-text-small' >
                  Elements Estimation - P50 = {this.state.wbsP50}
          </p>
          <p className = 'analysis-text-small' >
                  Elements Estimation - P90 = {this.state.wbsP90}
          </p>
        </h1>
        <h1 className = 'analysis-text'>

        </h1>
        <button className = 'spacer-button' onClick = {() => { location.href = '/trivia-one' }}>
          Next
        </button>
      </div>
    )
  }
}

export default AnalysisTwo
