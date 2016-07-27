import {modelApp} from '../appModel/appModel.js';
import {sunView} from '../sun/sunView.js';
import {gEvent} from '../backboneEventsInit.js';

export let sunController = (function () {
  let beta,
    centerX,
    centerY,
    radius,
    fullCorner,
    contSun,
    timer;

  function move(previousPh, nextPhase) {
    let x, y;
    (function iter() {
      x = centerX - radius * Math.cos(beta + fullCorner * previousPh) - contSun.offsetWidth / 2;
      y = centerY - radius * Math.sin(beta + fullCorner * previousPh) - contSun.offsetWidth / 2;

      timer = setTimeout(iter, 300);

      sunView.render(x.toFixed(2), y.toFixed(2), previousPh);

      setPhase(previousPh);
      if (previousPh > nextPhase) {
        previousPh -= 0.03;
        if (previousPh < nextPhase) {
          clearTimeout(timer);
        }
      } else {
        previousPh += 0.03;
        if (previousPh > nextPhase) {
          clearTimeout(timer);
        }
      }
    })();
  }

  function setPhase(phase) {
    modelApp.setPreviousPhase(phase);
  }

  gEvent.on("resetCity", () => {
    clearTimeout(timer);
    move(modelApp.getPreviousPhase(), 0);
  });

  gEvent.on('dataUpdate', (gData, city) => {
    let data = gData[city];

    if (!contSun) {
      contSun = sunView.elems().sun_cont;
    }

    if (data) {
      let sunrise = timeConvert(data.daily.data[0].sunriseTime, data.timezone),
        sunset = timeConvert(data.daily.data[0].sunsetTime, data.timezone),
        currentTime = timeConvert(data.currently.time, data.timezone),
        previousPh = modelApp.getPreviousPhase(),
        nextPhase = (currentTime - sunrise) / (sunset - sunrise);

      clearTimeout(timer);
      move(previousPh, nextPhase);
    }
  });

  gEvent.on("slideChange", (gData, city, flag, changeState) => {
    if (!changeState && gData[city]) {
      let data = gData[city];

      let sunrise = timeConvert(data.daily.data[0].sunriseTime, data.timezone),
        sunset = timeConvert(data.daily.data[0].sunsetTime, data.timezone),
        currentTime = timeConvert(data.currently.time, data.timezone),
        previousPh = modelApp.getPreviousPhase(),
        nextPhase = (currentTime - sunrise) / (sunset - sunrise);

      clearTimeout(timer);
      move(previousPh, nextPhase);
    }
  });

  function timeConvert(timeStamp, utc) {
    let c = moment.tz(timeStamp * 1000, utc);
    return c.format("HH.mm");
  }

  return {
    init: () => {
      gEvent.on('dataGet', (gData, city, flag, changeState) => {

        sunView.initElements();
        contSun = sunView.elems().sun_cont;

        if (!changeState) {
          clearTimeout(timer);
          if (Object.keys(gData).length !== 0 && city && contSun) {
            let data = gData[city];

            let sunrise = timeConvert(data.daily.data[0].sunriseTime, data.timezone),
              sunset = timeConvert(data.daily.data[0].sunsetTime, data.timezone),
              currentTime = timeConvert(data.currently.time, data.timezone);

            let windWidth = sunView.elems().wind.width(),
              windHeight = sunView.elems().wind.height(),
              heightHalf = windHeight / 2;

            radius = heightHalf / 2 + (windWidth * windWidth) / (8 * heightHalf);

            let corner = 2 * Math.acos((radius - heightHalf) / radius),
              gamma = 2 * Math.asin((contSun.offsetWidth / 2) / (2 * radius));

            fullCorner = corner + gamma * 2;
            beta = 1.5708 - fullCorner / 2;
            centerX = windWidth / 2;
            centerY = heightHalf + radius;

            let previousPh = modelApp.getPreviousPhase(),
              nextPhase = (currentTime - sunrise) / (sunset - sunrise);

            move(previousPh, nextPhase);
          } else {
            move(modelApp.getPreviousPhase(), 1);
          }
        }
      });
    }
  }
}());



