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
          location.href = '/analysis-three'
        }
        // remove on production
        // eslint-disable-next-line no-console
        console.log('redirected! - cost')
      })
  }

  render () {
    var triviaTwoJSON = {title: 'Please answer each question to the best of your ability',
      pages: [
        {name: 'page1',
          questions: [
            {
              type: 'multipletext',
              name: 'question1',
              title: 'Please provide two numbers between which you are 80% sure the height of your chair is between (cm)',
              isRequired: true,
              colCount: 2,
              items: [
                {
                  name: 'lower_limit',
                  title: 'Lower Boundary'
                }, {
                  name: 'upper_limit',
                  title: 'Upper Boundary'
                }
              ]
            }
          ]
        },
        {name: 'page2',
          questions: [
            {
              type: 'multipletext',
              name: 'question2',
              title: 'Please provide two numbers between which you are 660% sure the height of your table is between (cm)',
              isRequired: true,
              colCount: 2,
              items: [
                {
                  name: 'lower_limit',
                  title: 'Lower Boundary'
                }, {
                  name: 'upper_limit',
                  title: 'Upper Boundary'
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
              title: 'Please provide two numbers between which you are 90% sure the height of mt eden is between (m)',
              isRequired: true,
              colCount: 2,
              items: [
                {
                  name: 'lower_limit',
                  title: 'Lower Boundary'
                }, {
                  name: 'upper_limit',
                  title: 'Upper Boundary'
                }
              ]
            }
          ]
        },
        {name: 'page4',
          questions: [
            {
              type: 'multipletext',
              name: 'question4',
              title: 'Please provide two numbers between which you are 95% sure the height of the ceiling is between (m)',
              isRequired: true,
              colCount: 2,
              items: [
                {
                  name: 'lower_limit',
                  title: 'Lower Boundary'
                }, {
                  name: 'upper_limit',
                  title: 'Upper Boundary'
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
              title: 'Please provide two numbers between which you are 50% sure the width of stage is between (m)',
              isRequired: true,
              colCount: 2,
              items: [
                {
                  name: 'lower_limit',
                  title: 'Lower Boundary'
                }, {
                  name: 'upper_limit',
                  title: 'Upper Boundary'
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
