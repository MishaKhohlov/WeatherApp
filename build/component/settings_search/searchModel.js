import {gEvent} from '../backboneEventsInit.js';
import {modelApp} from '../appModel/appModel.js';
import {googleServices} from '../google_api/googleApiInit';

export let searchModel = (function () {
  let dataAutocomplite = {};

  function getDataCity(place_id) {
    googleServices.placeInf().getDetails({
      placeId: place_id
    }, function (place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        modelApp.addCity(place.place_id, place.name,  place.geometry.location.lat(), place.geometry.location.lng());
      }
    });
  }

  gEvent.on('addListCity', (data) => {
    for(let item in data) {
      getDataCity(data[item].place_id);
    }
  });

  return {
    initRequest: () => {
      googleServices.init();
    },

    getAutocomplite: (val) => {
      return new Promise((resolve) => {
        googleServices.service().getPlacePredictions({input: val, types: ['(cities)']}, function (data) {
          dataAutocomplite = data;
          if (data) {
            resolve();
          }
        });
      })
    },

    getAutocompliteData: () => {
      return dataAutocomplite;
    }
  }
}());



