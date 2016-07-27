export default class {
  constructor() {
    this.renderTemplate = (obj) => {
      let changeFont = '';
      if (obj.cityName.length > 12) {
        changeFont = 'style="font-size: 2.8em;"'
      }
      return ` <div class="mobile_center_left">
      <div class="weather_refresh">
    <time class="weather_refresh__time">${obj.time}</time>
    <div class="weather_refresh__time_icon icon-refresh"></div>
</div>
<h1 class="weather_city" ${changeFont}>${obj.cityName}</h1>
<h2 class="weather_data">
    <span class="weather_data__day_week">${obj.dayWeek}</span>,
    <span class="weather_data__month">${obj.month}</span>
    <span class="weather_data__day">${obj.day}</span>
</h2>

<div class="weather_details">
    <div class="weather_details__icons icon-${obj.weather_class}"></div>
    <div class="weather_details__inform">
        <div class="weather_details__temp">${obj.temp}&deg;</div>
        <span class="weather_details__slash">//</span>
        <span class="weather_details__inform_desc">${obj.weather_desc}</span>
    </div>
    <div class="weather_details__sunrise">
        <div class="weather_details__sunrise_icon icon-${obj.icon_moon}"></div>
        <div class="weather_details__phase_moon">${obj.moon_info}%</div>
    </div>
</div>
</div>`
    }
  }
}

