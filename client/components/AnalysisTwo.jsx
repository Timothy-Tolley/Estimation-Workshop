import _ from 'lodash'
import React from 'react'
import jStat from 'jStat'
import request from 'superagent'
import 'chartjs-plugin-annotation'
import {Scatter} from 'react-chartjs-2'

class AnalysisTwo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false,
      wbsP10: null,
      wbsP50: null,
      wbsP90: null,
      wbsP99: null,
      WgraphData: [],
      WMax: null
    }
  }

  componentDidMount () {
    const userId = localStorage.getItem('user_id')
    const analysisTwoUrl = `/api/v1/estimation/analysis-two/${userId}`
    request
      .get(analysisTwoUrl)
      .then(res => {
        // ELEMENTS ESTIMATE
        let elements = res.body.elementCost[0]
        let pTot = elements.pessimistic_one + elements.pessimistic_two + elements.pessimistic_three + elements.pessimistic_four + elements.pessimistic_five
        let oTot = elements.optimistic_one + elements.optimistic_two + elements.optimistic_three + elements.optimistic_four + elements.optimistic_five
        let lTot = elements.likely_one + elements.likely_two + elements.likely_three + elements.likely_four + elements.likely_five
        let wbsEstimates = [
          Math.log(pTot),
          Math.log(oTot),
          Math.log(lTot)
        ]
        let wMean = jStat.mean(wbsEstimates)
        let wStDev = jStat.stdev(wbsEstimates, true)
        let wP10 = jStat.lognormal.inv(0.1, wMean, wStDev)
        let wP50 = jStat.lognormal.inv(0.5, wMean, wStDev)
        let wP90 = jStat.lognormal.inv(0.9, wMean, wStDev)
        let wP99 = jStat.lognormal.inv(0.999, wMean, wStDev)
        // graph results
        let WxVals = _.range(0, wP99, (wP99 / 100))
        let WyVals = []
        let WgraphData = WxVals.map(xVal => {
          let WyVal = jStat.lognormal.pdf(xVal, wMean, wStDev)
          WyVals.push(WyVal)
          return {x: xVal, y: WyVal}
        })
        // INDIVIDUAL COST
        // array for ID calculations
        let individualCost = res.body.individualCost[0]
        let ICArray = [
          Math.log(individualCost.pessimistic),
          Math.log(individualCost.optimistic),
          Math.log(individualCost.likely)
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
        // set all Data to State
        this.setState({
          active: true,
          icP10: ICP10,
          icP50: ICP50,
          icP90: ICP90,
          ICgraphData: ICgraphData,
          wbsP10: wP10,
          wbsP50: wP50,
          wbsP90: wP90,
          WgraphData: WgraphData
        })
      })
  }

  render () {
    const data = {
      datasets: [
        {
          label: 'Your Element Based Estimate of Cost',
          fill: false,
          backgroundColor: 'red',
          borderColor: 'red',
          pointBorderColor: 'red',
          pointBorderWidth: 1,
          pointHoverBackgroundColor: 'red',
          pointHoverBorderColor: 'orange',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          data: this.state.WgraphData
        },
        {
          label: 'Your personal estimate of Cost',
          fill: false,
          backgroundColor: 'green',
          borderColor: 'green',
          pointBorderColor: 'green',
          pointBorderWidth: 1,
          pointHoverBackgroundColor: 'green',
          pointHoverBorderColor: 'lightGreen',
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
            value: this.state.wbsP10,
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
            value: this.state.wbsP50,
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
            value: this.state.wbsP90,
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
          <Scatter data={data} options={chartOptions} width={1000}height={400}/>
        </div>
        }
        <button className = 'spacer-button' onClick = {() => { location.href = '/trivia-one' }}>
          Next
        </button>
      </div>
    )
  }
}

export default AnalysisTwo
