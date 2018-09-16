import React from 'react'
import range from 'lodash.range'
import request from 'superagent'
import 'chartjs-plugin-annotation'
import {Scatter} from 'react-chartjs-2'
import {mean, stdev, lognormal} from 'jStat'

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
        let ICMean = mean(ICArray)
        let ICStDev = stdev(ICArray, true)
        // p values
        let ICP10 = lognormal.inv(0.1, ICMean, ICStDev)
        let ICP50 = lognormal.inv(0.5, ICMean, ICStDev)
        let ICP90 = lognormal.inv(0.9, ICMean, ICStDev)
        let ICP99 = lognormal.inv(0.999, ICMean, ICStDev)
        // graph results
        let ICxVals = range(0, ICP99, (ICP99 / 100))
        let ICyVals = []
        let ICgraphData = ICxVals.map(xVal => {
          let ICyVal = lognormal.pdf(xVal, ICMean, ICStDev)
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
        let GCMean = mean(GCArray)
        let GCStDev = stdev(GCArray, true)
        // p values
        let GCP10 = lognormal.inv(0.1, GCMean, GCStDev)
        let GCP50 = lognormal.inv(0.5, GCMean, GCStDev)
        let GCP90 = lognormal.inv(0.9, GCMean, GCStDev)
        let GCP99 = lognormal.inv(0.999, GCMean, GCStDev)
        // graph results
        let GCxVals = range(0, GCP99, (GCP99 / 100))
        let GCyVals = []
        let GCgraphData = GCxVals.map(xVal => {
          let GCyVal = lognormal.pdf(xVal, GCMean, GCStDev)
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
          backgroundColor: 'blue',
          borderColor: 'blue',
          pointBorderColor: 'blue',
          pointBorderWidth: 1,
          pointHoverBackgroundColor: 'blue',
          pointHoverBorderColor: 'lightBlue',
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
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Probability'
          },
          ticks: {
            callback: (value, index, values) => {
              return ''
            }
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Dollar Value ($)'
          }
        }]
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
            borderColor: 'lightBlue',
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
            borderColor: 'lightBlue',
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
            borderColor: 'lightBlue',
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
