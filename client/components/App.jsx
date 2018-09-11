import React from 'react'
import {Switch, Route} from 'react-router-dom'

import UserRegister from './UserRegister'
import CostEstimate from './CostEstimate'
import GroupBenefit from './GroupBenefit'
import AnalysisOne from './AnalysisOne'
import SplitOne from './SplitOne'
import SplitTwo from './SplitTwo'
import SplitThree from './SplitThree'
import TriviaOne from './TriviaOne'
import TriviaTwo from './TriviaTwo'
import AnalysisThree from './AnalysisThree'
import AnalysisTwo from './AnalysisTwo'
import ElementEstimations from './ElementEstimations'
import Final from './Final'
import AnalysisOneP2 from './AnalysisOneP2'

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
          <Route exact path='/trivia-one' component={TriviaOne} />
          <Route exact path='/split-three' component={SplitThree} />
          <Route exact path='/trivia-two' component={TriviaTwo} />
          <Route exact path='/analysis-two' component={AnalysisTwo} />
          <Route exact path='/analysis-three' component={AnalysisThree} />
          <Route exact path='/element-estimations' component={ElementEstimations} />
          <Route exact path='/final' component = {Final}/>
        </Switch>
      </div>
    )
  }
}

export default App
