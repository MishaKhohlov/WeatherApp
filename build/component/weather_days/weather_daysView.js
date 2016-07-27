import {gEvent} from '../backboneEventsInit.js';
import weather_days from './weather_daysTemplate.js';

let weather_daysTemplate = new weather_days();

export let weather_daysView = (function () {
  let arrDataDays,
    arrDataDaysCont = [],
    cashDataDays = [];

  function toCelsius(temp) {
    return ((temp - 32) / 1.8).toFixed(0);
  }

  // conver time stamp
  function toConverTimeStamp(timestamp, utc) {
    let converTime = moment.tz(timestamp * 1000, utc);
    return {
      day: converTime.format('ddd')
    }
  }

  gEvent.on('updateViewDays', (flagDay) => {
    for (let i = 0; i < cashDataDays.length; i++) {
      $(arrDataDaysCont[i]).find('.days_wrapper').remove();

      let arrDataTemporary;
      if (!flagDay) {
        arrDataTemporary = cashDataDays[i].slice(0, flagDay.length - 1);
      } else {
        arrDataTemporary = cashDataDays[i].slice(0, flagDay);
      }

      $(arrDataDaysCont[i]).append(weather_daysTemplate.renderTemplate(arrDataTemporary));
    }

  });

  return {
    render: (dataObj, containerItem, flagTemp, flagDay) => {
      arrDataDays = [];
      let min, max, difference;

      // temperature range calculation
      min = dataObj.daily.data[0].temperatureMin;
      max = dataObj.daily.data[0].temperatureMax;

      dataObj.daily.data.forEach((item) => {
        if (item.temperatureMin < min) {
          min = item.temperatureMin;
        }
        if (item.temperatureMax > max) {
          max = item.temperatureMax;
        }
      });
      difference = max - min;

      dataObj.daily.data.forEach((item) => {
        let tempConvertmin, tempConvertmax;
        if (!flagTemp) {
          tempConvertmin = toCelsius(item.temperatureMin);
          tempConvertmax = toCelsius(item.temperatureMax);
        } else {
          tempConvertmin = item.temperatureMin.toFixed(0);
          tempConvertmax = item.temperatureMax.toFixed(0);
        }

        arrDataDays.push({
          dayWeek: toConverTimeStamp(item.time).day,
          icon: item.icon,
          positionMin: (item.temperatureMin - min) / difference * 100,
          positionMax: 100 - (item.temperatureMax - min) / difference * 100,
          minTemp: tempConvertmin,
          maxTemp: tempConvertmax
        })
      });

      // cash data
      cashDataDays.push(arrDataDays);

      let arrDataTemporary;
      if (!flagDay) {
        arrDataTemporary = arrDataDays.slice(0, arrDataDays.length - 1);
      } else {
        arrDataTemporary = arrDataDays.slice(0, flagDay);
      }

      // cash link on data
      arrDataDaysCont.push(containerItem);

      $(containerItem).append(weather_daysTemplate.renderTemplate(arrDataTemporary));
    }
  }
}());
