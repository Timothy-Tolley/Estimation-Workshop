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
              title: 'Machinery: There is a lot of overgrown stuff and steep slopes to deal with and you have little time. Your most Pessimistic Cost Estimate to hire a cultivator, including fuel, delivery and operator ($)',
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
              title: 'Machinery: You can get a cultivator into the back of the ute, and operate it yourself. Your most Optimistic Cost Estimate to hire a cultivator ($)',
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
              title: 'Machinery: Now be realistic. What do you really think a decennt cultivator will cost to hire and operate ($)',
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
              title: 'Hard Landscaping: You need some pavers, sand and cement to build paths and steps. It has to look a million dollars. How much could it cost (worst case) ($)',
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
              title: 'Hard Landscaping: Stuff it, lay some crushed shells on the soil to make paths like a nature reserve. How little could you get away with ($)',
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
              title: 'Hard Landscaping: You want the tenants to actually get out in the garden so they will value and look after your investment in it. Realistically, how much will you have to spend to achieve that ($)',
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
              title: 'Trees & Plants: You need to buy some substantial native trees and long-lasting decorative plants, and there is a pretty large area to cover. What is the worst case cost, including delivery ($)',
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
              title: ' Trees & Plants: You can get a job lot of trees and plants on Trademe, and they will grow fast once planted. Your most Optimistic Cost Estimate ($)',
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
              title: 'Trees & Plants: The planting has to look really good or you will not realise the expected benefit. Realistically, what should you spend to give it the Wow! factor ($)',
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
              placeHolder: 'Amount in $',
              inputType: 'number',
              title: 'Topsoil and Seeds: You are going to have to build some parts up to flat for a play lawn, and cover some of that mess at the bottom end. Your most Pessimistic Cost Estimate for Topsoil and Grass Seed, including delivery ($)',
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
              title: 'Topsoil and Seeds: You can redistibute some existing soil around, and hide the worst bits behind a screen of trees.That can really cut down on Topsoil and Grass Seed, but you will still need some- how little can you get away with ($)',
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
              title: 'Topsoil and Seeds: Your instinctive Likely Cost Estimate for Topsoil and Grass Seed, including delivery ($)',
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
              title: 'Professional Help: She is a big job and you are going to need skilled help to do this. How many people, where will you find them and at what hourly rate? Your Pessimistic Cost Estimate ($)',
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
              title: 'Professional Help: You can get some mates along and give them a feed and some beer. How much could that possibly cost ($)',
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
              title: 'Professional Help: How much use are your mates, really? How much will you probably have to spend on someone who knows what they are doing ($)',
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
