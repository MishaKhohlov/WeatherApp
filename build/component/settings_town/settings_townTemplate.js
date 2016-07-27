export default class {
  constructor() {
    this.renderTemplate = (obj, iter, cityName) => {
      return `<div class="set_cities__town" data-slide-index="${iter}">
    <div class="set_cities__icon icon-${obj.weather_icon}"></div>
    <div class="set_cities__temp">${obj.temprature}&deg;</div>
    <div class="set_cities__info">
        <div class="set_cities__name">${obj.city}</div>
        <div class="set_cities__weather">// ${obj.weather}</div>
    </div>
    <input type="checkbox" class="set_cities__del_chex" data-name="${cityName}" id="del${iter}">
    <label for="del${iter}" class="set_cities__label set_cities__label--hide">
        <div class="set_cities__check_icon icon-check"></div>
    </label>
</div>`
    }
  }
}
