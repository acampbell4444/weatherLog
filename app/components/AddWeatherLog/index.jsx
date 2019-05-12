import React, { Component } 		from 'react'
import { connect } 					from 'react-redux'
import { reduxForm }                from 'redux-form'
import  AddWeatherLog 				from './AddWeatherLog'
import { addNewWeathLogEntry }	    from 'APP/app/reducers/weatherLog'



const mapStateToProps = state => {
  const user = state.auth ? state.auth : null
  //const lastEntry = state.weatherLog.lastLog ? state.weatherLog.lastLog : {}
  return {
  	user
     //initialValues: lastEntry
  }
}

const mapDispatchToProps = dispatch => (
 {
    addNewWeathLogEntry(entry){
  	  dispatch(addNewWeathLogEntry(entry))
    }
  }
  
)

const AddWLogForm = reduxForm({
  form: 'AddWLog',
  enableReinitialize: true,
})(AddWeatherLog)

export default connect(mapStateToProps, mapDispatchToProps)(AddWLogForm)