import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import AsyncApp from './AsyncApp'
//import styles from './App.css';

//const store = configureStore({selectedSubreddit: "frontend", postsBySubreddit: {subreddits: [ 'reactjs', 'frontend', 'Spock' ]}})
const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    )
  }
}