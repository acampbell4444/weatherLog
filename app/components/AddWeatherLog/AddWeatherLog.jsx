import React                        from 'react'
import { Field }                    from 'redux-form'
import DatePicker                   from 'react-datepicker'
import moment                       from 'moment'
 
const required = value => (value ? undefined : 'Required')

export default class AddWLog extends React.Component {

  constructor(props){
    super(props)
    this.state = {date: new Date()}
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange(date) {
    this.setState({
      date
    });
  }

  render() {
  const { user, valid, addNewWeathLogEntry, change, onLogSubmit } = this.props
  return (
  <div className='center'>
    <form onSubmit={evt => {
      evt.preventDefault()
      let user_Name = user.name
      let date = moment(this.state.date).format('l')
      let time = evt.target.time.value 
      let location = evt.target.location.value 
      let windSpeed = evt.target.windSpeed.value
      let windDirection = evt.target.windDirection.value
      let conditions = evt.target.conditions.value
      let completedEntry = { user_Name, date, time, location, windSpeed, windDirection, conditions, user_id: user.id}
      addNewWeathLogEntry(completedEntry)
      onLogSubmit()
    } }>

      <div className='row'>
        <label className='col-3'>Date</label>

        <DatePicker
          className='col-8 wLogInput form-control'
          selected={this.state.date}
          onChange={date => {
            this.handleDateChange(date)
            change('date', date)
          }}
        />
      </div>

      <div className='row'>
        <label className='col-3'>Time</label>
        <Field className='col-8 wLogInput form-control' name="time" label='Time' component='select' >
            <option value='8 am'>8 am</option>
            <option value='9 am'>9 am</option>
            <option value='10 am'>10 am</option>
            <option value='11 am'>11 am</option>
            <option value='12 pm'>12 pm</option>
            <option value='1 pm'>1 pm</option>
            <option value='2 pm'>2 pm</option>
            <option value='3 pm'>3 pm</option>
            <option value='4 pm'>4 pm</option>
            <option value='5 pm'>5 pm</option>
            <option value='6 pm'>6 pm</option>
            <option value='7 pm'>7 pm</option>
            <option value='8 pm'>8 pm</option>
        </Field>
      </div>

      <div className='row'>
        <label className='col-3'>Location</label>
        <Field className='col-8 wLogInput form-control' name="location" label='Location' component='select'>
            <option value='Timber Cove'>Timber Cove</option>
            <option value='Lakeside'>Lakeside</option>
        </Field>
      </div>

      <div className='row'>
        <label className='col-3'>Wind Speed</label>
        <Field className='col-8 wLogInput form-control' name="windSpeed" type="number" label='Wind Speed' validate={[required]}
          component={renderField}
        />
      </div>

      <div className='row'>
        <label className='col-3'>Direction</label>
        <Field className='col-8 wLogInput form-control' name="windDirection" label='Wind Direction' component='select'>
            <option value='N'>North</option>
            <option value='NE'>NorthEast</option>
            <option value='E'>East</option>
            <option value='SE'>SouthEast</option>
            <option value='S'>South</option>
            <option value='SW'>SouthWest</option>
            <option value='W'>West</option>
            <option value='NW'>NorthWest</option>
        </Field><div></div>
      </div>

      <div className='row'>
        <label className='col-3'>Conditions</label>
        <Field className='col-8 wLogInput form-control' name="conditions" type="text" label='Conditions'
          component={renderField}
        />
      </div>

      <button id='submitWLog' className='btn btn-success' type="submit" disabled={!valid}>
         Submit
      </button>      
      <button id='submitWLogd' className='btn btn-danger' onClick={e=> {e.preventDefault(); onLogSubmit()}}>
         Cancel
      </button>
    </form>
  </div>
  )}
}


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div>
      <div><input className='wLogInput form-control' {...input} type={type} />
        <div className='userSignUpErrors'>
          {touched && ((error && <span className='errWarn'>{error}</span>) || (warning && <span className='errWarn'>{warning}</span>))}
        </div>
      </div>
    </div>
  </div>
  )