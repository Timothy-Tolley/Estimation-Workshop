import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Final from './Final'
import SplitOne from './SplitOne'
import SplitTwo from './SplitTwo'
import TriviaOne from './TriviaOne'
import TriviaTwo from './TriviaTwo'
import SplitThree from './SplitThree'
import AnalysisTwo from './AnalysisTwo'
import AnalysisOne from './AnalysisOne'
import UserRegister from './UserRegister'
import CostEstimate from './CostEstimate'
import GroupBenefit from './GroupBenefit'
import AnalysisOneP2 from './AnalysisOneP2'
import AnalysisThree from './AnalysisThree'
import ElementEstimations from './ElementEstimations'

class App extends React.Component {
  render () {
    return (
      <div className = 'page'>
        <Switch>
          <Route exact path='/' component={UserRegister} />
          <Route exact path='/split-one' component={SplitOne} />
          <Route exact path='/group-benefit' component={GroupBenefit}/>
          <Route exact path='/split-two' component={SplitTwo} />
          <Route exact path='/cost' component={CostEstimate} />
          <Route exact path='/analysis-one' component={AnalysisOne} />
          <Route exact path='/analysis-one-2' component={AnalysisOneP2} />
          <Route exact path='/element-estimations' component={ElementEstimations} />
          <Route exact path='/analysis-two' component={AnalysisTwo} />
          <Route exact path='/trivia-one' component={TriviaOne} />
          <Route exact path='/split-three' component={SplitThree} />
          <Route exact path='/trivia-two' component={TriviaTwo} />
          <Route exact path='/analysis-three' component={AnalysisThree} />
          <Route exact path='/final' component = {Final}/>
        </Switch>
      </div>
    )
  }
}

export default App
