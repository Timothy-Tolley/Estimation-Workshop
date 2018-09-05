import React from 'react'
import request from 'superagent'
import * as Survey from 'survey-react'

class UserRegister extends React.Component {
  constructor (props) {
    super(props)
    this.sendDataToServer = this.sendDataToServer.bind(this)
  }

  sendDataToServer (survey) {
    const url = 'http://localhost:3000/api/v1/users'
    request
      .post(url)
      .send(survey.data)
      // needs update on production
      .on('error', (err) => alert(err.status))
      .then(res => {
        localStorage.setItem('user_id', res.body.resp[0])
        return res
      })
      .then(res => {
        if (res.status === 200) {
          setTimeout(() => {
            location.href = 'http://localhost:3000/split-one'
          }, 1500)
        }
        // remove on production
        // eslint-disable-next-line no-console
        console.log('redirected! - Group Bene')
      })
  }

  render () {
    var userJSON = {title: 'Please fill in your details so we can send you your results and connect you to your group!',
      pages: [
        {name: 'page1',
          questions: [
            {
              name: 'name',
              type: 'text',
              title: 'Please enter your full name:',
              placeHolder: 'full name',
              isRequired: true
            },
            {
              name: 'email',
              type: 'text',
              title: 'Please enter your email address:',
              placeHolder: 'email',
              validators: [
                {
                  type: 'email'
                }
              ],
              isRequired: true
            },
            {
              name: 'group_number',
              type: 'text',
              title: 'Please enter the group number you have been provided with:',
              placeHolder: 'group number',
              validators: [
                {
                  type: 'numeric',
                  minValue: 1,
                  maxValue: 50
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
        <Survey.Survey json={userJSON} onComplete={this.sendDataToServer}/>
      </div>
    )
  }
}

export default UserRegister
