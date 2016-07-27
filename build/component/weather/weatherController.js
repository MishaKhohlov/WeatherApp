import {modelApp} from '../appModel/appModel.js';
import {weatherView} from '../weather/weatherView.js';
import {gEvent} from '../backboneEventsInit.js';

export let weatherController = (function () {
  gEvent.on('domRendered', (cont) => {
    weatherView.initElement(cont);
    weatherView.event.reload(() => {
      modelApp.reloadData();
    });
  });
}());
