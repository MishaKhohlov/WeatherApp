import {gEvent} from '../backboneEventsInit.js';
import weather_primary_infoTemplate from '../weather_primary_info/weather_primary_infoTemplate.js';
import weather_infoTemplate from '../weather_info/weather_infoTemplate.js';
import weather_template from './weatherTemplate.js'
import weather_slider from '../weather_slider/weather_sliderTemplate.js'

let weatherPrimaryTemplate = new weather_primary_infoTemplate();
let weatherInfoTemplate = new weather_infoTemplate();
let weatherTemplate = new weather_template();
let weatherSliderTemplate = new weather_slider();

export let weatherView = (function () {
  // for view
  let reloadBtn,
    body,
    weatherAnimEl,
    moonphase = ['full-moon', 'almost-old', 'old-moon', 'grow-moon', 'almost-full', 'empty-moon'],
    backgGradient = {
      morning: 'linear-gradient(to right, rgb(61, 160, 255) 0%, rgb(22, 110, 239))',
      day: 'linear-gradient(to right, rgb(22, 110, 239) 0%, rgb(2, 70, 148))',
      endDay: 'linear-gradient(to right, rgb(22, 110, 239) 0%, rgb(2, 54, 108))',
      sunset: 'linear-gradient(to right, rgb(248, 159, 0) 0%, rgb(239, 89, 0))',
      night: 'linear-gradient(to right, rgb(21, 24, 78) 0%, rgb(8, 11, 33))'
    },
    windDirection = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'],
    objWeatherClass = {
      rain: 'rain',
      drizzle: 'rain',
      snow: 'snow'
    };


  gEvent.on("slideChange", (data, currenCity) => {
    let obj = data[currenCity];
    deletedClasses();
    changeAnimationWeather(obj);
    changeGradientColor(obj);
  });

  //convert to celsius
  function toCelsius(temp) {
    return ((temp - 32) / 1.8).toFixed(0);
  }

  // conver time stamp
  function toConverTimeStamp(timestamp, utc) {
    let converTime = moment.tz(timestamp * 1000, utc);
    return {
      time: converTime.format('HH') + ':' + converTime.format('mm'),
      dayWeek: converTime.format('dddd'),
      month: converTime.format('MMMM'),
      day: converTime.format('D'),
      hour: converTime.format('H.mm')
    }
  }

  function deletedClasses() {
    for (let value in objWeatherClass) {
      if(weatherAnimEl) {
        weatherAnimEl.removeClass(value);
      }
    }
  }

  function changeAnimationWeather(obj) {
    //add class  rain, snow, drizzle
    if(weatherAnimEl) {
      weatherAnimEl.hide();

      if (objWeatherClass[obj.currently.icon]) {
        weatherAnimEl.show();
        weatherAnimEl.addClass(objWeatherClass[obj.currently.icon]);
      }
    }
  }

  function changeGradientColor(obj) {
    if (!body) {
      body = $('body');
    }
    if (obj) {
      let currentTime = Number(toConverTimeStamp(obj.currently.time, obj.timezone).hour);
      let sunset = Number(toConverTimeStamp(obj.daily.data[0].sunsetTime, obj.timezone).hour);
      let sunrise = Number(toConverTimeStamp(obj.daily.data[0].sunriseTime, obj.timezone).hour);

      if (currentTime < sunrise || currentTime > sunset) {
        body.css('background', backgGradient.night)
      } else if(currentTime < sunrise+1 && currentTime > sunrise) {
        body.css('background', backgGradient.morning)
      } else if(currentTime > sunrise+1 && currentTime < sunset-2){
        body.css('background', backgGradient.day)
      } else if(currentTime > sunset-2 && currentTime < sunset-1 ){
        body.css('background', backgGradient.endDay)
      } else {
        body.css('background', backgGradient.sunset)
      }
    }
  }
  
  function getMoonIcon(phasesCurrent, phaseNext) {
    let currentPhase = (phasesCurrent.moonPhase * 100);
    let nextPhase = (phaseNext.moonPhase * 100);
    if (currentPhase >= 90) {
      return moonphase[0];
    }
    if (currentPhase < 90 && currentPhase >= 40 && nextPhase < currentPhase) {
      return moonphase[1];
    }
    if (currentPhase < 40 && currentPhase >= 10 && nextPhase < currentPhase) {
      return moonphase[2];
    }
    if (currentPhase < 40 && currentPhase >= 10 && nextPhase > currentPhase) {
      return moonphase[3];
    }
    if (currentPhase < 90 && currentPhase >= 40 && nextPhase > currentPhase) {
      return moonphase[4];
    }
    if (currentPhase < 10) {
      return moonphase[5];
    }
  }

  function degToCompass(num) {
    let val = Math.floor((num / 22.5) + 0.5);
    return windDirection[(val % 16)];
  }
  
  // render weather block
  function render(obj, cont, flagTemp) {
    weatherAnimEl = $('.weatherAnim');
    // convert temperature
    let tempConvert;

    if (!flagTemp) {
      tempConvert = toCelsius(obj.currently.temperature);
    } else {
      tempConvert = obj.currently.temperature.toFixed(0);
    }

    // slice data for primary inform
    let objPrimaryData = {
      time: toConverTimeStamp(obj.currently.time, obj.timezone).time,
      cityName: obj.name,
      dayWeek: toConverTimeStamp(obj.currently.time, obj.timezone).dayWeek,
      month: toConverTimeStamp(obj.currently.time, obj.timezone).month,
      day: toConverTimeStamp(obj.currently.time, obj.timezone).day,
      weather_class: obj.currently.icon,
      temp: tempConvert,
      weather_desc: obj.currently.summary,
      icon_moon: getMoonIcon(obj.daily.data[0], obj.daily.data[1]),
      moon_info: (obj.daily.data[0].moonPhase * 100).toFixed(0)
    };

    // slice data for slider
    let arrHourlyData = [];
    for (let i = 0; i <= 24; i++) {
      let tempConvert;
      if (!flagTemp) {
        tempConvert = toCelsius(obj.hourly.data[i].temperature);
      } else {
        tempConvert = obj.hourly.data[i].temperature.toFixed(0);
      }

      arrHourlyData.push({
        time: toConverTimeStamp(obj.hourly.data[i].time, obj.timezone).time,
        temperature: tempConvert,
        icon: obj.hourly.data[i].icon
      });
    }

    // slice data for inform

    let objInfoData = {
      wet: obj.daily.data[0].humidity.toFixed(1),
      windy: obj.currently.windSpeed.toFixed(0),
      sunrise: toConverTimeStamp(obj.daily.data[0].sunriseTime, obj.timezone).time,
      sunset: toConverTimeStamp(obj.daily.data[0].sunsetTime, obj.timezone).time,
      windBearing: degToCompass(obj.currently.windBearing)
    };

    // render templates
    let domRend = new Promise((resolve) => {
      $(cont).html(weatherTemplate.renderTemplate(weatherPrimaryTemplate.renderTemplate(objPrimaryData),
        weatherSliderTemplate.renderTemplate(arrHourlyData),
        weatherInfoTemplate.renderTemplate(objInfoData)));
      resolve();
    });

    // event for init slider
    domRend.then(() => {
      // fixed slider page
      $('.bx-viewport').css('height', 'auto');
      gEvent.trigger('domRendered', cont);
    })
  }

  return {
    initElement: (cont) => {
      reloadBtn = $(cont).find('.weather_refresh__time_icon');
    },
    // init event
    event: {
      reload: (callback) => {
        reloadBtn.click(callback);
      }
    },
    // start render
    render: (obj, cont, flagTemp) => {
      render(obj, cont, flagTemp);
    },

    changeAnimation: (obj) => {
      deletedClasses();
      changeAnimationWeather(obj);
      changeGradientColor(obj);
    }
  }
}());

