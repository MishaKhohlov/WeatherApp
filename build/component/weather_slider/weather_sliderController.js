import {weather_sliderView} from '../weather_slider/weather_sliderView.js';
import {gEvent} from '../backboneEventsInit.js';

export let weather_sliderController = (function () {
  gEvent.on('slideChange', () => {
    weather_sliderView.resetSlider();
  });

  gEvent.on('domRendered', () => {
    weather_sliderController.init();
  });

  return {
    init: () => {
      weather_sliderView.initElements();

      let scrollContent = weather_sliderView.elems().scrollContent,
        scrollPane = weather_sliderView.elems().scrollPane;

      weather_sliderView.elems().scrollbar.slider({
        slide: function (event, ui) {
          if (scrollContent.width() > scrollPane.width()) {
            scrollContent.css("margin-left", Math.round(
                ui.value / 100 * ( scrollPane.width() - scrollContent.width() )
              ) + "px");
          } else {
            scrollContent.css("margin-left", 0);
          }
        }
      });
      if (jQuery.support.touch) {
        weather_sliderView.initEventTouch();
      }
    }
  }
}());
