import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchConfigValue, setProjectName, setConfigKey } from '../actions/ConfigActions'

class ConfigClient extends Component {
    constructor(props) {
        super(props);
        this.handleGetConfig = this.handleGetConfig.bind(this)
    }

    componentDidMount() {
        const { dispatch, projectName, configKey, configValue } = this.props
        dispatch(fetchConfigValue(projectName, configKey))
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
        const { projectName, configKey, configValue } = this.props
        return (
            <div>
                <h2>Config Client</h2>
                <div>
                    Project:<input type="text" value={projectName} onChange={e => this.handleChangeProjectName(e.target.value)} />
                    <br />
                    Key:<input type="text" value={configKey} onChange={e => this.handleChangeConfigKey(e.target.value)} />
                    <br />
                    <button onClick={this.handleGetConfig}>Get</button>
                    <br />
                    Value:{configValue}
                </div>
            </div>
        )
    }


}

function mapStateToProps(state) {
  const { config } = state

  const {
    projectName,
    configKey,
    configValue
  } = config

  return {
    projectName,
    configKey,
    configValue,
  }
}

export default connect(mapStateToProps)(ConfigClient)