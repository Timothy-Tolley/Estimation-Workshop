import React from 'react'
import request from 'superagent'
import * as Survey from 'survey-react'

class TriviaTwo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      group_id: null
    }
    this.sendDataToServer = this.sendDataToServer.bind(this)
  }

  sendDataToServer (survey) {
    const url = '/api/v1/brier/trivia-two'
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
            location.href = '/analysis-three'
          }, 200)
        }
        // remove on production
        // eslint-disable-next-line no-console
        console.log('redirected! - cost')
      })
  }

  render () {
    var triviaTwoJSON = {title: 'Tests of your confidence in estimating with a range',
      pages: [
        {name: 'page1',
          questions: [
            {
              type: 'multipletext',
              name: 'question1',
              title: 'The Airbus A380 provides seating for 525 people in standard three-class configuration.  How many could it seat if all seats were economy class? ',
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
        },
        {name: 'page2',
          questions: [
            {
              type: 'radiogroup',
              name: 'tf_two',
              title: 'The deepest ocean trench is deeper than the Grand Canyon. Is this true or false?',
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
              title: 'How many letters were in the classical Greek alphabet?',
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
              title: 'Another name for aspirin is nitric acid. Is this true or false?',
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
              title: 'How many plays did Shakespeare write?',
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
        }
      ]
    }
    return (
      <div className = 'survey-page'>
        <Survey.Survey json={triviaTwoJSON} onComplete={this.sendDataToServer}/>
      </div>
    )
  }
}

export default TriviaTwo
