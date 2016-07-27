import {settings_scrollView} from '../settings_scroll/settings_scrollView.js';
import {gEvent} from '../backboneEventsInit.js';


export let settings_scrollController = (function () {
  let addCity = {},
    deleteCity = {};

  gEvent.on('addListCity', () => {
    addCity = {};
  });

  gEvent.on('resetAddData', () => {
    addCity = {};
    deleteCity = {};
    settings_scrollView.resetAddCities();
  });

  gEvent.on('deletedCityList', () => {
    deleteCity = {};
  });

  return {
    init: () => {
      // init scroll
      settings_scrollView.elems().cities.customScroll({
        vertical: true,
        horizontal: false
      });
      settings_scrollView.initElements();
    },

    addCities: (data) => {
      if (!addCity[data.place_id]) {
        addCity[data.place_id] = data;
      } else {
        delete addCity[data.place_id];
      }
      if (Object.keys(addCity).length !== 0) {
        gEvent.trigger('selectCity', addCity);
      } else {
        gEvent.trigger('disabledCity', {})
      }
    },

    deleteCities: (index) => {
      if (!deleteCity[index]) {
        deleteCity[index] = 'del';
      } else {
        delete deleteCity[index];
      }
      gEvent.trigger('selectDeleteCity', deleteCity);
    }
  }
}());
