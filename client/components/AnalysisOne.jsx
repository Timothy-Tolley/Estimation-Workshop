import React from 'react'
import jStat from 'jStat'
import request from 'superagent'
import {VictoryChart, VictoryLine, VictoryContainer} from 'victory'
import _ from 'lodash'
import {LineChart} from 'react-easy-chart'

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
      groupBeneGraphData: [],
      individualCost: [],
      groupCostPess: [],
      groupCostOpt: [],
      groupCostLikely: [],
      groupBenefitP10: null,
      groupBenefitP50: null,
      groupBenefitP90: null,
      groupBenefitP100: null,
      lognormalPDFp99: null,
      lognormalPDFp50: null,
      lognormalPDFp10: null,
      lognormalPDFp90: null
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
        let meanMathLog = Math.log(mean)
        let stdMathLog = Math.log(std)
        // p values
        let p10 = jStat.lognormal.inv(0.1, meanMathLog, stdMathLog)
        let p50 = jStat.lognormal.inv(0.5, meanMathLog, stdMathLog)
        let p90 = jStat.lognormal.inv(0.9, meanMathLog, stdMathLog)
        let p99 = jStat.lognormal.inv(0.99, meanMathLog, stdMathLog)
        // log mean and stDev
        // let logMean = jStat.lognormal.mean(mean, std)
        // let logVariance = jStat.lognormal.variance(mean, std)
        // let logStDev = Math.sqrt(logVariance)
        //
        let pdfp99 = jStat.lognormal.pdf(p99, meanMathLog, stdMathLog)
        // graph results
        let xVals = _.range(0, p99, (p99 / 1000))
        let graphData = xVals.map(xVal => {
          let yVal = jStat.lognormal.pdf(xVal, meanMathLog, stdMathLog)
          return {x: xVal, y: yVal}
        })

        // add all to state
        this.setState({
          groupBenefitPess: res.body.gbd[0].pessimistic,
          groupBenefitOpt: res.body.gbd[0].optimistic,
          groupBenefitLikely: res.body.gbd[0].likely,
          groupBenefitChance: res.body.gbd[0].chance_of_success,
          groupBenefitMean: meanMathLog,
          groupBenefitStDev: stdMathLog,
          groupBeneGraphData: graphData,
          groupBenefitP10: p10,
          groupBenefitP50: p50,
          groupBenefitP90: p90,
          groupBenefitP100: p99,
          individualCost: res.body.icd,
          groupCostPess: gcp,
          groupCostOpt: gco,
          groupCostLikely: gcl,
          lognormalPDFp99: pdfp99
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
          Victory Chart - x axis range - 0 - 4,000,000
        </h1>
        <VictoryChart maxDomain = {{x: 4000000}} height={400} width={900} padding={100}
          containerComponent={<VictoryContainer responsive={false}/>}
        >
          <VictoryLine
            data={this.state.groupBeneGraphData}
            style={{data: {stroke: '#c43a31', strokeWidth: 0.5}}}
          />

        </VictoryChart>
        <h1 className = 'analysis-text'>
          React Easy Chart - x axis range - 0 - 400,000
        </h1>
        <LineChart
          data={
            [
              this.state.groupBeneGraphData,
              [{x: this.state.groupBenefitP90, y: 0}, {x: this.state.groupBenefitP90, y: 0.0000004}],
              [{x: this.state.groupBenefitP10, y: 0}, {x: this.state.groupBenefitP10, y: 0.0000004}],
              [{x: this.state.groupBenefitP50, y: 0}, {x: this.state.groupBenefitP50, y: 0.0000004}]
            ]
          }
          width={900}
          height={400}
          margin={{top: 10, right: 30, bottom: 30, left: 100}}
          axes
          axisLabels={{x: 'X Axis', y: 'Y Axis'}}
          interpolate={'cardinal'}
          grid
          verticalGrid
          lineColors={['pink', 'cyan', 'red', 'black']}
          xDomainRange={[0, 400000]}
        />

        <h1 className = 'analysis-text'>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - MEAN (Log)= {this.state.groupBenefitMean}
          </p>
          <p className = 'analysis-text-small' >
                  Benefit Estimate Group - STANDARD DEVIATION (Log)= {this.state.groupBenefitStDev}
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
                  Benefit Estimate Group - lognormal.pdf where x: p100 --- y: {this.state.lognormalPDFp99}
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
