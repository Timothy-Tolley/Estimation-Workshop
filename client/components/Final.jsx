import React from 'react'
import request from 'superagent'
import * as Survey from 'survey-react'

class Final extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentEmail: '',
      currentWorkEmail: ''
    }
    this.sendDataToServer = this.sendDataToServer.bind(this)
  }

  componentDidMount () {
    const userId = localStorage.getItem('user_id')
    const url = `/api/v1/users/email/${userId}`
    request
      .get(url)
      .then(res => {
        this.setState({
          currentEmail: res.body[0].email,
          currentWorkEmail: res.body[0].work_email
        })
      })
  }

  sendDataToServer (survey) {
    const userId = localStorage.getItem('user_id')
    const url = `/api/v1/users/email/${userId}`
    request
      .post(url)
      .send(survey.data)
      // needs update on production
      .on('error', (err) => alert(err.message))
      .then(res => {
        if (res.status === 200) {
        // remove on production
        // eslint-disable-next-line no-console
          console.log('finished!')
        }
      })
  }
  render () {
    var emailCheckJSON = {title: 'Please answer each question to the best of your ability',
      pages: [
        {name: 'page1',
          questions: [
            {
              type: 'radiogroup',
              name: 'correctCheck',
              title: `Is the following email correct? ${this.state.currentEmail}`,
              isRequired: true,
              colCount: 2,
              choices: [
                'Yes',
                'No'
              ]
            },
            {
              type: 'text',
              name: 'updateEmail',
              title: `Please Update Your Email Here:`,
              isRequired: true,
              inputType: 'email',
              placeHolder: 'example@email.com',
              visibleIf: '{correctCheck} = "No"',
              validators: [
                {
                  type: 'email'
                }
              ]
            }
          ]
        }
      ],
      completedHtml: "<h4>Thank you for taking Part in today's workshop!</h4>"
    }
    return (
      <div className = 'spacer-page'>
        <h1 className = 'spacer-text'>
         Thank you for taking part in todays workshop!
        </h1>
        <Survey.Survey json={emailCheckJSON} onComplete={this.sendDataToServer}/>
      </div>
    )
  }
}

export default Final
