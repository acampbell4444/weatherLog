'use strict'

/**
 * `babel-preset-env` converts this general import into a selection of specific
 * imports needed to polyfill the currently-supported environment (as specified
 * in `.babelrc`). As of 2017-06-04, this is primarily to support async/await.
 */
import 'babel-polyfill'

import React                                          from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render}                                       from 'react-dom'
import {connect, Provider}                            from 'react-redux'

import store                                          from './store'

import Navbar                                         from './components/Navbar'
import Home                                           from './components/Home'
import WeatherLog                                     from './components/WeatherLog'

import Login                                          from './components/Login'
import WhoAmI                                         from './components/WhoAmI'
import NotFound                                       from './components/NotFound'

import { whoami }                                     from './reducers/auth'

const parasailLogApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <Navbar/>
      {children}
    </div>
)

const Authorize = () => {
  store.dispatch(whoami())
  .then(() => {
    const auth = store.getState().auth
    if(!auth){
      browserHistory.push('/home')
    }
  })

}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={parasailLogApp}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/weather-log" component={WeatherLog} onEnter={Authorize}/>
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
