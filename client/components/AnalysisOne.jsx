import React from 'react'
import jStat from 'jStat'
import request from 'superagent'
import _ from 'lodash'
import {LineChart, Legend} from 'react-easy-chart'

class AnalysisOne extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      GBgraphData: [],
      GBP10: null,
      GBP50: null,
      GBP90: null,
      GBP92: null,
      ICgraphData: [],
      ICP10: null,
      ICP50: null,
      ICP90: null,
      ICP92: null,
      GCgraphData: [],
      GCP10: null,
      GCP50: null,
      GCP90: null,
      GCP92: null
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
        // GROUP BENEFIT
        // array for group benefit calculations
        let GBArray = [
          res.body.gbd[0].pessimistic,
          res.body.gbd[0].optimistic,
          res.body.gbd[0].likely
        ]
        // mean + stdev
        let gbMean = jStat.mean(GBArray)
        let gbStd = jStat.stdev(GBArray, true)
        let gbMeanMathLog = Math.log(gbMean)
        let gbStdMathLog = Math.log(gbStd)
        // p values
        let GBP10 = jStat.lognormal.inv(0.1, gbMeanMathLog, gbStdMathLog)
        let GBP50 = jStat.lognormal.inv(0.5, gbMeanMathLog, gbStdMathLog)
        let GBP90 = jStat.lognormal.inv(0.9, gbMeanMathLog, gbStdMathLog)
        let GBP92 = jStat.lognormal.inv(0.92, gbMeanMathLog, gbStdMathLog)
        // graph results
        let GBxVals = _.range(0, GBP92, (GBP92 / 500))
        let GByVals = []
        let GBgraphData = GBxVals.map(xVal => {
          let GByVal = jStat.lognormal.pdf(xVal, gbMeanMathLog, gbStdMathLog)
          GByVals.push(GByVal)
          return {x: xVal, y: GByVal}
        })
        let GBMax = Math.max(...GByVals)

        // INDIVIDUAL COST
        // array for ID calculations
        let ICArray = [
          res.body.icd[0].pessimistic,
          res.body.icd[0].optimistic,
          res.body.icd[0].likely
        ]
        // mean + stdev
        let ICMean = jStat.mean(ICArray)
        let ICStDev = jStat.stdev(ICArray, true)
        let ICMeanMathLog = Math.log(ICMean)
        let ICStDevMathLog = Math.log(ICStDev)
        // p values
        let ICP10 = jStat.lognormal.inv(0.1, ICMeanMathLog, ICStDevMathLog)
        let ICP50 = jStat.lognormal.inv(0.5, ICMeanMathLog, ICStDevMathLog)
        let ICP90 = jStat.lognormal.inv(0.9, ICMeanMathLog, ICStDevMathLog)
        let ICP99 = jStat.lognormal.inv(0.99, ICMeanMathLog, ICStDevMathLog)
        // graph results
        let ICxVals = _.range(0, ICP99, (ICP99 / 500))
        let ICyVals = []
        let ICgraphData = ICxVals.map(xVal => {
          let ICyVal = jStat.lognormal.pdf(xVal, ICMeanMathLog, ICStDevMathLog)
          ICyVals.push(ICyVal)
          return {x: xVal, y: ICyVal}
        })
        let ICMax = Math.max(...ICyVals)

        // GROUP COST
        // array for ID calculations
        let GCArray = []
        res.body.gcd.forEach(dataset =>
          GCArray.push(dataset.pessimistic, dataset.optimistic, dataset.likely)
        )
        // mean + stdev
        let GCMean = jStat.mean(GCArray)
        let GCStDev = jStat.stdev(GCArray, true)
        let GCMeanMathLog = Math.log(GCMean)
        let GCStDevMathLog = Math.log(GCStDev)
        // p values
        let GCP10 = jStat.lognormal.inv(0.1, GCMeanMathLog, GCStDevMathLog)
        let GCP50 = jStat.lognormal.inv(0.5, GCMeanMathLog, GCStDevMathLog)
        let GCP90 = jStat.lognormal.inv(0.9, GCMeanMathLog, GCStDevMathLog)
        let GCP99 = jStat.lognormal.inv(0.99, GCMeanMathLog, GCStDevMathLog)
        // graph results
        let GCxVals = _.range(0, GCP99, (GCP99 / 500))
        let GCyVals = []
        let GCgraphData = GCxVals.map(xVal => {
          let GCyVal = jStat.lognormal.pdf(xVal, GCMeanMathLog, GCStDevMathLog)
          GCyVals.push(GCyVal)
          return {x: xVal, y: GCyVal}
        })
        let GCMax = Math.max(...GCyVals)

        // add all to state
        this.setState({
          GBgraphData: GBgraphData,
          GBP10: GBP10,
          GBP50: GBP50,
          GBP90: GBP90,
          GBP92: GBP92,
          GBMax: GBMax,
          ICgraphData: ICgraphData,
          ICP10: ICP10,
          ICP50: ICP50,
          ICP90: ICP90,
          ICP99: ICP99,
          ICMax: ICMax,
          GCgraphData: GCgraphData,
          GCP10: GCP10,
          GCP50: GCP50,
          GCP90: GCP90,
          GCP99: GCP99,
          GCMax: GCMax
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
        <h1 className = 'analysis-text'> Group Benefit vs Individual Cost </h1>
        <Legend
          data= {[
            {
              key: 'Group Benefit Curve',
              color: 'orange'
            }, {
              key: 'Individual Cost Curve',
              color: 'blue'
            }, {
              key: 'P10',
              color: 'cyan'
            }, {
              key: 'P50',
              color: 'red'
            }, {
              key: 'p90',
              color: 'black'
            }
          ]}
          dataId={'key'}
          horizontal
          config = {[
            {color: 'orange'},
            {color: 'blue'},
            {color: 'cyan'},
            {color: 'red'},
            {color: 'black'}
          ]}
          styles = {{
            '.legend': {
              backgroundColor: '#f9f9f9',
              borderRadius: '2px',
              fontSize: '0.8em',
              marginLeft: '40px',
              maxWidth: '50%',
              fontFamily: '"Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif'
            }
          }}/>
        <LineChart
          data={
            [
              this.state.GBgraphData,
              this.state.ICgraphData,
              [{x: this.state.GBP10, y: 0}, {x: this.state.GBP10, y: this.state.GBMax}],
              [{x: this.state.GBP50, y: 0}, {x: this.state.GBP50, y: this.state.GBMax}],
              [{x: this.state.GBP90, y: 0}, {x: this.state.GBP90, y: this.state.GBMax}]
            ]
          }
          width={1000}
          height={400}
          margin={{top: 40, right: 5, bottom: 30, left: 100}}
          axes
          axisLabels={{x: 'X Axis', y: 'Y Axis'}}
          interpolate={'cardinal'}
          grid
          verticalGrid
          lineColors={['orange', 'blue', 'cyan', 'red', 'black']}
          xDomainRange={[0, (this.state.GBP90 + 10000)]}
          xTicks={10}
          yTicks={10}
        />
        <h1 className = 'analysis-text'> Group Benefit vs Group Cost </h1>
        <Legend
          data= {[
            {
              key: 'Group Benefit Curve',
              color: 'orange'
            }, {
              key: 'Group Cost Curve',
              color: 'green'
            }, {
              key: 'P10',
              color: 'cyan'
            }, {
              key: 'P50',
              color: 'red'
            }, {
              key: 'p90',
              color: 'black'
            }
          ]}
          dataId={'key'}
          horizontal
          config = {[
            {color: 'orange'},
            {color: 'green'},
            {color: 'cyan'},
            {color: 'red'},
            {color: 'black'}
          ]}
          styles = {{
            '.legend': {
              backgroundColor: '#f9f9f9',
              borderRadius: '2px',
              fontSize: '0.8em',
              marginLeft: '40px',
              maxWidth: '50%',
              fontFamily: '"Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif'
            }
          }}/>
        <LineChart
          data={
            [
              this.state.GBgraphData,
              this.state.GCgraphData,
              [{x: this.state.GBP10, y: 0}, {x: this.state.GBP10, y: this.state.GBMax}],
              [{x: this.state.GBP50, y: 0}, {x: this.state.GBP50, y: this.state.GBMax}],
              [{x: this.state.GBP90, y: 0}, {x: this.state.GBP90, y: this.state.GBMax}]
            ]
          }
          width={1000}
          height={400}
          margin={{top: 40, right: 5, bottom: 30, left: 100}}
          axes
          axisLabels={{x: 'X Axis', y: 'Y Axis'}}
          interpolate={'cardinal'}
          grid
          verticalGrid
          lineColors={['orange', 'green', 'cyan', 'red', 'black']}
          xDomainRange={[0, (this.state.GBP90 + 10000)]}
          xTicks={10}
          yTicks={10}
        />

        <button className = 'spacer-button' onClick = {() => { location.href = '/element-estimations' }}>
          Next
        </button>
      </div>
    )
  }
}

export default AnalysisOne
