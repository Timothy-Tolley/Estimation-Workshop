import React from 'react'
import request from 'superagent'
import * as Survey from 'survey-react'

class CostEstimate extends React.Component {
  constructor (props) {
    super(props)
    this.sendDataToServer = this.sendDataToServer.bind(this)
  }

  componentDidMount () {
    const userId = localStorage.getItem('user_id')
    const url = `http://localhost:3000/api/v1/users/update-gb${userId}`
    request
      .post(url)
  }

  sendDataToServer (survey) {
    const url = 'http://localhost:3000/api/v1/estimation/cost'
    const groupId = localStorage.getItem('group_id')
    const userId = localStorage.getItem('user_id')
    request
      .post(url)
      .send({
        data: survey.data,
        group_id: groupId,
        user_id: userId
      })
      .then(res => {
        if (res.status === 200) {
          location.href = 'http://localhost:3000/analysis-one'
        }
        // remove on production
        // eslint-disable-next-line no-console
        console.log('redirected! - analysis')
      })
  }

  render () {
    var costJSON = {title: 'Please fill out your estimation of cost, individually, in regards to building a water feature in your garden',
      pages: [
        {name: 'page1',
          questions: [
            {
              name: 'pessimistic',
              type: 'text',
              title: 'Please enter your pessimistic estimate for cost',
              placeHolder: 'Amount in $',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 500
                }
              ],
              isRequired: true
            }
          ]
        },
        {name: 'page2',
          questions: [
            {
              name: 'optimistic',
              type: 'text',
              title: 'Next, please enter your optimistic estimate for cost',
              placeHolder: 'Amount in $',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 500
                }
              ],
              isRequired: true
            }
          ]
        },
        {name: 'page3',
          questions: [
            {
              name: 'likely',
              type: 'text',
              title: 'Next, please enter your likely estimate for cost',
              placeHolder: 'Amount in $',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 500
                }
              ],
              isRequired: true
            }
          ]
        }
      ]
    }
    return (
      <div className = 'survey-page'>
        <Survey.Survey json={costJSON} onComplete={this.sendDataToServer}/>
      </div>
    )
  }
}

export default CostEstimate
