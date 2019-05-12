import React, { Component } 		   from 'react'
import { Pagination, Button }      from 'react-bootstrap'
import ReactHighcharts 				     from 'react-highcharts'
import HighchartsMore 			       from 'highcharts-more'
import WeatherWidget               from 'react-weather-display'
import moment                      from 'moment'
import { Spinner}                  from 'react-bootstrap'

import { getWindspeedConfig, getWindGustConfig, getWindDirectionConfig, getCloudCoverConfig, getHumidityConfig, getPrecipConfig, degToCompass, getConditionsLogo } from './utilities'
HighchartsMore(ReactHighcharts.Highcharts);


export default class Home extends Component {

  constructor(props){
    super(props)
    const { weatherInfo, hourlyList } = this.props
    this.state = { weatherInfo, hourlyList, hourlyListIndex: 0 }
  }
  
  componentDidMount() {
    const { getWeatherInfo } = this.props
    getWeatherInfo()
    this.timer = setInterval(()=> getWeatherInfo(), 15 * 60 * 1000)
  }

  componentDidUpdate(prevProps) {
    const {weatherInfo, hourlyList} = this.props
    if (Object.keys(weatherInfo).length) {
      if((Object.keys(prevProps.weatherInfo).length !== Object.keys(weatherInfo).length ) || (prevProps.weatherInfo.time !== weatherInfo.time) ) {
        this.setState({weatherInfo, hourlyListIndex: 0})
      }
    }
    if(prevProps.hourlyList[0] !== hourlyList[0]){
      this.setState({hourlyList, hourlyListIndex: 0})
    }
  }
  
  componentWillUnmount(){
    clearInterval(this.timer)
  }

  renderPagination(weatherInfo) {
    const hIdx = this.state.hourlyListIndex
    const {hourlyList} = this.props
    
    const handlePagClick = idx => {
      this.setState({
        weatherInfo: hourlyList[idx],
        hourlyListIndex: idx
      })
    }

    let items = [ 
      <Pagination.First disabled={hIdx=== 0} key={-2} onClick={e => handlePagClick(0)} />,
      <Pagination.Prev  disabled={hIdx=== 0} key={-1}  onClick={e => handlePagClick(hIdx -1)} />
    ]
    this.state.hourlyList.forEach((item, i) => {
      if(hIdx < 6){
        if(i >= hIdx && i < (hIdx + 6)) {
            items.push(
              <Pagination.Item key={i} onClick={e => handlePagClick(i)} active={i === hIdx} >
                {moment.unix(item.time).format('h:mm')}
              </Pagination.Item>
            )
          }
        }else {
          if(i > 5){
            items.push(
              <Pagination.Item key={i} onClick={e => handlePagClick(i)} active={i === hIdx} >
                {moment.unix(item.time).format('h:mm')}
              </Pagination.Item>
            )
          }
        }

      
    })
    items.push(
      <Pagination.Next disabled={hIdx=== 11} key={13} onClick={e => handlePagClick(hIdx + 1) }/> ,
      <Pagination.Last disabled={hIdx=== 11} key={14} onClick={e => handlePagClick(11) }/>
    )
    return items
  }

  render() {
    const { weatherInfo, getWeatherInfo, isLoading } = this.props

    return (
    <div style={{backgroundColor: '#2B323B'}}>
      
      <div className='row'>
        
        <div id='weatherIcon' className='col-4'>
          <WeatherWidget currentCondition={getConditionsLogo(this.state.weatherInfo)} currentTemperature={Object.keys(this.state.weatherInfo).length ? +this.state.weatherInfo.temperature.toFixed(0) : 0} height={400} width={400} ></WeatherWidget>
        </div>
        
        <div className='col-8' id='homeActionLogo'>
          <img src='https://fh-sites.imgix.net/sites/245/2016/05/22152531/tahoe-thunder-final.png?auto=compress%2Cformat&w=368&fit=max'/>
          {/*<img style={{marginLeft: '80px', height: '200px', width: '200px'}} src='https://www.pinclipart.com/picdir/big/184-1845283_league-to-save-lake-tahoe-eyes-on-the.png'/>*/}
        </div>

      </div>

      <div className='row'>
        <div id='weatherAtTime'> 
          <h3>Weather Forecast for {moment.unix(this.state.weatherInfo.time).format('lll')}</h3>

          <span id='lastUpdatedAt'>Last Updated- {this.props.weatherInfo.time ? moment.unix(this.props.weatherInfo.time).format('lll') : ''}</span>
          <Button size='sm' variant='outline-light' onClick={getWeatherInfo} style={{marginLeft: '20px'}}>
            {!isLoading&&(   
              <span>Update Forecast</span>
            )}
            {isLoading&& (
              <span>
              Loading...
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className='row pagRow'> 
        <Pagination size='lg'>
          {this.renderPagination(this.state.weatherInfo)} 
        </Pagination>
      </div>


     

      <div className='container' id='guageContainer' style={{paddingBottom: '400px', backgroundColor: '#2B323B'}}>
        <div className='row'>
          <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 padChart'>
      		  <ReactHighcharts config= {getWindspeedConfig(this.state.weatherInfo)}></ReactHighcharts>
    		  </div>
    		  
          <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 padChart'>
      		  <ReactHighcharts config= {getWindGustConfig(this.state.weatherInfo)}></ReactHighcharts>
    		  </div>
    		  
          <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 padChart'>
      		  <ReactHighcharts config= {getWindDirectionConfig(this.state.weatherInfo)}></ReactHighcharts>
    		  </div>
     
          <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 padChart'>
            <ReactHighcharts config= {getCloudCoverConfig(this.state.weatherInfo)}></ReactHighcharts>
          </div>

          <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 padChart'>
            <ReactHighcharts config= {getHumidityConfig(this.state.weatherInfo)}></ReactHighcharts>
          </div>

          <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 padChart'>
            <ReactHighcharts config= {getPrecipConfig(this.state.weatherInfo)}></ReactHighcharts>
          </div>

         </div>
      </div>

	 </div>
   )
  }
}






