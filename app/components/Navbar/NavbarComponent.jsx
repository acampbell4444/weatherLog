import React, { Component } 					                   from 'react'
import { browserHistory, withRouter }                    from 'react-router'
import { Navbar, Nav, Form, Button, Alert, Modal }       from 'react-bootstrap'
import { Field } 					  			                       from 'redux-form'
import { FaPlusCircle }                                  from 'react-icons/fa'
import { FaRegUser } 							                       from 'react-icons/fa'
import  AddWeatherLog                                    from '../AddWeatherLog'

const required = (value, x, y , fieldName) => value ? undefined : fieldName + ' is required'

class NavBar extends Component {

  constructor(props){
    super(props)
    this.validEmail   = this.validEmail.bind(this)
    this.state = { showModal: false }
  }

  componentDidMount() {
    const { getAllUsers } = this.props
    getAllUsers()
  }

  validEmail(value){
    const { allUsers } = this.props
    const allUserNames = allUsers.map(user => user.email)
    return allUserNames.includes(value) ? undefined : 'email not on record'
  }
  
  render() {
  	const {user, login, logout, valid, passwordError, isPasswordError} = this.props
 
    return (
      <div>
        <Navbar bg='success' variant='dark'>

          {!user&&(
            <Nav className='mr-auto'>
	          <Nav.Link href='/maintenance' disabled={true}>
	      	    Login for access
	      	  </Nav.Link>
	      	</Nav>
	      )}
          
          {user&&(
            <Nav className='mr-auto'>
            {(this.props.location.pathname !== '/weather-log') && ( 
              <Button variant='outline-light'  disabled={!user} onClick={e=> browserHistory.push('/weather-log')}>
                 WeatherLog
              </Button> 
            )}
            {(this.props.location.pathname === '/weather-log') && (
            <span>   
              <Button variant='outline-light'   onClick={e=> browserHistory.push('/home')}>
                Home 
              </Button>  		  
              <Button variant='outline-light' id='newWeathLogButton' onClick={e=> this.setState({showModal: true})}>
      		      <FaPlusCircle /> {' Add WeatherLog Entry'}
      		    </Button>
            </span>
            )}
      	    </Nav>
	        )}

    	    {!user&&(
    	      <Form inline onSubmit={e => {
    		      e.preventDefault()
    		      login(e.target.email.value, e.target.password.value)
    		    }}>
      		    <Field name="email" type="email"component={renderField} label="Email" validate={ [required, this.validEmail] }/> 
      		    <Field name="password" type="password"component={renderField} label="Password" validate={ [required] }/> 
      		    <Button type='submit' disabled={!valid} variant='outline-light'>Log In</Button>
    		    </Form>
    	    )}
    	    
    	    {user&&(
    	      <div>
    	        <Nav className='mr-auto'>
    	          <Nav.Link disabled> <FaRegUser/> <span id='navemail'>{user.name}</span> </Nav.Link> 
    	          <Button variant='outline-light' onClick={e => {logout(); browserHistory.push('/home')}}>Log Out</Button>
		        </Nav>
    	      </div>
    	    )}
   
  		  </Navbar>

          <Modal id='loginMod' show={passwordError} onHide={e => isPasswordError(false)} style={{textAlign: 'center'}} >
            <Modal.Body closeButton>The password you entered is incorrect.</Modal.Body>
            <Modal.Footer>
              <Button variant='success' onClick={e => isPasswordError(false)}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal size='lg' dialogClassName="modal-90w" id='newWeathMod' show={this.state.showModal} onHide={e => this.setState({showModal: false})} style={{textAlign: 'center'}} >
            <Modal.Title id='wLogModalTitle'> New WeatherLog Entry </Modal.Title>
            <Modal.Body>
              <AddWeatherLog onLogSubmit={e => this.setState({showModal: false})}/>
            </Modal.Body>
          </Modal>
        
      </div>
    )
  }
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div className='row'>
      <div className='col-12'><input className='signInput' {...input} placeholder={label} type={type}/>
        <div id='logInErrors'>
          {touched && ((error && <Alert variant='danger'> {error} </Alert>))} 
        </div>
      </div>
    </div>
  </div>
)

export default withRouter(NavBar)