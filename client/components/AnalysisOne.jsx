import React from 'react'
import request from 'superagent'
import jStat from 'jStat'

class AnalysisOne extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      groupBenefitPess: null,
      groupBenefitOpt: null,
      groupBenefitLikely: null,
      groupBenefitChance: null,
      groupBenefitMean: null,
      groupBenefitStDev: null,
      individualCost: [],
      groupCostPess: [],
      groupCostOpt: [],
      groupCostLikely: []
    }
  }

  componentDidMount () {
    const groupId = localStorage.getItem('group_id')
    const userId = localStorage.getItem('user_id')
    const analysisOneUrl = 'http://localhost:3000/api/v1/estimation/analysis-one'
    request
      .get(analysisOneUrl)
      .query({
        group: groupId,
        user: userId
      })
      .then(res => {
        let gcp = res.body.gcd.map(dataSet => {
          return dataSet.pessimistic
        })
        let gco = res.body.gcd.map(dataSet => {
          return dataSet.optimistic
        })
        let gcl = res.body.gcd.map(dataSet => {
          return dataSet.likely
        })
        let groupBeneArray = [
          res.body.gbd[0].pessimistic,
          res.body.gbd[0].optimistic,
          res.body.gbd[0].likely
        ]
        let mean = jStat.mean(groupBeneArray)
        let std = jStat.stdev(groupBeneArray, true)
        let p10 = jStat.lognormal.inv(0.1, mean, std)
        let p50 = jStat.lognormal.inv(0.5, mean, std)
        let p90 = jStat.lognormal.inv(0.9, mean, std)
        // let p100 = jStat.lognormal.inv(0.99, mean, std)
        let graphData = []
        graphData.push([jStat.lognormal.pdf(10, mean, std), 10])
        this.setState({
          groupBenefitPess: res.body.gbd[0].pessimistic,
          groupBenefitOpt: res.body.gbd[0].optimistic,
          groupBenefitLikely: res.body.gbd[0].likely,
          groupBenefitChance: res.body.gbd[0].chance_of_success,
          groupBenefitMean: mean,
          groupBenefitStDev: std,
          groupBeneGraphData: graphData,
          groupBenefitP10: p10,
          groupBenefitP50: p50,
          groupBenefitP90: p90,
          individualCost: res.body.icd,
          groupCostPess: gcp,
          groupCostOpt: gco,
          groupCostLikely: gcl
        })
      })
    // eslint-disable-next-line no-console
      .catch(err => console.error(err))
  }

  render () {
    return (
      <div className = 'analysis-page'>
        <h1 className = 'analysis-text'>
          Analysis One
        </h1>
        <h1 className = 'analysis-text'>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - MEAN = {this.state.groupBenefitMean}
          </p>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - STANDARD DEVIATION = {this.state.groupBenefitStDev}
          </p>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - P10 = {this.state.groupBenefitP10}
          </p>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - P50 = {this.state.groupBenefitP50}
          </p>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - P90 = {this.state.groupBenefitP90}
          </p>
        </h1>
        <h1 className = 'analysis-text'>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - Pessimistic = {this.state.groupBenefitPess}
          </p>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - Optimistic = {this.state.groupBenefitOpt}
          </p>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - Likely = {this.state.groupBenefitLikely}
          </p>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - Chance of Success = {this.state.groupBenefitChance}
          </p>
        </h1>
        <h1 className = 'analysis-text'>
          {this.state.individualCost.map((cost, idx) => {
            return (
              <div key = {idx}>
                <p className = 'analysis-text-small' >
                  Cost Estimate Individual - Pessimistic = {cost.pessimistic}
                </p>
                <p className = 'analysis-text-small' >
                  Cost Estimate Individual - Optimistic = {cost.optimistic}
                </p>
                <p className = 'analysis-text-small' >
                  Cost Estimate Individual - Likely = {cost.likely}
                </p>
              </div>
            )
          })}
        </h1>

        <h1 className = 'analysis-text'>
          <p className = 'analysis-text-small' >
            Pessimistic results (group)
          </p>
          {this.state.groupCostPess.map((data, idx) => {
            return (
              <div key = {idx}>
                <p className = 'analysis-text-small' >
                  {data}
                </p>
              </div>
            )
          })}
        </h1>

        <h1 className = 'analysis-text'>
          <p className = 'analysis-text-small' >
            Optimistic results (group)
          </p>
          {this.state.groupCostOpt.map((data, idx) => {
            return (
              <div key = {idx}>
                <p className = 'analysis-text-small' >
                  {data}
                </p>
              </div>
            )
          })}
        </h1>

        <h1 className = 'analysis-text'>
          <p className = 'analysis-text-small' >
            Likely results (group)
          </p>
          {this.state.groupCostLikely.map((data, idx) => {
            return (
              <div key = {idx}>
                <p className = 'analysis-text-small' >
                  {data}
                </p>
              </div>
            )
          })}
        </h1>

        <button className = 'spacer-button' onClick = {() => { location.href = 'http://localhost:3000/element-estimations' }}>
          Next
        </button>
      </div>
    )
  }
}

export default AnalysisOne
