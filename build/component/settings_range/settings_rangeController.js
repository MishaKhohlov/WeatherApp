import {modelApp} from '../appModel/appModel.js';
import {settings_rangeView} from './settings_rangeView.js';
import {gEvent} from '../backboneEventsInit.js';

export let settings_rangeController = (function () {

  return {
    init: () => {
      settings_rangeView.initSlider();
      settings_rangeView.event.sliderChange1((event, ui) => {
        gEvent.trigger('updateViewDays', ui.value)
      });
      settings_rangeView.event.sliderChange2((event, ui) => {
        modelApp.updateDataInterval(ui.value);
      })
    }
  }
}());
