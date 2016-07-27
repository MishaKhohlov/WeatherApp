export default class {
  constructor() {
    this.renderTemplate = (primaryinfo, slider, info) => {
      return `
      <section class="weather">
      ${primaryinfo}
        <div class="mobile_center_right">
          ${slider}
          ${info}
        </div>
      </section>
      `
    }
  }
}
