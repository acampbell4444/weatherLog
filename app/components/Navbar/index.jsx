import NavBar 			                      from './NavbarComponent'
import { connect } 		                    from 'react-redux'
import { reduxForm }                      from 'redux-form'
import { login, logout }	                from '../../reducers/auth'
import { getAllUsers, passwordError }     from 'APP/app/reducers/user'


const mapStateToProps = (state, ownProps) => {
  const user = state.auth || null
  const { allUsers, passwordError } = state.user
  
  return {
    user,
    allUsers,
    passwordError
  }
}

const mapDispatchToProps = dispatch => ({
  login(userName, password) {
  	return dispatch(login(userName, password))
  },
  logout() {
  	return dispatch(logout())
  },
  getAllUsers(){
    return dispatch(getAllUsers())
  },
  isPasswordError(bool){
    return dispatch(passwordError(bool))
  }
})


const LogInForm = reduxForm({
  form: 'Login',
})(NavBar)

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm)
