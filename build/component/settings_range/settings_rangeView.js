export let settings_rangeView = (function () {
  return {
    initSlider: () => {
      let dayValue = 7;
      if(localStorage.getItem('flagDay')) {
        dayValue = Number(localStorage.getItem('flagDay'));
      }
      $("#slider-range-max").slider({
        range: "max",
        min: 1,
        max: 7,
        value: dayValue,
        slide: function (event, ui) {
          $("#amount").val(ui.value);
        }
      });

      $("#amount").val($("#slider-range-max").slider("value"));

      $("#slider-range-max2").slider({
        range: "max",
        value: 30,
        min: 15,
        max: 60,
        step: 15,
        slide: function (event, ui) {
          $("#amount2").val(ui.value);
        }
      });
      $("#amount2").val($("#slider-range-max2").slider("value"));
    },
    event: {
      sliderChange1: (callback) => {
        $("#slider-range-max").slider({
          change: callback
        });
      },
      sliderChange2: (callback) => {
        $("#slider-range-max2").slider({
          change: callback
        });
      }
    }
  }
}());
