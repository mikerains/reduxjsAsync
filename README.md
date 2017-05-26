# From https://redux.js.org

## http://redux.js.org/docs/advanced/AsyncActions.html


http://redux.js.org/docs/advanced/

### See also
[naive reduxjs](../../../reduxjs)

[ToDo List ReduxJs2](../../../reduxjs2)

[React TS](../../../reactts)

## npm task "build" build the Reddit Async applicaiton
## npm task "starthmr" runs dev server on localhost:8080 which uses Hot Module Replacement

### HMR based on:

https://webpack.js.org/concepts/hot-module-replacement/

https://webpack.js.org/guides/hmr-react/

### for HMR's webpack.config.js, 
### the postcss-loader didn't work out of the box form the Webpack Concepts HMR example
### the fix was found at https://github.com/postcss/postcss-loader/issues/92#issuecomment-280878821

in containers/Root.js, JSX is used to wrap a DOM Expression in parenthesis:
    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    )

in containers/AsyncApp.js, using ES7 to initialize isFetching
The const 'posts' is established as the value of postsBySubreddit().items,
See "Assigning to new variables" in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }

  in index.js, the Hot Module Replcement is configured by first creating an AppContainer from react-hot-loader,
  and then rendering into it the ourput of containers/Root.js' <provider> whose
  "store" property is set to the connect(mapStateToProps) result from containers/AsyncApp.js:
    export default connect(mapStateToProps)(AsyncApp)






