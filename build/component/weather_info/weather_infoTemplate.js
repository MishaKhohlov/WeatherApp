export default class {
  constructor(obj) {
    this.renderTemplate = (obj) => {
      return `<div class="weather_info">
    <div class="weather_info__section">
        <div class="weather_info__icon icon-humidity"></div>
        <div class="weather_info__wet">${obj.wet}%</div>
    </div>
    <div class="weather_info__section">
        <div class="weather_info__icon">
            <div class="weather_info__icon_direction icon-wind-direction"">
             <span class="icon_direction__value">${obj.windBearing}</span>
</div>
        </div>
        <div class="weather_info__windy"><span class="weather_info__value">${obj.windy}</span>
            <span class="weather_info__pre_windy">m/c</span>
        </div>
    </div>
    <div class="weather_info__section">
        <div class="weather_info__icon icon-sunrise"></div>
        <div class="weather_info__sunrice">${obj.sunrise}</div>
    </div>
    <div class="weather_info__section">
        <div class="weather_info__icon icon-sunset"></div>
        <div class="weather_info__sunset">${obj.sunset}</div>
    </div>
</div>`
    }
  }
}
