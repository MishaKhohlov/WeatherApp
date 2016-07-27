import {settings_degreesView} from '../settings_degrees/settings_degreesView.js';
import {modelApp} from '../appModel/appModel.js';

export let settings_degreesController = (function () {
  return {
    init: () => {
      settings_degreesView.initElements();

      settings_degreesView.event.changeTemp((ev) => {
        if(ev.target.attributes['data-temp'].value === 'cl') {
          modelApp.changeTemp(false)
        } else {
          modelApp.changeTemp(true)
        }
      })
      
    }
  }
}());
