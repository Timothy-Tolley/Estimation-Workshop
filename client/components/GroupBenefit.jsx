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
          location.href = '/split-two'
        }
        // remove on production
        // eslint-disable-next-line no-console
        console.log('redirected! - cost')
      })
  }

  render () {
    var benefitJSON = {title: 'As a group, decide on values for the following in regards to building a water feature in your garden',
      pages: [
        {name: 'page1',
          questions: [
            {
              name: 'pessimistic',
              type: 'text',
              title: 'Please enter your pessimistic estimate for benefit',
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
              title: 'Next, please enter your optimistic estimate for benefit',
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
              title: 'Next, please enter your likely estimate for benefit',
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
        {name: 'page4',
          questions: [
            {
              name: 'chance_of_success',
              type: 'text',
              title: 'Finally, please enter the percentage chance of success',
              placeHolder: 'percentage chance',
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
        <Survey.Survey json={benefitJSON} onComplete={this.sendDataToServer}/>
      </div>
    )
  }
}

export default GroupBenefit
