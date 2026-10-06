$(document).ready(function () {
  const $slider = $(".hero-slider");
  const $controls = $(".hero-slider-controls");

  if (!$slider.length || !$controls.length) {
    return;
  }

  function setActiveThumbnail(event, slick, currentSlide) {
    const activeSlide = typeof currentSlide === "number" ? currentSlide : slick.currentSlide;

    $controls.find("[data-hero-go-to]").each(function (index) {
      const isActive = index === activeSlide;
      $(this)
        .toggleClass("border-primary bg-surface-container-high", isActive)
        .toggleClass("border-transparent bg-surface-container-low/90", !isActive)
        .attr("aria-current", isActive ? "true" : "false");
    });
  }

  $slider.on("init reInit afterChange", setActiveThumbnail);

  $slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    fade: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 4000,
    speed: 600,
    pauseOnHover: true,
    pauseOnFocus: true,
    swipe: true,
    adaptiveHeight: false,
    appendDots: $(".hero-slider-dots"),

    customPaging: function (slider, index) {
      return `
        <button
          type="button"
          aria-label="Go to banner ${index + 1}">
        </button>
      `;
    }
  });

  /*
   * Previous button
   */
  $controls.on("click", "[data-hero-prev]", function () {
    $slider.slick("slickPrev");
  });

  /*
   * Next button
   */
  $controls.on("click", "[data-hero-next]", function () {
    $slider.slick("slickNext");
  });

  /*
   * Thumbnail buttons
   */
  $controls.on("click", "[data-hero-go-to]", function () {
    const index = Number($(this).attr("data-hero-go-to"));

    $slider.slick("slickGoTo", index);
  });
});