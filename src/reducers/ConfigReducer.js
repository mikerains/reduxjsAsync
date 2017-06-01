import { REQUEST_CONFIG, RECEIVE_CONFIG, SET_PROJECTNAME, SET_CONFIGKEY } from '../actions/ConfigActions'

function handleConfig(state, action, value) {
    switch (action.type) {
    case REQUEST_CONFIG:
    console.log('REQUEST_CONFIG')
        return Object.assign({}, state, {
            projectName: action.projectName,
            configKey: action.configKey,
            configValue: action.configValue,
            [action.projectName + '.' + action.configKey]: ''
        })
    case RECEIVE_CONFIG:
        var newstate = Object.assign({}, state, {
            [action.projectName + '.' + action.configKey]: action.configValue,
            configValue: action.configValue,
            Spock: 'kirk'
        })
        console.log('RECEIVE CONFIG newstate')
        console.log(newstate);
        return newstate
    default:
    return state
  }
}

export function config(state={projectName:'Project1', configKey: 'Key1'}, action) {
  switch (action.type) {
    case SET_PROJECTNAME:
        return Object.assign({}, state, {projectName: action.projectName})
    case SET_CONFIGKEY:
        return Object.assign({}, state, {configKey: action.configKey})
    case REQUEST_CONFIG:
    case RECEIVE_CONFIG:
    // return Object.assign({}, state, {
    //   [action.projectName + '.' + action.configKey]: handleConfig(state, action)
    //})
        return handleConfig(state, action)
    default:
    return state
  }
}