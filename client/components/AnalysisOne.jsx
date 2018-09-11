import React from 'react'
import jStat from 'jStat'
import request from 'superagent'
import _ from 'lodash'
import {AreaChart, Legend} from 'react-easy-chart'

class AnalysisOne extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false,
      GBgraphData: [],
      GBP10: null,
      GBP50: null,
      GBP90: null,
      GBP99: null,
      GBMax: null,
      ICgraphData: [],
      ICP10: null,
      ICP50: null,
      ICP90: null,
      ICP99: null,
      ICMax: null,
      GCgraphData: [],
      GCP10: null,
      GCP50: null,
      GCP90: null,
      GCP99: null,
      GCMax: null,
      GBGCMax: null
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
          Math.log(res.body.gbd[0].pessimistic),
          Math.log(res.body.gbd[0].optimistic),
          Math.log(res.body.gbd[0].likely)
        ]
        // mean + stdev
        let gbMean = jStat.mean(GBArray)
        let gbStd = jStat.stdev(GBArray, true)
        // let gbMeanMathLog = Math.log(gbMean)
        // let gbStdMathLog = Math.log(gbStd)
        // p values
        let GBP10 = jStat.lognormal.inv(0.1, gbMean, gbStd)
        let GBP50 = jStat.lognormal.inv(0.5, gbMean, gbStd)
        let GBP90 = jStat.lognormal.inv(0.9, gbMean, gbStd)
        let GBP99 = jStat.lognormal.inv(0.99, gbMean, gbStd)
        // graph results
        let GBxVals = _.range(0, GBP99, (GBP99 / 100))
        let GByVals = []
        let GBgraphData = GBxVals.map(xVal => {
          let GByVal = jStat.lognormal.pdf(xVal, gbMean, gbStd)
          GByVals.push(GByVal)
          return {x: xVal, y: GByVal}
        })
        let GBMax = Math.max(...GByVals)

        // INDIVIDUAL COST
        // array for ID calculations
        let ICArray = [
          Math.log(res.body.icd[0].pessimistic),
          Math.log(res.body.icd[0].optimistic),
          Math.log(res.body.icd[0].likely)
        ]
        // mean + stdev
        let ICMean = jStat.mean(ICArray)
        let ICStDev = jStat.stdev(ICArray, true)
        // let ICMeanMathLog = Math.log(ICMean)
        // let ICStDevMathLog = Math.log(ICStDev)
        // p values
        let ICP10 = jStat.lognormal.inv(0.1, ICMean, ICStDev)
        let ICP50 = jStat.lognormal.inv(0.5, ICMean, ICStDev)
        let ICP90 = jStat.lognormal.inv(0.9, ICMean, ICStDev)
        let ICP99 = jStat.lognormal.inv(0.99, ICMean, ICStDev)
        // graph results
        let ICxVals = _.range(0, ICP99, (ICP99 / 100))
        let ICyVals = []
        let ICgraphData = ICxVals.map(xVal => {
          let ICyVal = jStat.lognormal.pdf(xVal, ICMean, ICStDev)
          ICyVals.push(ICyVal)
          return {x: xVal, y: ICyVal}
        })
        let ICMax = Math.max(...ICyVals)
        let GImaxs = [ICMax, GBMax]
        let GBICmax = Math.max(...GImaxs)

        // GROUP COST
        // array for ID calculations
        let GCArray = []
        res.body.gcd.forEach(dataset =>
          GCArray.push(Math.log(dataset.pessimistic), Math.log(dataset.optimistic), Math.log(dataset.likely))
        )
        // mean + stdev
        let GCMean = jStat.mean(GCArray)
        let GCStDev = jStat.stdev(GCArray, true)
        // let GCMeanMathLog = Math.log(GCMean)
        // let GCStDevMathLog = Math.log(GCStDev)
        // p values
        let GCP10 = jStat.lognormal.inv(0.1, GCMean, GCStDev)
        let GCP50 = jStat.lognormal.inv(0.5, GCMean, GCStDev)
        let GCP90 = jStat.lognormal.inv(0.9, GCMean, GCStDev)
        let GCP99 = jStat.lognormal.inv(0.99, GCMean, GCStDev)
        // graph results
        let GCxVals = _.range(0, GCP99, (GCP99 / 100))
        let GCyVals = []
        let GCgraphData = GCxVals.map(xVal => {
          let GCyVal = jStat.lognormal.pdf(xVal, GCMean, GCStDev)
          GCyVals.push(GCyVal)
          return {x: xVal, y: GCyVal}
        })
        let GCMax = Math.max(...GCyVals)
        let GGmaxs = [GCMax, GBMax]
        let GBGCmax = Math.max(...GGmaxs)

        // add all to state
        this.setState({
          active: true,
          GBgraphData: GBgraphData,
          GBP10: GBP10,
          GBP50: GBP50,
          GBP90: GBP90,
          GBP99: GBP99,
          GBMax: GBMax,
          ICgraphData: ICgraphData,
          ICP10: ICP10,
          ICP50: ICP50,
          ICP90: ICP90,
          ICP99: ICP99,
          ICMax: ICMax,
          GBICMax: GBICmax,
          GCgraphData: GCgraphData,
          GCP10: GCP10,
          GCP50: GCP50,
          GCP90: GCP90,
          GCP99: GCP99,
          GCMax: GCMax,
          GBGCMax: GBGCmax
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
        {this.state.active && <div>
          <Legend
            data= {[
              {
                key: 'Group Benefit Curve',
                color: 'red'
              }, {
                key: 'Individual Cost Curve',
                color: 'lightBlue'
              }, {
                key: 'Group Benefit P10',
                color: 'cyan'
              }, {
                key: 'Group Benefit P50',
                color: 'yellow'
              }, {
                key: 'Group Benefit p90',
                color: 'green'
              }
            ]}
            dataId={'key'}
            horizontal
            config = {[
              {color: 'red'},
              {color: 'lightBlue'},
              {color: 'cyan'},
              {color: 'yellow'},
              {color: 'green'}
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
          <AreaChart
            areaColors={['red', 'lightBlue', 'cyan', 'yellow', 'green']}
            noAreaGradient
            data={
              [
                this.state.GBgraphData,
                this.state.ICgraphData,
                [{x: this.state.GBP10, y: 0}, {x: this.state.GBP10, y: this.state.GBICMax}],
                [{x: this.state.GBP50, y: 0}, {x: this.state.GBP50, y: this.state.GBICMax}],
                [{x: this.state.GBP90, y: 0}, {x: this.state.GBP90, y: this.state.GBICMax}]
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

            xTicks={10}
            yTicks={10}
          />
          <h1 className = 'analysis-text'>
            <p className = 'analysis-text-small' >
                  Group Benefit p 10 (Chance Adjusted) - {this.state.GBP10}
            </p>
            <p className = 'analysis-text-small' >
                  Group Benefit p 50 (Chance Adjusted) - {this.state.GBP50}
            </p>
            <p className = 'analysis-text-small' >
                  Group Benefit p 90 (Chance Adjusted) - {this.state.GBP90}
            </p>
          </h1>
          <h1 className = 'analysis-text'> Group Benefit vs Group Cost </h1>
          <Legend
            data= {[
              {
                key: 'Group Benefit Curve',
                color: 'red'
              }, {
                key: 'Group Cost Curve',
                color: 'lightGrey'
              }, {
                key: 'Group Benefit P10',
                color: 'blue'
              }, {
                key: 'Group Benefit P50',
                color: 'green'
              }, {
                key: 'Group Benefit p90',
                color: 'purple'
              }
            ]}
            dataId={'key'}
            horizontal
            config = {[
              {color: 'yellow'},
              {color: 'lightGrey'},
              {color: 'blue'},
              {color: 'green'},
              {color: 'purple'}
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
          <AreaChart
            areaColors={['yellow', 'lightGrey', 'blue', 'green', 'purple']}
            noAreaGradient
            data={
              [
                this.state.GBgraphData,
                this.state.GCgraphData,
                [{x: this.state.GBP10, y: 0}, {x: this.state.GBP10, y: this.state.GBGCMax}],
                [{x: this.state.GBP50, y: 0}, {x: this.state.GBP50, y: this.state.GBGCMax}],
                [{x: this.state.GBP90, y: 0}, {x: this.state.GBP90, y: this.state.GBGCMax}]
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
            // lineColors={['orange', 'green', 'cyan', 'yellow', 'purple']}
            xTicks={10}
            yTicks={10}
          />
        </div>
        }

        <button className = 'spacer-button' onClick = {() => { location.href = '/element-estimations' }}>
          Next
        </button>
      </div>
    )
  }
}

export default AnalysisOne
