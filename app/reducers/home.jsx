import axios from 'axios'


const initialState = {
  weatherInfo: {},
  isLoading: false
}

const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case UPDATE_WEATHER_INFO:
    newState.weatherInfo = action.weatherInfo
    break

    case UPDATE_LOADING_STATUS:
    newState.isLoading = action.bool
    break

    default:
    return state
  }
  return newState
}


const UPDATE_WEATHER_INFO   = 'UPDATE_WEATHER_INFO'
const UPDATE_LOADING_STATUS = 'UPDATE_LOADING_STATUS'

export const updateWeatherInfo = weatherInfo => {
  weatherInfo = JSON.parse(weatherInfo)
  return {type: UPDATE_WEATHER_INFO, weatherInfo}
}

export const updateLoadingStatus = bool => {
  return {type: UPDATE_LOADING_STATUS, bool}
}



export const getWeatherInfo = () =>
  dispatch => {
    dispatch(updateLoadingStatus(true))
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://api.darksky.net/forecast/ddf4026eb9825aecc3a5edb50ed51ff9/38.946436,-119.9691477'; 
    fetch(proxyurl + url)
    .then(response => {
      dispatch(updateLoadingStatus(false))
      return response.text()
    })
    .then(contents => dispatch(updateWeatherInfo(contents)))
    .catch(err => {
      dispatch(updateLoadingStatus(false))
      console.log(err)
    })
  }




export default reducer
