import './settings_search/searchModel';
import {page_sliderController} from './page_slider/page_sliderController.js';
import {modelApp} from './appModel/appModel.js';
import {searchController} from './settings_search/searchController.js';
import {settings_scrollController} from './settings_scroll/settings_scrollController.js';
import {settings_degreesController} from './settings_degrees/settings_degreesController.js';
import {settings_rangeController} from './settings_range/settings_rangeController.js';
import './weather_slider/weather_sliderController'
import './weather/weatherController.js';
import './weather_days/weather_daysView.js';
import {sunController} from './sun/sunController.js';

$(document).ready(() => {
  page_sliderController.init();
  searchController.init();
  settings_scrollController.init();
  settings_degreesController.init();
  settings_rangeController.init();
  sunController.init();
  modelApp.getUpdateData();
});


