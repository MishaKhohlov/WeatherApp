export default class {
  constructor() {
    this.renderTemplate = (daysData) => {
      let container = `
      <div class="days_wrapper">
        <section class="days">
            ${daysData.map(el => (
        `<div class="days_inf">
    <div class="days_inf__day_week">${el.dayWeek}</div>
    <div class="days_inf__icon icon-${el.icon}"></div>
    <div class="days_inf__tempCont">
        <div class="days_inf__tempRange" style="left: ${el.positionMin}%; right: ${el.positionMax}%; top: ${el.positionMin}%; bottom: ${el.positionMax}%;">
            <span class="days_inf__val_min">${el.minTemp}&deg;</span>
            <span class="days_inf__val_max">${el.maxTemp}&deg;</span>
        </div>
    </div>
</div>`
      )).join('')}
          </section>
          </div>
      `;

      return container
    }
  }
}
