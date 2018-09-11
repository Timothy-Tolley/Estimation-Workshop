import React from 'react'
import request from 'superagent'
import * as Survey from 'survey-react'

class ElementEstimation extends React.Component {
  constructor (props) {
    super(props)
    this.sendDataToServer = this.sendDataToServer.bind(this)
  }

  // componentDidMount () {
  //   const userId = localStorage.getItem('user_id')
  //   const url = `/api/v1/users/update-gb${userId}`
  //   request
  //     .post(url)
  // }

  sendDataToServer (survey) {
    const userId = localStorage.getItem('user_id')
    const url = `/api/v1/estimation/elements/${userId}`
    request
      .post(url)
      .send(survey.data)
      .then(res => {
        if (res.status === 200) {
          location.href = '/analysis-two'
        }
        // remove on production
        // eslint-disable-next-line no-console
        console.log('redirected! - analysis')
      })
  }

  render () {
    var elementEstimationJSON = {title: 'Please fill out your estimations for each element',
      pages: [
        {name: 'page1',
          questions: [
            {
              name: 'pessimistic_one',
              type: 'text',
              title: 'A Spade: Pessimistic Cost Estimate ($)',
              placeHolder: 'Amount in $',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 500000
                }
              ],
              isRequired: true
            },
            {
              name: 'optimistic_one',
              type: 'text',
              title: ' A Spade: Optimistic Cost Estimate ($)',
              placeHolder: 'Amount in $',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 500000
                }
              ],
              isRequired: true
            },
            {
              name: 'likely_one',
              type: 'text',
              title: 'A Spade: Likely Cost Estimate ($)',
              placeHolder: 'Amount in $',
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
              name: 'pessimistic_two',
              type: 'text',
              title: 'A Digger for a day: Pessimistic Cost Estimate ($)',
              placeHolder: 'Amount in $',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 500000
                }
              ],
              isRequired: true
            },
            {
              name: 'optimistic_two',
              type: 'text',
              title: 'A Digger for a day: Optimistic Cost Estimate  ($)',
              placeHolder: 'Amount in $',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 500000
                }
              ],
              isRequired: true
            },
            {
              name: 'likely_two',
              type: 'text',
              title: 'A Digger for a day: Likely Cost Estimate  ($)',
              placeHolder: 'Amount in $',
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
              name: 'pessimistic_three',
              type: 'text',
              title: 'A worker for 8 hours: Pessimistic Cost Estimate ($)',
              placeHolder: 'Amount in $',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 500000
                }
              ],
              isRequired: true
            },
            {
              name: 'optimistic_three',
              type: 'text',
              title: 'A worker for 8 hours: Optimistic Cost Estimate ($)',
              placeHolder: 'Amount in $',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 500000
                }
              ],
              isRequired: true
            },
            {
              name: 'likely_three',
              type: 'text',
              title: 'A worker for 8 hours: Likely Cost Estimate ($)',
              placeHolder: 'Amount in $',
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
              name: 'pessimistic_four',
              type: 'text',
              title: '10 small native trees: Pessimistic Cost Estimate  ($)',
              placeHolder: 'Amount in $',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 500000
                }
              ],
              isRequired: true
            },
            {
              name: 'optimistic_four',
              type: 'text',
              title: '10 small native trees: Optimistic Cost Estimate ($)',
              placeHolder: 'Amount in $',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 500000
                }
              ],
              isRequired: true
            },
            {
              name: 'likely_four',
              type: 'text',
              title: '10 small native trees: Likely Cost Estimate ($)',
              placeHolder: 'Amount in $',
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
        {name: 'page5',
          questions: [
            {
              name: 'pessimistic_five',
              type: 'text',
              title: 'A bag of cement: Pessimistic Cost Estimate ($)',
              placeHolder: 'Amount in $',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 10000
                }
              ],
              isRequired: true
            },
            {
              name: 'optimistic_five',
              type: 'text',
              title: 'A bag of cement: Optimistic Cost Estimate ($)',
              placeHolder: 'Amount in $',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 10000
                }
              ],
              isRequired: true
            },
            {
              name: 'likely_five',
              type: 'text',
              title: 'A bag of cement: Likely Cost Estimate ($)',
              placeHolder: 'Amount in $',
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
        <Survey.Survey json={elementEstimationJSON} onComplete={this.sendDataToServer} showPrevButton={false}/>
      </div>
    )
  }
}

export default ElementEstimation
