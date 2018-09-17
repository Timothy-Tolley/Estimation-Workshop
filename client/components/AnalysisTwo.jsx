import React from 'react'
import range from 'lodash.range'
import request from 'superagent'
import 'chartjs-plugin-annotation'
import {Scatter} from 'react-chartjs-2'
import {mean, stdev, lognormal} from 'jStat'

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
    this.createDataArray = this.createDataArray.bind(this)
  }

  createDataArray (pess, opt, likely) {
    let pessLog = Math.log(pess)
    let optLog = Math.log(opt)
    let likeLog = Math.log(likely)
    let logsArray = [pessLog, optLog, likeLog]
    let meanLogs = mean(logsArray)
    let stDevLogs = stdev(logsArray, true)
    return [meanLogs, stDevLogs]
  }

  componentDidMount () {
    const userId = localStorage.getItem('user_id')
    const analysisTwoUrl = `/api/v1/estimation/analysis-two/${userId}`
    request
      .get(analysisTwoUrl)
      .then(res => {
        // ELEMENTS ESTIMATE -- Personal
        let personalElements = res.body.userElementCost[0]
        let MSDOne = this.createDataArray(personalElements.pessimistic_one, personalElements.optimistic_one, personalElements.likely_one)
        let MSDTwo = this.createDataArray(personalElements.pessimistic_two, personalElements.optimistic_two, personalElements.likely_two)
        let MSDThree = this.createDataArray(personalElements.pessimistic_three, personalElements.optimistic_three, personalElements.likely_three)
        let MSDFour = this.createDataArray(personalElements.pessimistic_four, personalElements.optimistic_four, personalElements.likely_four)
        let MSDFive = this.createDataArray(personalElements.pessimistic_five, personalElements.optimistic_five, personalElements.likely_five)
        // all elements for a single user
        let personalMeanArray = [MSDOne[0], MSDTwo[0], MSDThree[0], MSDFour[0], MSDFive[0]]
        let personalStDevArray = [MSDOne[1], MSDTwo[1], MSDThree[1], MSDFour[1], MSDFive[1]]
        let personalMeanMean = mean(personalMeanArray)
        let personalMeanStDev = stdev(personalStDevArray, true)
        // P values
        let personalP10 = lognormal.inv(0.1, personalMeanMean, personalMeanStDev)
        let personalP50 = lognormal.inv(0.5, personalMeanMean, personalMeanStDev)
        let personalP90 = lognormal.inv(0.9, personalMeanMean, personalMeanStDev)
        let personalP99 = lognormal.inv(0.999, personalMeanMean, personalMeanStDev)
        // graph results
        let personalxVals = range(0, personalP99, (personalP99 / 100))
        let personalyVals = []
        let personalGraphData = personalxVals.map(xVal => {
          let personalyVal = lognormal.pdf(xVal, personalMeanMean, personalMeanStDev)
          personalyVals.push(personalyVal)
          return {x: xVal, y: personalyVal}
        })

        // all elements for all users
        // all element one

        let allUsers = res.body.allUsersData
        // Element One
        let roomElementOneArray = []
        // Element Two
        let roomElementTwoArray = []
        // Element Three
        let roomElementThreeArray = []
        // Element Four
        let roomElementFourArray = []
        // Element Five
        let roomElementFiveArray = []

        allUsers.forEach(user => {
          // one
          roomElementOneArray.push(Math.log(user.pessimistic_one), Math.log(user.optimistic_one), Math.log(user.likely_one))
          // two
          roomElementTwoArray.push(Math.log(user.pessimistic_two), Math.log(user.optimistic_two), Math.log(user.likely_two))
          // three
          roomElementThreeArray.push(Math.log(user.pessimistic_three), Math.log(user.optimistic_three), Math.log(user.likely_three))
          // four
          roomElementFourArray.push(Math.log(user.pessimistic_four), Math.log(user.optimistic_four), Math.log(user.likely_four))
          // five
          roomElementFiveArray.push(Math.log(user.pessimistic_five), Math.log(user.optimistic_five), Math.log(user.likely_five))
        })

        let allUsersMeanOne = mean(roomElementOneArray)
        let allUsersMeanTwo = mean(roomElementTwoArray)
        let allUsersMeanThree = mean(roomElementThreeArray)
        let allUsersMeanFour = mean(roomElementFourArray)
        let allUsersMeanFive = mean(roomElementFiveArray)

        let allUsersStDevOne = stdev(roomElementOneArray)
        let allUsersStDevTwo = stdev(roomElementTwoArray)
        let allUsersStDevThree = stdev(roomElementThreeArray)
        let allUsersStDevFour = stdev(roomElementFourArray)
        let allUsersStDevFive = stdev(roomElementFiveArray)

        let roomAllElementsMeans = [allUsersMeanOne, allUsersMeanTwo, allUsersMeanThree, allUsersMeanFour, allUsersMeanFive]
        let roomAllElementsStDevs = [allUsersStDevOne, allUsersStDevTwo, allUsersStDevThree, allUsersStDevFour, allUsersStDevFive]
        let roomMeanMean = mean(roomAllElementsMeans)
        let roomMeanStDev = mean(roomAllElementsStDevs, true)
        // P values
        let roomP10 = lognormal.inv(0.1, roomMeanMean, roomMeanStDev)
        let roomP50 = lognormal.inv(0.5, roomMeanMean, roomMeanStDev)
        let roomP90 = lognormal.inv(0.9, roomMeanMean, roomMeanStDev)
        let roomP99 = lognormal.inv(0.999, roomMeanMean, roomMeanStDev)
        // graph results
        let roomxVals = range(0, roomP99, (roomP99 / 100))
        let roomyVals = []
        let roomGraphData = roomxVals.map(xVal => {
          let roomyVal = lognormal.pdf(xVal, roomMeanMean, roomMeanStDev)
          roomyVals.push(roomyVal)
          return {x: xVal, y: roomyVal}
        })
        // set all Data to State
        this.setState({
          active: true,
          roomP10: roomP10,
          roomP50: roomP50,
          roomP90: roomP90,
          roomGraphData: roomGraphData,
          roomElementOneData: roomElementOneArray,
          roomElementTwoData: roomElementTwoArray,
          roomElementThreeData: roomElementThreeArray,
          roomElementFourData: roomElementFourArray,
          roomElementFiveData: roomElementFiveArray,
          personalP10: personalP10,
          personalP50: personalP50,
          personalP90: personalP90,
          personalMeanMean: personalMeanMean,
          personalMeanStDev: personalMeanStDev,
          personalGraphData: personalGraphData
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
          data: this.state.personalGraphData
        },
        {
          label: "Aggregate of Rooms' Element Based Estimates of Cost",
          fill: false,
          backgroundColor: 'green',
          borderColor: 'green',
          pointBorderColor: 'green',
          pointBorderWidth: 1,
          pointHoverBackgroundColor: 'green',
          pointHoverBorderColor: 'lightGreen',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          data: this.state.roomGraphData
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
            value: this.state.personalP10,
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
            value: this.state.personalP50,
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
            value: this.state.personalP90,
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
        <h1 className = 'analysis-text'>
        Your personal estimate of Cost vs Aggregate of all your group&#39;s personal Cost estimates
        </h1>
        {this.state.active && <div>
          <Scatter data={data} options={chartOptions} width={1000}height={400}/>
        </div>
        }
        <h1 className = 'analysis-text'>
        Personal Mean of means: {this.state.personalMeanMean}
          <br/>
        Personal Mean of st devs: {this.state.personalMeanStDev}
          <br/>
        Room p10: {this.state.roomP10}
          <br/>
        Room p50: {this.state.roomP50}
          <br/>
        Room p90: {this.state.roomP90}
        </h1>
        {this.state.active && <div>
          <h1> Element One Math log of Room Values </h1>
          {this.state.roomElementOneData.map((value, idx) => {
            return (
              <p key = {idx}>
              value: {value}
              </p>
            )
          })}
          <h1> Element Two Math log of Room Values </h1>
          {this.state.roomElementTwoData.map((value, idx) => {
            return (
              <p key = {idx}>
              value: {value}
              </p>
            )
          })}
          <h1> Element Three Math log of Room Values </h1>
          {this.state.roomElementThreeData.map((value, idx) => {
            return (
              <p key = {idx}>
              value: {value}
              </p>
            )
          })}
          <h1> Element Four Math log of Room Values </h1>
          {this.state.roomElementFourData.map((value, idx) => {
            return (
              <p key = {idx}>
              value: {value}
              </p>
            )
          })}
          <h1> Element Five Math log of Room Values </h1>
          {this.state.roomElementFiveData.map((value, idx) => {
            return (
              <p key = {idx}>
              value: {value}
              </p>
            )
          })}
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
