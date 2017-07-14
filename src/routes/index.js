import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

import {
  Info,
  Szkotka
} from 'components/Demo'
import DemoNumber from 'containers/Demo/Number'

export default (
  <Switch>
    <Route path='/szkotka/:name' component={Szkotka} />
    <Route exact path='/info' component={Info} />
    <Route path='/number/:num' component={DemoNumber} />
  </Switch>
)
