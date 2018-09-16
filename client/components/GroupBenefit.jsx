import React from 'react'
import request from 'superagent'
import * as Survey from 'survey-react'

class GroupBenefit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      group_id: null
    }
    this.sendDataToServer = this.sendDataToServer.bind(this)
  }

  componentDidMount () {
    let userId = localStorage.getItem('user_id')
    userId = JSON.parse(userId)
    const url = `/api/v1/users/group/${userId}`
    request
      .get(url)
      // needs update on production
      .on('error', (err) => alert(err.status))
      .then(res => {
        localStorage.setItem('group_id', res.body[0].group_id)
      })
  }

  sendDataToServer (survey) {
    const url = '/api/v1/estimation/benefit'
    const groupId = localStorage.getItem('group_id')
    request
      .post(url)
      .send({
        data: survey.data,
        group_id: groupId
      })
      // needs update on production
      .on('error', (err) => alert(err.status))
      .then(res => {
        if (res.status === 200) {
          setTimeout(() => {
            location.href = '/split-two'
          }, 200)
        }
        // remove on production
        // eslint-disable-next-line no-console
        console.log('redirected! - cost')
      })
  }

  render () {
    var benefitJSON = {title: "Please provide your group's agreed annual benefit estimates...",
      pages: [
        {name: 'page1',
          questions: [
            {
              name: 'pessimistic',
              type: 'text',
              title: 'Think about the worst case. What could reduce the value add? Please enter your group pessimistic estimate for annual benefit ($)',
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
              title: 'Please enter your group optimistic estimate for annual benefit, the best you can imagine in your wildest dreams ($)',
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
              title: 'Forget the previous estimates. What does your group instinct tell you, how much is the most likely annual benefit? ($)',
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
        {name: 'page4',
          questions: [
            {
              name: 'chance_of_success',
              type: 'text',
              title: 'Please enter your group estimate of chance of success (%)',
              placeHolder: 'percentage chance (%)',
              inputType: 'number',
              validators: [
                {
                  type: 'numeric',
                  minValue: 0,
                  maxValue: 100
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
        <Survey.Survey json={benefitJSON} onComplete={this.sendDataToServer} showPrevButton={false}/>
      </div>
    )
  }
}

export default GroupBenefit
