export default class {
  constructor() {
    this.renderTemplate = (arrHourlyData) => {
      let container = `
        <div class="weather_slider scroll-pane ui-widget ui-widget-header ui-corner-all">
          <div class="weather_content scroll-content">
            ${arrHourlyData.map(el => (
              `<div class="item_day_time scroll-content-item ui-widget-header">
                 <div class="item_day_time__time">${el.time}</div>
                 <div class="item_day_time__icon icon-${el.icon}"></div>
                 <div class="item_day_time__temp">${el.temperature}&deg;</div>
               </div>`
            )).join('')}
          </div>
          <div class="weather_scrollBar scroll-bar-wrap ui-widget-content ui-corner-bottom">
            <div class="scroll-bar"></div>
          </div>
        </div>
      `;

      return container
    }
  }
}
