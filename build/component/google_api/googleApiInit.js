export let googleServices = (function () {
  let service,
    placeInf,
    div,
    map;

  function searchAPI() {
    function initialize() {
      service = new google.maps.places.AutocompleteService();
      google.maps.event.addDomListener(window, 'load', initialize);
    }

    initialize();
  }

  function initPlace() {
    div = document.createElement('div');
    map = new google.maps.Map(div);
    placeInf = new google.maps.places.PlacesService(map);
  }

  return {
    init: () => {
      if (window.google) {
        searchAPI();
        initPlace();
      }
    },
    service: () => {
      return service
    },
    placeInf: () => {
      return placeInf
    }
  }
}());

