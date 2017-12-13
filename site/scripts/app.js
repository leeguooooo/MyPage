var $navBtn = $('.js-nav-btn');
var $navCol = $('.js-nav-col');

$(function () {

  // header 置顶动画
  var $window = $(window)
  var $header = $('.js-header');

  function setHeader() {
    var scrollTop = $window.scrollTop();
    if (scrollTop <= 0) {
      $header.removeClass('header-not-top').addClass('header-top');
    } else {
      $header.removeClass('header-top').addClass('header-not-top');
    }
  }

  $window.scroll(setHeader);
  setHeader();

  // header 响应式导航
  $navBtn.on('click', function () {
    $navCol.toggleClass('active');
  })

  var navigation = responsiveNav(".nav-collapse", {
    animate: true,                    // Boolean: Use CSS3 transitions, true or false
    label: '<span class="iconfont">&#xf0f9;</span>',                    // String: Label for the navigation toggle
    customToggle: "",                 // Selector: Specify the ID of a custom toggle
    closeOnNavClick: false,           // Boolean: Close the navigation when one of the links are clicked
    openPos: "relative",              // String: Position of the opened nav, relative or static
    navClass: "nav-collapse",         // String: Default CSS class. If changed, you need to edit the CSS too!
    navActiveClass: "js-nav-active",  // String: Class that is added to <html> element when nav is active
    jsClass: "js"
  });
});
