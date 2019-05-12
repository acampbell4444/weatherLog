export const getWindspeedConfig = weatherInfo => {
  const windSpeed = Object.keys(weatherInfo).length ? weatherInfo.windSpeed : 0 
  windSpeedConfig.series[0].data = windSpeed ? [windSpeed] : [0]
  windSpeedConfig.title.text = windSpeed ? 'Wind Speed: ' + windSpeed.toFixed(1) + ' mph' : 'Wind Speed: N/A'
  return windSpeedConfig
}

export const getWindGustConfig = weatherInfo => {
  const windGust = Object.keys(weatherInfo).length ? weatherInfo.windGust : 0
  windGustConfig.series[0].data = windGust ? [windGust] : [0]
  windGustConfig.title.text = windGust ? 'Wind Gust: ' + windGust.toFixed(1) + ' mph' : 'Wind Gust: N/A'
  return windGustConfig
}

export const getWindDirectionConfig = weatherInfo => {
  const windBearing = Object.keys(weatherInfo).length ? weatherInfo.windBearing : ''
  windDirectionConfig.series[0].data = windBearing ? [windBearing] : [0]
  const windBearingInLetters = typeof windBearing === 'number' ? degToCompass(weatherInfo.windBearing) : ''
  windDirectionConfig.title.text = windBearingInLetters.length ? 'Wind Direction: ' + windBearingInLetters : 'Wind Direction: N/A'
  return windDirectionConfig
}

export const getCloudCoverConfig = weatherInfo => {
  const cloudyPercentage = Object.keys(weatherInfo).length ? weatherInfo.cloudCover : 0
  cloudCoverConfig.series[0].data[0].y = 1 - cloudyPercentage
  cloudCoverConfig.series[0].data[1].y = cloudyPercentage
  cloudCoverConfig.title.text ='Cloud Cover: ' + (cloudyPercentage * 100).toFixed(0) + '%'
  return cloudCoverConfig
}

export const getHumidityConfig = weatherInfo => {
  const humidityPercentage = Object.keys(weatherInfo).length ? weatherInfo.humidity : 0
  humidityConfig.series[0].data[1].y = humidityPercentage
  humidityConfig.series[0].data[0].y = 1 - humidityPercentage
  humidityConfig.title.text ='Humidity: ' + (humidityPercentage * 100).toFixed(0) + '%'
  return humidityConfig
}  

export const getPrecipConfig = weatherInfo => {
  const precipChance = Object.keys(weatherInfo).length ? weatherInfo.precipProbability : 0
  precipChanceConfig.series[0].data[0].y = precipChance
  precipChanceConfig.series[0].data[1].y = 1 - precipChance
  precipChanceConfig.title.text ='Chance of Precip: ' + (precipChance * 100).toFixed(0) + '%'
  return precipChanceConfig
}

export const getConditionsLogo = weatherInfo => {
   const currentConditions = Object.keys(weatherInfo).length ? weatherInfo.icon : ''
   const weatherObject = {
    'clear-day'          : 'sunny',
    'clear-night'        : 'sunny',
    'rain'               : 'rainy',
    'snow'               : 'snow',
    'fog'                : 'cloudy',
    'cloudy'             : 'cloudy',
    'sleet'              : 'stormy',
    'wind'               : 'stormy',
    'wind'               : 'stormy',
    'hail'               : 'stormy',
    'thunderstorm'       : 'stormy',
    'tornado'            : 'stormy',
    'partly-cloudy-day'  : 'mostlySunny',
    'partly-cloudy-night': 'mostlySunny'
   }
   return  Object.keys(weatherInfo).length ? weatherObject[currentConditions] : ''
}

export const degToCompass = num => {
  const val = Math.floor((num / 22.5) + 0.5);
  const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

const windSpeedConfig = {
  chart: {
    type: 'gauge',
    plotBackgroundColor: null,
    plotBackgroundImage: null,
    plotBorderWidth: 0,
    plotShadow: false,
    backgroundColor: '#2B323B',

  },
  animation: {
    duration: 1000
  },
  title: {
    text: 'Wind Speed',
    style: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '22px'
    }
  },
  credits: {
    enabled: false
  },

  pane: {
    startAngle: -150,
    endAngle: 150,
    background: [{
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, '#FFF'],
          [1, '#333']
        ]
      },
      borderWidth: 1,
      outerRadius: '109%'
    }, {
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, '#333'],
          [1, '#FFF']
        ]
      },
      borderWidth: 1,
      outerRadius: '107%'
    }, {
      // default background
    }, {
      backgroundColor: '#DDD',
      borderWidth: 0,
      outerRadius: '105%',
      innerRadius: '103%'
    }]
  },

  // the value axis
  yAxis: {
    min: 0,
    max: 50,

    minorTickInterval: 'auto',
    minorTickWidth: 1,
    minorTickLength: 10,
    minorTickPosition: 'inside',
    minorTickColor: '#666',

    tickPixelInterval: 30,
    tickWidth: 2,
    tickPosition: 'inside',
    tickLength: 10,
    tickColor: '#666',
    labels: {
      step: 2,
      rotation: 'auto'
    },
    title: {
      text: 'mph'
    },
    plotBands: [{
      from: 0,
      to: 15,
      color: 'green'
    }, {
      from: 15,
      to: 20,
      color: 'yellow'
    }, {
      from: 20,
      to: 50,
      color: '#DF5353' // red
    }]
  },

  series: [{
    name: 'Wind Speed',
    data: [0],
    tooltip: {
      valueSuffix: 'mph'
    }
  }]
}

const windGustConfig = Object.assign({}, windSpeedConfig, {
  title: {
  	text: 'Wind Gust',
    style: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '22px'
    }
  },
  yAxis: {
    min: 0,
    max: 70,

    minorTickInterval: 'auto',
    minorTickWidth: 1,
    minorTickLength: 10,
    minorTickPosition: 'inside',
    minorTickColor: '#666',

    tickPixelInterval: 30,
    tickWidth: 2,
    tickPosition: 'inside',
    tickLength: 10,
    tickColor: '#666',
    labels: {
      step: 2,
      rotation: 'auto'
    },
    title: {
      text: 'mph'
    },
    plotBands: [{
      from: 0,
      to: 18,
      color: 'green'
    }, {
      from: 18,
      to: 22,
      color: 'yellow'
    }, {
      from: 22,
      to: 70,
      color: '#DF5353' // red
    }]
  },
  series: [{
    name: 'Wind Gust',
    data: [0],
    tooltip: {
      valueSuffix: 'mph'
    }
  }]
})

const windDirectionConfig = {
  chart: {
    type: 'gauge',
    plotBackgroundColor: null,
    plotBackgroundImage: null,
    plotBorderWidth: 0,
    plotShadow: false,
    backgroundColor: '#2B323B',

  },

  title: {
    text: 'Wind Direction',
    style: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '22px'
    }
  },
  credits: {
    enabled: false
   },

  pane: {
    startAngle: 0,
    endAngle: 360,
    background: [{
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, '#FFF'],
          [1, '#333']
        ]
      },
      borderWidth: 1,
      outerRadius: '109%'
    }, {
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, '#333'],
          [1, '#FFF']
        ]
      },
      borderWidth: 1,
      outerRadius: '107%'
    }, {
      // default background
    }, {
      backgroundColor: '#DDD',
      borderWidth: 0,
      outerRadius: '105%',
      innerRadius: '103%'
    }]
  },

  // the value axis
  yAxis: [{
    min: 0,
    max: 360,

    minorTickInterval: 'auto',
    minorTickWidth: 1,
    minorTickLength: 10,
    minorTickPosition: 'inside',
    minorTickColor: '#666',

    tickPixelInterval: 30,
    tickWidth: 2,
    tickPosition: 'inside',
    tickLength: 10,
    tickColor: '#666',
    labels: {
      step: 2,
      rotation: 'auto'
    },
    title: {
      text: 'degrees'
    },
  },{
    title: {
        text: '',
    },
    type: 'category',
    categories: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'],
    min: 0,
    max: 8,
    lineColor: '#ddd',
    offset: -40,
    tickInterval: 1,
    tickWidth: 1,
    tickPosition: 'outside',
    tickLength: 40, // =50-10
    tickColor: '#ddd',
    minorTickInterval: 1,
    minorTickWidth: 0,
    minorTickLength: 50,
    minorTickPosition: 'inside',
    minorTickColor: '#0f0',
    labels: {
        step: 1,
        distance: 2,
        rotation: 'auto'
    },
    endOnTick: true,
        
  }],

  series: [{
    name: 'Wind Direction',
    data: [0],
    tooltip: {
      valueSuffix: ' Degrees'
    }
  }]
}

const cloudCoverConfig = {
	chart: {
	    plotBackgroundColor: null,
	    plotBorderWidth: null,
	    plotShadow: false,
	    type: 'pie',
      backgroundColor: '#2B323B',

	},
  animation: {
    duration: 1000
  },
	title: {
	  text: 'Cloud Cover',
    style: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '22px'
    }
	},
	credits: {
      enabled: false
    },
	tooltip: {
	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	},
	plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      colors: ['#28A645','#0001FF'],
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
        distance: -50,
        filter: {
          property: 'percentage',
          operator: '>',
          value: 4
        }
      }
    }
	},
	series: [{
	  name: 'Chance',
	  data: [
	    { name: 'Sun', y: 0 },
	    { name: 'Clouds', y: 0 },
	  ]
	}]
}

const humidityConfig = Object.assign({}, cloudCoverConfig, {
  title: {
    text: 'Humidity',
    style: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '22px'
    }
  },
  series: [{
    name: 'Chance',
    data: [
        { name: 'Dry', y: 0 },
        { name: 'Humid', y: 0 }
    ]
  }],
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          colors: ['#28A645', '#0001FF'],
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
              distance: -50,
              filter: {
                  property: 'percentage',
                  operator: '>',
                  value: 4
              }
          }
      }
  },
  
})

const precipChanceConfig = Object.assign({}, cloudCoverConfig, {
  title: {
    text: 'Chance of Precip.',
    style: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '22px'
    }
  },
  series: [{
    name: 'Chance',
    data: [
        { name: 'Precipitation', y: 0 },
        { name: 'No Precipitation', y: 0 }
    ]
  }],
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          colors: [ '#0001FF','#28A645'],
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
              distance: -50,
              filter: {
                  property: 'percentage',
                  operator: '>',
                  value: 4
              }
          }
      }
  },
  
})
