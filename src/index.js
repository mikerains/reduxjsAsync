import 'babel-polyfill'

import React from 'react'
import  ReactDOM  from 'react-dom'
//import App from './components/App'
import Root from './containers/Root';

import { AppContainer } from 'react-hot-loader';

//see https://webpack.js.org/guides/hmr-react/

// AppContainer is a necessary wrapper component for HMR
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Root);
console.log('module.hot=')
console.log(module.hot);
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render(Root)
  });
}
