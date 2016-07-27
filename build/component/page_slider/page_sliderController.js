import {modelApp} from '../appModel/appModel.js';
import {page_sliderView} from '../page_slider/page_sliderView.js';
import {weatherView} from  '../weather/weatherView.js'
import {weather_daysView} from  '../weather_days/weather_daysView.js'
import {gEvent} from '../backboneEventsInit.js';
import page_slider from './page_sliderTemplate.js';

let page_sliderTemplate = new page_slider();

export let page_sliderController = (function () {
  let cashTimeStampEvent = 0,
    slider,
    currentSlider = 0;

  gEvent.on('dataUpdate', (data, name, flagTemp, changeState, flagDay) => {
    let containerGlobal = $(page_sliderTemplate.renderTemplate());
    let containerItem = $(containerGlobal).find('.slider_item')[0];
    page_sliderView.renderContainer(containerGlobal);
    weatherView.render(data[name], containerItem, flagTemp);
    weather_daysView.render(data[name], containerItem, flagTemp, flagDay);
    slider.reloadSlider();
    slider.goToSlide(slider.getSlideCount() - 1);
  });

  gEvent.on('dataGet', (data, name, flagTemp, changeState, flagDay) => {
    page_sliderView.reset();
    for (let item in data) {
      let containerGlobal = $(page_sliderTemplate.renderTemplate());
      let containerItem = $(containerGlobal).find('.slider_item')[0];

      page_sliderView.renderContainer(containerGlobal);
      weatherView.render(data[item], containerItem, flagTemp);
      weather_daysView.render(data[item], containerItem, flagTemp, flagDay);

      slider.reloadSlider();
    }

    weatherView.changeAnimation(data[Object.keys(data)[0]]);

    if (currentSlider && currentSlider < slider.getSlideCount()) {
      slider.goToSlide(currentSlider);
      weatherView.changeAnimation(data[Object.keys(data)[currentSlider]]);
    }
  });

  gEvent.on("resetCity", () => {
    page_sliderView.reset();
    slider.destroySlider();
  });

  return {
    init: () => {
      page_sliderView.initElements();
      slider = page_sliderView.elems().slider;
      slider.bxSlider({
        onSlideAfter: function () {
          currentSlider = slider.getCurrentSlide();
          modelApp.changeCurentCity(currentSlider);
        }
      });

      if (jQuery.support.touch) {
        page_sliderView.event.slideEv((ev) => {

          if(ev.target.classList[0] === 'weather_content') {
            cashTimeStampEvent = ev.timeStamp;
          }
          if(cashTimeStampEvent+50 < ev.timeStamp) {
            if (ev.gesture.overallVelocityX > 0) {
              slider.goToNextSlide();
            } else {
              slider.goToPrevSlide();
            }
          }
        })
      }
    },
    goToNextSities: (numPage) => {
      slider.goToSlide(numPage);
    }
  }
}());

