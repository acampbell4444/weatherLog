import axios              from 'axios'
import { browserHistory } from 'react-router'

const initState = {
  allWeatherLogs: [],
  lastLog: {},
}

const reducer = (state=initState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case GET_ALL_WEATHERLOGS:
    newState.allWeatherLogs = action.allWeatherLogs
    break

  case UPDATE_LAST_LOG:
    newState.lastLog = action.log
    break  

  case UPDATE_RECENT_DELETED:
    newState.recentlyDeleted = action.id
    break

  default:
    return state
  }
  return newState
}

const GET_ALL_WEATHERLOGS = 'GET_ALL_WEATHERLOGS'
export const getAllLogs = allWeatherLogs => ({
  type: GET_ALL_WEATHERLOGS, allWeatherLogs
})

const UPDATE_LAST_LOG = 'UPDATE_LAST_LOG'
export const updateLastLog = log => ({
  type: UPDATE_LAST_LOG, log
})

const UPDATE_RECENT_DELETED = 'UPDATE_RECENT_DELETED'
export const updateRecentDeleted = id => ({
  type: UPDATE_RECENT_DELETED, id
})

export const fetchWeatherLogs = () =>
  dispatch =>
    axios.get('/api/weatherLogs')
      .then(response => {
        const logs = response.data
        dispatch(getAllLogs(logs))
      })
      .catch(failed => console.log(failed)
    )


export const addNewWeathLogEntry = (logEntry) =>
  dispatch =>
    axios.post('/api/weatherLogs', logEntry)
      .then(() => {
        dispatch(updateLastLog(logEntry))
      })
      .then(() => dispatch(fetchWeatherLogs()))
      .catch(err => {
        console.log(err)
      })


export const deleteLogEntry = (id) => {
  return (dispatch, getState) => {  
    return axios.delete('/api/weatherLogs/' + id)
    .then(logId=>{
      dispatch(updateRecentDeleted({recentlyDeleted:logId}))
    })
    .then(() => dispatch(fetchWeatherLogs()))
    .catch( err => console.error(err))
  };
};

// export const whoami = () =>
//   dispatch =>
//     axios.get('/api/auth/whoami')
//       .then(response => {
//         const user = response.data
//         dispatch(authenticated(user))
//       })
//       .catch(failed => dispatch(authenticated(null))
//     )
export default reducer
