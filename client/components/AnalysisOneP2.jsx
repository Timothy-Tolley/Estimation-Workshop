import React from 'react'
import jStat from 'jStat'
import request from 'superagent'
import _ from 'lodash'
// import {LineChart, Legend} from 'react-easy-chart'
import {Scatter} from 'react-chartjs-2'
import 'chartjs-plugin-annotation'

class AnalysisOne extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false,
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
      ICGCMax: null
    }
  }

  componentDidMount () {
    const groupId = localStorage.getItem('group_id')
    const userId = localStorage.getItem('user_id')
    const analysisOneUrl = '/api/v1/estimation/analysis-one-2'
    request
      .get(analysisOneUrl)
      .query({
        group: groupId,
        user: userId
      })
      .then(res => {
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
        // p values
        let ICP10 = jStat.lognormal.inv(0.1, ICMean, ICStDev)
        let ICP50 = jStat.lognormal.inv(0.5, ICMean, ICStDev)
        let ICP90 = jStat.lognormal.inv(0.9, ICMean, ICStDev)
        let ICP99 = jStat.lognormal.inv(0.999, ICMean, ICStDev)
        // graph results
        let ICxVals = _.range(0, ICP99, (ICP99 / 100))
        let ICyVals = []
        let ICgraphData = ICxVals.map(xVal => {
          let ICyVal = jStat.lognormal.pdf(xVal, ICMean, ICStDev)
          ICyVals.push(ICyVal)
          return {x: xVal, y: ICyVal}
        })
        let ICMax = Math.max(...ICyVals)

        // GROUP COST
        // array for ID calculations
        let GCArray = []
        res.body.gcd.forEach(dataset =>
          GCArray.push(Math.log(dataset.pessimistic), Math.log(dataset.optimistic), Math.log(dataset.likely))
        )
        // mean + stdev
        let GCMean = jStat.mean(GCArray)
        let GCStDev = jStat.stdev(GCArray, true)
        // p values
        let GCP10 = jStat.lognormal.inv(0.1, GCMean, GCStDev)
        let GCP50 = jStat.lognormal.inv(0.5, GCMean, GCStDev)
        let GCP90 = jStat.lognormal.inv(0.9, GCMean, GCStDev)
        let GCP99 = jStat.lognormal.inv(0.999, GCMean, GCStDev)
        // graph results
        let GCxVals = _.range(0, GCP99, (GCP99 / 100))
        let GCyVals = []
        let GCgraphData = GCxVals.map(xVal => {
          let GCyVal = jStat.lognormal.pdf(xVal, GCMean, GCStDev)
          GCyVals.push(GCyVal)
          return {x: xVal, y: GCyVal}
        })
        let GCMax = Math.max(...GCyVals)
        let GImaxs = [GCMax, ICMax]
        let ICGCmax = Math.max(...GImaxs)

        // add all to state
        this.setState({
          active: true,
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
          GCMax: GCMax,
          ICGCMax: ICGCmax
        })
      })
    // eslint-disable-next-line no-console
      .catch(err => console.error(err))
  }

  render () {
    const data = {
      datasets: [
        {
          label: 'Your personal estimate of Cost',
          fill: false,
          backgroundColor: 'red',
          borderColor: 'red',
          pointBorderColor: 'red',
          pointBorderWidth: 1,
          pointHoverBackgroundColor: 'red',
          pointHoverBorderColor: 'orange',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          data: this.state.ICgraphData
        },
        {
          label: "Aggregate of all your group's personal Cost estimates",
          fill: false,
          backgroundColor: 'green',
          borderColor: 'green',
          pointBorderColor: 'green',
          pointBorderWidth: 1,
          pointHoverBackgroundColor: 'green',
          pointHoverBorderColor: 'lightGreen',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          data: this.state.GCgraphData
        }
      ]
    }
    const chartOptions = {
      showScale: true,
      pointDot: true,
      showLines: true,
      title: {
        display: false
      },
      legend: {
        display: true,
        labels: {
          boxWidth: 20,
          fontSize: 14,
          fontColor: 'black',
          padding: 10
        }
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || ''

            if (label) {
              label += ': ' + tooltipItem.xLabel
            }
            return label
          }
        }
      },
      annotation: {
        drawTime: 'afterDatasetsDraw',
        annotations: [
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-1',
            value: this.state.ICP10,
            borderColor: 'rgba(43, 187, 135, 0.9)',
            borderWidth: 2,
            label: {
              content: 'P10',
              enabled: true,
              position: 'center'
            }
          },
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-1',
            value: this.state.ICP50,
            borderColor: 'rgba(43, 187, 135, 0.9)',
            borderWidth: 2,
            label: {
              content: 'P50',
              enabled: true,
              position: 'center'
            }
          },
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-1',
            value: this.state.ICP90,
            borderColor: 'rgba(43, 187, 135, 0.9)',
            borderWidth: 2,
            label: {
              content: 'P90',
              enabled: true,
              position: 'center'
            }
          }
        ]
      }

    }
    return (
      <div className = 'analysis-page'>
        <h1 className = 'analysis-text'> Your personal estimate of Cost vs Aggregate of all your group&#39;s personal Cost estimates </h1>
        {this.state.active && <div>
          {/* <Legend
            data= {[
              {
                key: 'Your personal estimate of Cost',
                color: 'orange'
              }, {
                key: "Aggregate of all your group's personal Cost estimates",
                color: 'blue'
              }, {
                key: 'Individual Cost P10',
                color: 'cyan'
              }, {
                key: 'Individual Cost P50',
                color: 'purple'
              }, {
                key: 'Individual Cost p90',
                color: 'green'
              }
            ]}
            dataId={'key'}
            horizontal
            config = {[
              {color: 'orange'},
              {color: 'blue'},
              {color: 'cyan'},
              {color: 'purple'},
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
          <LineChart
            lineColors={['orange', 'blue', 'cyan', 'purple', 'green']}
            noAreaGradient
            dataPoints
            data={
              [
                this.state.GCgraphData,
                this.state.ICgraphData,
                [{x: this.state.ICP10, y: 0}, {x: this.state.ICP10, y: this.state.ICGCMax}],
                [{x: this.state.ICP50, y: 0}, {x: this.state.ICP50, y: this.state.ICGCMax}],
                [{x: this.state.ICP90, y: 0}, {x: this.state.ICP90, y: this.state.ICGCMax}]
              ]
            }
            width={1000}
            height={400}
            margin={{top: 40, right: 5, bottom: 60, left: 60}}
            axes
            axisLabels={{x: 'Dollar Value ($)', y: 'Y Axis'}}
            interpolate={'cardinal'}
            grid
            verticalGrid

            xTicks={10}
            yTicks={10}
          /> */}

          <Scatter data={data} options={chartOptions} width={1000}height={400}/>

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
