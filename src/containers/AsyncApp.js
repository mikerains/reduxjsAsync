import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions'
import { fetchConfigValue, setProjectName, setConfigKey } from '../actions/ConfigActions'

import Picker from '../components/Picker'
import Posts from '../components/Posts'
import FilterLink from './FilterLink'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleGetConfig = this.handleGetConfig.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit))
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  handleChangeProjectName(projectName) {
    console.log('handleChangeProjectName fired: ' + projectName);
    this.props.dispatch(setProjectName(projectName))
  }

  handleChangeConfigKey(configKey) {
    console.log('handleChangeConfigKey fired: ' + configKey);
    this.props.dispatch(setConfigKey(configKey))
  }

  handleGetConfig(e) {
    console.log('handleGetConfig fired');
    console.log(e.target);
    console.log(this.props);
    e.preventDefault();
    const { dispatch, projectName, configKey } = this.props
    dispatch(fetchConfigValue(projectName, configKey))
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated, projectName, configKey, configValue } = this.props
    return (
      <div>
        <h2>Reditt Browser</h2>
        <div>
          Project:<input type="text" value={projectName} onChange={e => this.handleChangeProjectName(e.target.value)} />
          Key:<input type="text" value={configKey} onChange={e => this.handleChangeConfigKey(e.target.value)} />
          <br/>
          <button onClick={this.handleGetConfig}>Get</button>
          <br/>
          Value:{configValue}
          <FilterLink filter="config">Config Client </FilterLink>
        </div>
        <Picker value={selectedSubreddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
              onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  projectName: PropTypes.string,
  configKey: PropTypes.string,
  configValue: PropTypes.string
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit, config } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
      isFetching: true,
      items: []
    }

  const {
    projectName,
    configKey,
    configValue
  } = config

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
    projectName,
    configKey,
    configValue,
  }
}

export default connect(mapStateToProps)(AsyncApp)