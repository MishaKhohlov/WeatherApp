export let settings_degreesView = (function () {
  var radioBut;
  return {
    initElements: () => {
      radioBut = $(".setting_degrees input[name=temp]:radio");

      if(localStorage.getItem('flagTemp') === 'true') {
        $(radioBut[1]).attr('checked', '');
      } else {
        $(radioBut[0]).attr('checked', '');
      }
    },
    event: {
      changeTemp: (callback) => {
        radioBut.change(callback)
      }
    }
  }
}());
