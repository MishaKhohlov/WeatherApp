export let sunView = (function () {
  let sunCount,
    wind = $(window),
    sun_end,
    sun;

  return {
    initElements: () => {
      sunCount = document.getElementById('sunCont');
      sun_end = document.getElementById('sun_end');
      sun = $('.sun');
    },
    render: (left, top, phase) => {
      sun_end.style.opacity = phase.toFixed(2);
      sunCount.style.left = left + 'px';
      sunCount.style.top = top + 'px';
    },
    elems: () => {
      return {
        sun_cont: sunCount,
        wind: wind
      }
    }
  }
}());


