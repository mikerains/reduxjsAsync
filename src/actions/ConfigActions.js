import fetch from 'isomorphic-fetch'

export const REQUEST_CONFIG = 'REQUEST_CONFIG'
export const RECEIVE_CONFIG = 'RECEIVE_CONFIG'
export const SET_PROJECTNAME = 'SET_PROJECTNAME'
export const SET_CONFIGKEY = 'SET_CONFIGKEY'

function receiveConfigValue(projectName, configKey, configValue) {
    console.log('receiveConfigValue:' + configValue);
    console.log(configValue);
    return {
        type: RECEIVE_CONFIG,
        projectName,
        configKey,
        configValue
    }
}

export function setProjectName(projectName) {
    return {
        type: SET_PROJECTNAME,
        projectName
    }
}

export function setConfigKey(configKey) {
    return {
        type: SET_CONFIGKEY,
        configKey
    }
}

export function fetchConfigValue(projectName, configKey) {
    return dispatch => {
        dispatch(requestConfig(projectName, configKey))
        return fetch('https://74pces2r7g.execute-api.us-east-2.amazonaws.com/beta?ProjectName='+projectName+'&ConfigKey='+configKey)
        .then(response => {
            // console.log('fetchConfigValue received: ' + response);
            // console.log(response.body);
            // return response;
            return  response.json()
        })
        .then(json => dispatch(receiveConfigValue(projectName, configKey, JSON.stringify(json))))
    }
}

export function requestConfig(projectName, configKey) {
    return {
        type: REQUEST_CONFIG,
        projectName,
        configKey
    }
}

export function receiveConfig(projectName, configKey, value) {
    return {
        type: REQUEST_CONFIG,
        projectName,
        configKey,
        value
    }
}