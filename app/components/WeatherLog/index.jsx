import WeatherLog 								from './WeatherLogComponent'
import { connect } 				    			from 'react-redux'
import { deleteLogEntry, fetchWeatherLogs }	    from 'APP/app/reducers/weatherLog'



const mapStateToProps = (state, ownProps) => {
  const { allWeatherLogs } = state.weatherLog
  const user =	state.auth

  
  return {
  	allWeatherLogs,
  	user
  }
}

const mapDispatchToProps = dispatch => ({
	removeLogEntry(id){
  		dispatch(deleteLogEntry(id))
  	},
  	getAllLogs(){
  		dispatch(fetchWeatherLogs())
  	}

})

export default connect(mapStateToProps, mapDispatchToProps)(WeatherLog)