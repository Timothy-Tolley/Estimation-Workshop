import React from 'react'
import request from 'superagent'
import * as Survey from 'survey-react'

class TriviaOne extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      group_id: null
    }
    this.sendDataToServer = this.sendDataToServer.bind(this)
  }

  sendDataToServer (survey) {
    const url = '/api/v1/brier/trivia-one'
    const userId = localStorage.getItem('user_id')
    request
      .post(url)
      .send({
        data: survey.data,
        user_id: userId
      })
      // needs update on production
      .on('error', (err) => alert(err.status))
      .then(res => {
        if (res.status === 200) {
          setTimeout(() => {
            location.href = '/split-three'
          }, 200)
        }
        // remove on production
        // eslint-disable-next-line no-console
        console.log('redirected! - cost')
      })
  }

  render () {
    var triviaOneJSON = {title: 'Tests of your confidence in estimating with a range',
      pages: [
        {name: 'page1',
          questions: [
            {
              type: 'multipletext',
              name: 'question1',
              title: 'What is the usual percentage of copper in the alloy bronze?',
              isRequired: true,
              colCount: 2,
              items: [
                {
                  name: 'lower_limit',
                  title: 'I am 95% confident it is no less than',
                  inputType: 'number',
                  validators: [
                    {
                      type: 'numeric',
                      minValue: 0,
                      maxValue: 100
                    }
                  ]
                }, {
                  name: 'upper_limit',
                  title: 'I am 95% confident it is no more than',
                  inputType: 'number',
                  validators: [
                    {
                      type: 'numeric',
                      minValue: 0,
                      maxValue: 100
                    }
                  ]
                }
              ]
            }
          ]
        },
        {name: 'page2',
          questions: [
            {
              type: 'radiogroup',
              name: 'tf_two',
              title: 'Sir Christopher Wren was a British anthropologist. Is this true or false?',
              isRequired: true,
              colCount: 2,
              choices: [
                'True',
                'False'
              ]
            },
            {
              type: 'text',
              name: 'conf_two',
              title: 'How confident are you that you are correct? (%)',
              isRequired: true,
              placeHolder: 'Confidence (%)',
              inputType: 'number',
              validators: [
                {
                  type: 'numeric',
                  minValue: 0,
                  maxValue: 100
                }
              ]
            }
          ]
        },
        {name: 'page3',
          questions: [
            {
              type: 'multipletext',
              name: 'question3',
              title: 'The Supremes’ (with Diana Ross) song “Stop! In the Name of Love” was how many seconds long?',
              isRequired: true,
              colCount: 2,
              items: [
                {
                  name: 'lower_limit',
                  title: 'I am 95% confident it is no less than',
                  inputType: 'number',
                  validators: [
                    {
                      type: 'numeric',
                      minValue: 0,
                      maxValue: 1000
                    }
                  ]
                }, {
                  name: 'upper_limit',
                  title: 'I am 95% confident it is no more than',
                  inputType: 'number',
                  validators: [
                    {
                      type: 'numeric',
                      minValue: 0,
                      maxValue: 1000
                    }
                  ]
                }
              ]
            }
          ]
        },
        {name: 'page4',
          questions: [
            {
              type: 'radiogroup',
              name: 'tf_four',
              title: 'Pakistan borders on Russia. Is this true or false?',
              isRequired: true,
              colCount: 2,
              choices: [
                'True',
                'False'
              ]
            },
            {
              type: 'text',
              name: 'conf_four',
              title: 'How confident are you that you are correct? (%)',
              isRequired: true,
              placeHolder: 'Confidence (%)',
              inputType: 'number',
              validators: [
                {
                  type: 'numeric',
                  minValue: 0,
                  maxValue: 100
                }
              ]
            }
          ]
        },
        {name: 'page5',
          questions: [
            {
              type: 'multipletext',
              name: 'question5',
              title: 'How many meters above sea level is the top of Aoraki Mount Cook?',
              isRequired: true,
              colCount: 2,
              items: [
                {
                  name: 'lower_limit',
                  title: 'I am 95% confident it is no less than',
                  inputType: 'number',
                  validators: [
                    {
                      type: 'numeric',
                      minValue: 0,
                      maxValue: 10000
                    }
                  ]
                }, {
                  name: 'upper_limit',
                  title: 'I am 95% confident it is no more than',
                  inputType: 'number',
                  validators: [
                    {
                      type: 'numeric',
                      minValue: 0,
                      maxValue: 10000
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
    return (
      <div className = 'survey-page'>
        <Survey.Survey json={triviaOneJSON} onComplete={this.sendDataToServer}/>
      </div>
    )
  }
}

export default TriviaOne
