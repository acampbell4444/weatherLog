import { combineReducers } 			from 'redux'
import { reducer as formReducer } 	from 'redux-form'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  home: require('./home').default,
  user: require('./user').default,
  weatherLog: require('./weatherLog').default,
  form: formReducer
})

export default rootReducer
