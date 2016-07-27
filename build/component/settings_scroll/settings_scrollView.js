import {searchModel} from '../settings_search/searchModel.js';
import settings_townTemplate from '../settings_town/settings_townTemplate.js';
import settings_town_atcmplTemplate from '../settings_town/settings_town_atcmplTemplate.js';
import {settings_scrollController} from '../settings_scroll/settings_scrollController.js';
import {page_sliderController} from '../page_slider/page_sliderController.js';
import {gEvent} from '../backboneEventsInit.js';

// init template
let townTemplate = new settings_townTemplate();
let townTemplateAtcmpl = new settings_town_atcmplTemplate();

export let settings_scrollView = (function () {
  let cont,
    countryVal,
    data,
    dataCityLoaded = {},
    flagCash,
    tempCash;

  // reset checked checkbox
  function resetCheckList() {
    $('.set_cities__town .set_cities__del_chex').prop('checked', false);
  }

  //convert to celsius
  function toCelsius(temp) {
    return ((temp - 32) / 1.8).toFixed(0);
  }

  gEvent.on('addListCity', () => {
    resetCheckList();
  });

  gEvent.on('dataUpdate', (newCity, name, flag) => {
    dataCityLoaded[name] = newCity[name];
    flagCash = flag;
    settings_scrollView.renderData(flag);
  });

  gEvent.on('dataGet', (data, currenCity, flag) => {
    dataCityLoaded = data;
    flagCash = flag;
    settings_scrollView.renderData(flag);
  });

  gEvent.on('deletedCityList', () => {
    if (Object.keys(dataCityLoaded).length < 1) {
      cont.html('');
    } else {
      settings_scrollView.renderData(flagCash);
    }
  });

  function moveToNextSlide() {
    $('.set_cities__town').on('click', (ev) => {
      if (ev.target.classList[0] !== 'set_cities__check_icon' && ev.target.classList[0] !== 'set_cities__del_chex') {
        page_sliderController.goToNextSities($(ev.currentTarget).data('slide-index'));
      }
    });
  }

  return {
    initElements: () => {
      cont = $('.set_cities .custom-scroll_inner');
    },

    renderAutocomplite: () => {
      if (cont) {
        cont.html('');
      }
      data = searchModel.getAutocompliteData();

      data.forEach((val, i) => {
        if (val.terms.length === 3) {
          countryVal = val.terms[2].value
        } else {
          countryVal = val.terms[1].value
        }
        cont.append(townTemplateAtcmpl.renderTemplate({city: val.terms[0].value, country: countryVal}, i));
      });

      // init event
      settings_scrollView.event.addCities();
    },

    renderData: (temp) => {
      if (typeof temp === "boolean") {
        tempCash = temp;
      }
      if (cont) {
        cont.html('');
      }
      let index = 0;
      for (let cityItem in dataCityLoaded) {
        let item = dataCityLoaded[cityItem];
        let temper;
        if (!tempCash) {
          temper = toCelsius(item.currently.temperature);
        } else {
          temper = item.currently.temperature.toFixed(0);
        }
        cont.append(
          townTemplate.renderTemplate({
            weather_icon: item.currently.icon,
            temprature: temper,
            city: item.name,
            weather: item.currently.summary
          }, index, cityItem)
        );
        index++;
      }
      settings_scrollView.event.deleteCities();
      moveToNextSlide();
    },

    event: {
      addCities: () => {
        $('.set_cities__town .set_cities__del_chex').on('change', (ev) => {
          let index = ev.delegateTarget.attributes[2].value;
          settings_scrollController.addCities(data[index]);
        });
      },

      deleteCities: () => {
        $('.set_cities__town .set_cities__del_chex').on('change', (ev) => {
          let index = ev.delegateTarget.attributes[2].value;
          settings_scrollController.deleteCities(index);
        });
      }
    },

    manipulateChexbox: () => {
      let labes = $('.set_cities__label');
      if (!labes.is(':visible')) {
        labes.fadeIn();
      } else {
        labes.fadeOut();
        gEvent.trigger('deletedCityList', false);
      }
    },
    
    elems: () => {
      return {
        cities: $('.set_cities')
      }
    },

    resetAddCities: () => {
      resetCheckList();
    }
  }
}());

