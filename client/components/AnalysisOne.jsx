import React from 'react'
import jStat from 'jStat'
import request from 'superagent'

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
      groupCostLikely: [],
      groupBenefitP10: null,
      groupBenefitP50: null,
      groupBenefitP90: null,
      groupBenefitP100: null,
      groupBeneLogMean: null,
      groupBeneLogStDev: null,
      lognormalPDF10: null,
      lognormalPDF5: null,
      lognormalPDF1: null,
      lognormalPDFp100: null

    }
  }

  componentDidMount () {
    const groupId = localStorage.getItem('group_id')
    const userId = localStorage.getItem('user_id')
    const analysisOneUrl = '/api/v1/estimation/analysis-one'
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
        // array for group benefit calculations
        let groupBeneArray = [
          res.body.gbd[0].pessimistic,
          res.body.gbd[0].optimistic,
          res.body.gbd[0].likely
        ]
        // regular mean + stdev
        let mean = jStat.mean(groupBeneArray)
        let std = jStat.stdev(groupBeneArray, true)
        // p values
        let p10 = jStat.lognormal.inv(0.1, mean, std)
        let p50 = jStat.lognormal.inv(0.5, mean, std)
        let p90 = jStat.lognormal.inv(0.9, mean, std)
        let p100 = jStat.lognormal.inv(0.99, mean, std)
        // log mean and stDev
        let logMean = jStat.lognormal.mean(mean, std)
        let logVariance = jStat.lognormal.variance(mean, std)
        let logStDev = Math.sqrt(logVariance)
        // graph results
        let pdf1 = jStat.lognormal.pdf(0.1, mean, std)
        let pdf5 = jStat.lognormal.pdf(0.5, mean, std)
        let pdf10 = jStat.lognormal.pdf(1, mean, std)
        let pdfp100 = jStat.lognormal.pdf(p100, mean, std)
        // //graph array - in progress
        // let graphData = []
        // graphData.push([jStat.lognormal.pdf(10, logMean, logStDev), 10])

        // add all to state
        this.setState({
          groupBenefitPess: res.body.gbd[0].pessimistic,
          groupBenefitOpt: res.body.gbd[0].optimistic,
          groupBenefitLikely: res.body.gbd[0].likely,
          groupBenefitChance: res.body.gbd[0].chance_of_success,
          groupBenefitMean: mean,
          groupBenefitStDev: std,
          // groupBeneGraphData: graphData,
          groupBenefitP10: p10,
          groupBenefitP50: p50,
          groupBenefitP90: p90,
          groupBenefitP100: p100,
          groupBeneLogMean: logMean,
          groupBeneLogStDev: logStDev,
          individualCost: res.body.icd,
          groupCostPess: gcp,
          groupCostOpt: gco,
          groupCostLikely: gcl,
          lognormalPDF10: pdf10,
          lognormalPDF5: pdf5,
          lognormalPDF1: pdf1,
          lognormalPDFp100: pdfp100
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
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - P100 = {this.state.groupBenefitP100}
          </p>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - logMean = {this.state.groupBeneLogMean}
          </p>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - logStDev = {this.state.groupBeneLogStDev}
          </p>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - lognormal.pdf where x: 1 --- y: {this.state.lognormalPDF10}
          </p>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - lognormal.pdf where x: 0.5 --- y: {this.state.lognormalPDF5}
          </p>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - lognormal.pdf where x: 0.1 --- y: {this.state.lognormalPDF1}
          </p>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - lognormal.pdf where x: p100 --- y: {this.state.lognormalPDFp100}
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

        <button className = 'spacer-button' onClick = {() => { location.href = '/element-estimations' }}>
          Next
        </button>
      </div>
    )
  }
}

export default AnalysisOne
