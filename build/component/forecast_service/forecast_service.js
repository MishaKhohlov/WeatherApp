export let forecast_service = (function () {

  function getRequest(latitude, longitude, callback, callbackError) {
    $.ajax({
      url: 'https://api.forecast.io/forecast/004c891d3227671408bc5f081431dee0/' + latitude + ',' + longitude,
      jsonp: "callback",
      dataType: "jsonp",
      error: callbackError,
      success: callback
    });
  }

  return {
    getData: (latitude, longitude, callback, callbackError) => {
     getRequest(latitude, longitude, callback, callbackError);
    }
  }
}());
