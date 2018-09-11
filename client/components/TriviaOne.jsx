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
          location.href = '/split-three'
        }
        // remove on production
        // eslint-disable-next-line no-console
        console.log('redirected! - cost')
      })
  }

  render () {
    var triviaOneJSON = {title: 'Please answer each question to the best of your ability',
      pages: [
        {name: 'page1',
          questions: [
            {
              type: 'multipletext',
              name: 'question1',
              title: 'Please provide two numbers between which you are 90% sure the height of your chair is between (cm) -- 100',
              isRequired: true,
              colCount: 2,
              items: [
                {
                  name: 'lower_limit',
                  title: 'lower boundary'
                }, {
                  name: 'upper_limit',
                  title: 'upper boundary'
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
              title: 'Is this true or false? True',
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
              title: 'Please provide two numbers between which you are 90% sure the height of mt eden is between (m) -- 200',
              isRequired: true,
              colCount: 2,
              items: [
                {
                  name: 'lower_limit',
                  title: 'lower boundary'
                }, {
                  name: 'upper_limit',
                  title: 'upper boundary'
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
              title: 'Is this true or false? False',
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
              title: 'Please provide two numbers between which you are 90% sure the width of stage is between (m) -- 300',
              isRequired: true,
              colCount: 2,
              items: [
                {
                  name: 'lower_limit',
                  title: 'lower boundary'
                }, {
                  name: 'upper_limit',
                  title: 'upper boundary'
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
