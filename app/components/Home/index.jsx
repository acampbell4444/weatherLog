import Home 					         from './HomeComponent'
import { connect } 				     from 'react-redux'
import { getWeatherInfo } 		 from 'APP/app/reducers/home'

const mapStateToProps = (state, ownProps) => {
  const user          = state.auth || null
  let { weatherInfo, isLoading } = state.home
  let currentWeather  = {}
  if(Object.keys(weatherInfo).length){
  	currentWeather = weatherInfo.currently
  }
  let hourlyList = Object.keys(weatherInfo).length ? weatherInfo.hourly.data : []
  if(hourlyList.length){
  	hourlyList = hourlyList.filter(data => data.time > weatherInfo.currently.time)
  	hourlyList = hourlyList.slice(0,11)
  	hourlyList.unshift(weatherInfo.currently)
  }
  
  return {
    user,
    weatherInfo: currentWeather,
    hourlyList,
    isLoading
  }
}

const mapDispatchToProps = dispatch => ({
	getWeatherInfo(){
	  return dispatch(getWeatherInfo())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)