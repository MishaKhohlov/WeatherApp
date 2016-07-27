export let weather_sliderView = (function () {
  let scrollPane,
    scrollContent,
    weatherSlider,
    scrollbar,
    widthScroolContent,
    widthScroolContentView,
    marginPx = 0,
    recentlyPoin = 0;

  function sizeScrollbar() {
    scrollbar.find(".ui-slider-handle").css({
      width: 110,
      "margin-left": (-110 / 2) -1
    });
    $('.weather_slider .ui-slider-horizontal').width("").width(scrollbar.width() - 110);
  }

  function resetSlider() {
    scrollContent.css("margin-left", "0px");
    $('.weather_slider .ui-slider-handle').css("left", "0%");
  }

  function sizeScrollbarInit() {
    sizeScrollbar();
    setTimeout(sizeScrollbar, 10);//safari wants a timeout
  }

  return {
    initElements: () => {
      scrollPane = $(".scroll-pane");
      scrollContent = $(".scroll-content");
      widthScroolContent = scrollContent.width();
      weatherSlider = $(".weather_slider");
      widthScroolContentView = weatherSlider.width();
      scrollbar = $(".weather_slider .scroll-bar");

      scrollbar.find(".ui-slider-handle")
        .wrap("<div class='ui-handle-helper-parent'></div>").parent();

      sizeScrollbarInit();

      $(window).resize(function(){
        widthScroolContent = scrollContent.width();
        widthScroolContentView = weatherSlider.width();
        sizeScrollbar();
        resetSlider();
      });
    },
    initEventTouch: () => {
      let scrollPoint = $('.weather_slider .ui-slider-handle');
      // Event on touch device
      $(".weather_content").hammer().bind("pan", function (ev) {
        if (ev.gesture.additionalEvent === "panright") {
          if (recentlyPoin < 100) {
            //speed

            recentlyPoin += 0.2;
            recentlyPoin = Number(recentlyPoin.toFixed(1));

            marginPx = (widthScroolContent - widthScroolContentView) * recentlyPoin / 100;
            scrollContent.css("margin-left", "-" + marginPx + "px");
            scrollPoint.css("left", +recentlyPoin + "%");
          }
        } else if (ev.gesture.additionalEvent === "panleft") {
          if (recentlyPoin > 0) {
            //speed
            recentlyPoin = recentlyPoin - 0.2;
            recentlyPoin = Number(recentlyPoin.toFixed(1));

            marginPx = (widthScroolContent - widthScroolContentView) * recentlyPoin / 100;
            scrollContent.css("margin-left", "-" + marginPx + "px");
            scrollPoint.css("left", + recentlyPoin + "%");
          }
        }
      });
    },
    elems: () => {
      return {
        scrollbar: scrollbar,
        scrollContent: scrollContent,
        scrollPane: scrollPane
      }
    },
    resetSlider: () => {
      resetSlider();
    }
  }
}());
