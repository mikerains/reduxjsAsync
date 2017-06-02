import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'
import ConfigClient from './ConfigClient'
//import styles from './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
          <Route exact path="/" component={AsyncApp} />
          <Route path="/config" component={ConfigClient} />
          </div>
        </Router>
      </Provider>
    )
  }
}