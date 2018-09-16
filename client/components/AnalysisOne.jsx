import range from 'lodash.range'
import React from 'react'
import {mean, stdev, lognormal} from 'jStat'
import request from 'superagent'
import 'chartjs-plugin-annotation'
import {Scatter} from 'react-chartjs-2'

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
      ICMax: null
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
        let gbMean = mean(GBArray)
        let gbStd = stdev(GBArray, true)
        // p values
        let GBP10 = lognormal.inv(0.1, gbMean, gbStd)
        let GBP50 = lognormal.inv(0.5, gbMean, gbStd)
        let GBP90 = lognormal.inv(0.9, gbMean, gbStd)
        let GBP99 = lognormal.inv(0.999, gbMean, gbStd)
        // graph results
        let GBxVals = range(0, GBP99, (GBP99 / 100))
        let GByVals = []
        let GBgraphData = GBxVals.map(xVal => {
          let GByVal = lognormal.pdf(xVal, gbMean, gbStd)
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
        let GImaxs = [ICMax, GBMax]
        let GBICmax = Math.max(...GImaxs)

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
          GBICMax: GBICmax
        })
      })
    // eslint-disable-next-line no-console
      .catch(err => console.error(err))
  }

  render () {
    const data = {
      datasets: [
        {
          label: "Group's agreed estimate of Benefit * Chance of Success",
          fill: false,
          backgroundColor: 'red',
          borderColor: 'red',
          pointBorderColor: 'red',
          pointBorderWidth: 1,
          pointHoverBackgroundColor: 'red',
          pointHoverBorderColor: 'orange',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          data: this.state.GBgraphData
        },
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
            value: this.state.GBP10,
            borderColor: 'pink',
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
            value: this.state.GBP50,
            borderColor: 'pink',
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
            value: this.state.GBP90,
            borderColor: 'pink',
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
        <h1 className = 'analysis-text'>
          Analysis One
        </h1>
        <h1 className = 'analysis-text'> Group Benefit vs Individual Cost </h1>
        {this.state.active && <div>
          <Scatter data={data} options={chartOptions} width={1000}height={400}/>
        </div>
        }
        <button className = 'spacer-button' onClick = {() => { location.href = '/analysis-one-2' }}>
          Next
        </button>
      </div>
    )
  }
}

export default AnalysisOne
