import React from 'react'
import request from 'superagent'
import * as Survey from 'survey-react'

class ElementEstimation extends React.Component {
  constructor (props) {
    super(props)
    this.sendDataToServer = this.sendDataToServer.bind(this)
  }

  sendDataToServer (survey) {
    const userId = localStorage.getItem('user_id')
    const url = `/api/v1/estimation/elements/${userId}`
    request
      .post(url)
      .send(survey.data)
      .then(res => {
        if (res.status === 200) {
          setTimeout(() => {
            location.href = '/analysis-two'
          }, 200)
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
        }, {name: 'page2',
          questions: [
            {
              name: 'optimistic_one',
              type: 'text',
              title: ' A Spade: Optimistic Cost Estimate ($)',
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
        }, {name: 'page3',
          questions: [
            {
              name: 'likely_one',
              type: 'text',
              title: 'A Spade: Likely Cost Estimate ($)',
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
        }, {name: 'page4',
          questions: [
            {
              name: 'pessimistic_two',
              type: 'text',
              title: 'A Digger for a Day: Pessimistic Cost Estimate ($)',
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
        }, {name: 'page5',
          questions: [
            {
              name: 'optimistic_two',
              type: 'text',
              title: 'A Digger for a Day : Optimistic Cost Estimate ($)',
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
        }, {name: 'page6',
          questions: [
            {
              name: 'likely_two',
              type: 'text',
              title: 'A Digger for a Day: Likely Cost Estimate ($)',
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
        }, {name: 'page7',
          questions: [
            {
              name: 'pessimistic_three',
              type: 'text',
              title: '10 Native Trees: Pessimistic Cost Estimate ($)',
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
        }, {name: 'page8',
          questions: [
            {
              name: 'optimistic_three',
              type: 'text',
              title: ' 10 Native Trees: Optimistic Cost Estimate ($)',
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
        }, {name: 'page9',
          questions: [
            {
              name: 'likely_three',
              type: 'text',
              title: '10 Native Trees: Likely Cost Estimate ($)',
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
        }, {name: 'page10',
          questions: [
            {
              name: 'pessimistic_four',
              type: 'text',
              title: 'A workman for a Day: Pessimistic Cost Estimate ($)',
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
        }, {name: 'page11',
          questions: [
            {
              name: 'optimistic_four',
              type: 'text',
              title: ' A workman for a Day: Optimistic Cost Estimate ($)',
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
        }, {name: 'page12',
          questions: [
            {
              name: 'likely_four',
              type: 'text',
              title: 'A workman for a Day: Likely Cost Estimate ($)',
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
        }, {name: 'page13',
          questions: [
            {
              name: 'pessimistic_five',
              type: 'text',
              title: 'A bag of Cement: Pessimistic Cost Estimate ($)',
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
        }, {name: 'page14',
          questions: [
            {
              name: 'optimistic_five',
              type: 'text',
              title: 'A bag of Cement: Optimistic Cost Estimate ($)',
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
        }, {name: 'page15',
          questions: [
            {
              name: 'likely_five',
              type: 'text',
              title: 'A bag of Cement: Likely Cost Estimate ($)',
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
        <Survey.Survey json={elementEstimationJSON} onComplete={this.sendDataToServer} showPrevButton={false}/>
      </div>
    )
  }
}

export default ElementEstimation
