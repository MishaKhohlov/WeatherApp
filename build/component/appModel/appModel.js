import {gEvent} from '../backboneEventsInit.js';
import {forecast_service} from '../forecast_service/forecast_service.js';

export let modelApp = (function () {
  let data = {},
    currenCity,
    dataCity,
    flagTemp = false,
    flagDay,
    timer,
    previousPhase = 0;


  if (localStorage.getItem('flagTemp') === 'true') {
    flagTemp = true;
  }

  if (localStorage.getItem('flagDay')) {
    flagDay = localStorage.getItem('flagDay');
  }

  if (localStorage.getItem('WeatherApp')) {
    dataCity = JSON.parse(window.localStorage.WeatherApp);
  } else {
    dataCity = {}
  }

  function updateListCity(name, latitude, longitude, nameCity) {
    dataCity[name] = {
      latitude: latitude,
      longitude: longitude,
      name: nameCity
    };
    localStorage.setItem('WeatherApp', JSON.stringify(dataCity));
  }

  // forecast
  function getData(reload) {
    let promises = [];
    for (let prop in dataCity) {
      promises.push(new Promise((resolve, reject) => {
        forecast_service.getData(dataCity[prop].latitude, dataCity[prop].longitude, (val) => {
          data[prop] = _.extend(val, {name: dataCity[prop].name});
          resolve()
        }, () => {
          reject()
        })
      }))
    }
    Promise.all(promises).then(() => {
      if (!reload) {
        currenCity = Object.keys(data)[0];
      }

      localStorage.setItem('WeatherAppData', JSON.stringify(data));
      gEvent.trigger("dataGet", data, currenCity, flagTemp, false, flagDay);

    }).catch(() => {
        data = JSON.parse(localStorage.getItem('WeatherAppData'));
        currenCity = Object.keys(data)[0];
        gEvent.trigger("dataGet", data, currenCity, flagTemp, false, flagDay);
      }
    );
  }

  gEvent.on('deletedCityList', (objList) => {
    if (objList) {
      for (let item in objList) {
        delete dataCity[item];
        delete data[item];
      }

      localStorage.setItem('WeatherApp', JSON.stringify(dataCity));

      if (!data[currenCity] && Object.keys(dataCity).length) {
        currenCity = Object.keys(dataCity)[0];
      }
      if (data[currenCity]) {
        gEvent.trigger("dataGet", data, currenCity, flagTemp, false, flagDay);
      } else {
        gEvent.trigger("resetCity", {})
      }
    }
  });

  gEvent.on('updateViewDays', (dayCount) => {
    flagDay = dayCount;
    localStorage.setItem('flagDay', flagDay);
  });

  return {
    getUpdateData: () => {
      // default reload 30min
      timer = setInterval(getData, 30 * 1000 * 60);
      getData();
    },

    addCity: (name, nameCity, latitude, longitude) => {
      if (Object.keys(dataCity)[0] && !data[name]) {

        updateListCity(name, latitude, longitude, nameCity);

        forecast_service.getData(latitude, longitude, (val) => {
          data[name] = _.extend(val, {name: nameCity});
          gEvent.trigger('dataUpdate', data, name, flagTemp, false, flagDay);
        });

        localStorage.setItem('WeatherAppData', JSON.stringify(data));

      } else if (Object.keys(dataCity).length === 0) {

        updateListCity(name, latitude, longitude, nameCity);
        getData()

      } else {
        gEvent.trigger('deletedCityList', {});
      }
    },

    getCurentCity: () => {
      return currenCity;
    },

    changeCurentCity: (index) => {
      currenCity = Object.keys(data)[index];
      gEvent.trigger("slideChange", data, currenCity);
    },
    getPreviousPhase: () => {
      return previousPhase;
    },

    setPreviousPhase: (phase) => {
      previousPhase = phase;
    },

    changeTemp: (flag) => {
      flagTemp = flag;
      localStorage.setItem('flagTemp', flagTemp);

      let changeState = true;
      gEvent.trigger("dataGet", data, currenCity, flagTemp, changeState, flagDay);
    },

    reloadData: () => {
      getData(true);
    },

    updateDataInterval: (interval) => {
      if (interval !== 0) {
        timer = setInterval(getData, interval * 1000 * 60)
      }
    }
  }
}());
