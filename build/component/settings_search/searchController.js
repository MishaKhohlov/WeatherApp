import {searchModel} from '../settings_search/searchModel.js';
import {searchView} from '../settings_search/searchView.js';
import {settings_scrollView} from '../settings_scroll/settings_scrollView.js';
import {gEvent} from '../backboneEventsInit.js';

export let searchController = (function () {
  let caseInp = false,
    objAddCity,
    valueAutocomlite,
    objAddDelCity = {};

  gEvent.on('selectCity', (data) => {
    caseInp = true;
    objAddCity = data;
  });

  gEvent.on('selectDeleteCity', (data) => {
    objAddDelCity = data;
  });

  gEvent.on('disabledCity', () => {
    caseInp = false;
  });

  return {
    init: () => {
      searchView.initElements();
      searchModel.initRequest();

      searchView.event.acceptDeleteCities(() => {
        if (!caseInp && Object.keys(objAddDelCity).length !== 0) {
          searchView.acceptDeleteCitiesDefault();
          gEvent.trigger('deletedCityList', objAddDelCity);
          objAddDelCity = {}
        }
      });

      searchView.event.onAcceptChange((ev) => {
        ev.preventDefault();
        if (caseInp) {
          valueAutocomlite = false;
          gEvent.trigger('addListCity', objAddCity);
          caseInp = false;
          searchView.acceptDeleteCitiesDefault();
        } else {
          if(objAddDelCity) {
            objAddDelCity = {}
          }
          if(!valueAutocomlite) {
            searchView.deleteIconActive();
            settings_scrollView.manipulateChexbox();
          }
        }
      });

      if(window.google) {
        searchView.event.onChange((ev) => {
          gEvent.trigger('resetAddData', {});
          objAddDelCity = {};
          valueAutocomlite = ev.target.value;
          if (valueAutocomlite) {
            searchModel.getAutocomplite(valueAutocomlite).then(() => {
              settings_scrollView.renderAutocomplite();
            });
          } else {
            settings_scrollView.renderData();
            if (caseInp) {
              caseInp = false;
            }
          }
        })
      }
    }
  }
}());
