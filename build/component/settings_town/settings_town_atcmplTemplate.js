export default class {
  constructor() {
    this.renderTemplate = (obj, iter) => {
      return `<div class="set_cities__town">
    <div class="set_cities__info">
        <div class="set_cities__name">${obj.city}</div>
        <div class="set_cities__weather">// ${obj.country}</div>
    </div>
    <input type="checkbox" class="set_cities__del_chex" data-index="${iter}" id="del${iter}">
    <label for="del${iter}" class="set_cities__label">
        <div class="set_cities__check_icon icon-check"></div>
    </label>
</div>`
    }
  }
}

