export let page_sliderView = (function () {
  let page, scrollContent, slider;
  return {
    initElements: () => {
      page = $(".page_center");
      scrollContent = $(".scroll-content");
      slider = $('.bxslider');
    },
    renderContainer: (elem) => {
      slider.append(elem);
    },
    reset: () => {
      if(slider) {
        slider.html('');
      }
    },
    event: {
        slideEv: (callback) => {
          page.hammer().bind("swipe", callback)
        }
    },
    elems: () => {
      return {
        slider : slider
      }
    }
  }
}());
