import React from 'react'
import request from 'superagent'
import * as Survey from 'survey-react'

class CostEstimate extends React.Component {
  constructor (props) {
    super(props)
    this.sendDataToServer = this.sendDataToServer.bind(this)
  }

  sendDataToServer (survey) {
    const url = '/api/v1/estimation/cost'
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
          setTimeout(() => {
            location.href = '/analysis-one'
          }, 200)
        }
        // remove on production
        // eslint-disable-next-line no-console
        console.log('redirected! - analysis')
      })
  }

  render () {
    var costJSON = {title: 'Please give your personal (not group) estimate of costs for the whole project',
      pages: [
        {name: 'page1',
          questions: [
            {
              name: 'pessimistic',
              type: 'text',
              title: 'Please enter your personal pessimistic estimate for cost ($)',
              placeHolder: 'Amount in $',
              inputType: 'number',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 500000
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
              title: 'Next, please enter your personal optimistic estimate for cost ($)',
              placeHolder: 'Amount in $',
              inputType: 'number',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 500000
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
              title: 'Please forget the previous estimates and enter your instinctive estimate for likely cost ($)',
              placeHolder: 'Amount in $',
              inputType: 'number',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 500000
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
        <Survey.Survey json={costJSON} onComplete={this.sendDataToServer} showPrevButton={false}/>
      </div>
    )
  }
}

export default CostEstimate
