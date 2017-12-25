/**
 * Created by qingyuan.hou on 2017/10/31.
 */
// 去抖函数
window.debounce = function (fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
    deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};
$(function () {
  var dWindow = $(window);
  var dCoverImg = $('.js-cover-img');
  var dCoverIntro = $('.js-cover-intro');
  var dPage = $('.js-page');
  var dNavIcon = $('.js-nav-icon');
  var dNavpageNav = $('.js-navpage-nav');
  var dNavpageBackgrounds = $('.js-navpage-backgrounds');
  var dLoadingProgressbar = $('.js-loading-progressbar');
  var dLoadingText = $('.js-loading-text');
  var windowWidth = dWindow.width();
  var isSupportsTouches = ("createTouch" in document);
  var $body = $('body');
  var $header = $('.js-header');
  var $blogContainer = $('.js-blog-container');

  // 获取博客文章数据，生成最近文章列表
  $.ajax({
    url: 'https://去哪儿.我爱你/blog.json',
    dataType: 'jsonp',
    jsonpCallback: 'blogList',
    success: function (res) {
      var str = '';
      res.forEach(function (item, index) {
        if (index <= 5) {
          str += `<li class="blog-item" onclick="window.open('${item.path}', '_self')">
                  <article class="m-article">
                    <div style="background-image: url(${item.img});" class="m-article-img" alt=""></div>
                    <h1 class="m-article-title">${item.title}</h1>
                  </article>
                </li>`;
        }
      })
      $blogContainer.append(str);
    },
    error: function (err) {
      $blogContainer.append('<p style="text-align: center; width: 100%;">文章找不到了 T T...</p>');
    }
  });

  if ($(window).scrollTop() <= 0) {
    $header.removeClass('header-not-top').addClass('header-top');
  } else {
    $header.removeClass('header-top').addClass('header-not-top');
  }
  // body 滚动
  function freeze(e) {
    e.preventDefault();
  };
  function stopBodyScrolling(bool) {
    if (bool === true) {
      // console.log('stop')
      document.body.addEventListener("touchmove", freeze, {passive: false});
    } else {
      document.body.removeEventListener("touchmove", freeze, {passive: false});
    }
  }

  // 图片加载
  // stopBodyScrolling(true); // 当加载页显示时禁止触摸事件。

  setLoadingText('loading resources...');
  function setLoadingPercent(percent) {
    dLoadingProgressbar.css('width', percent);
  }

  function setLoadingText(text) {
    dLoadingText.html(text);
  }

  var timeout = setTimeout(function () {
    setLoadingPercent('40%');
  }, 1000);

  function onCoverLoad() {
    clearTimeout(timeout);
    setLoadingPercent('90%');
    setLoadingText('about to show');
    setTimeout(function () {
      setLoadingPercent('100%');
      $(document.body).removeClass('loading');
      setTimeout(function () {
        clearTimeout(timeout);
        $(document.body).removeClass('default');
      }, 100)
    }, 400);
  }

  dCoverImg.load(onCoverLoad);
  if (dCoverImg[0].complete) {
    onCoverLoad();
  }

  // 滚动
  dWindow.scroll(window.debounce((function () {
    windowWidth = $(window).width();
    var scrollTop = $(window).scrollTop();
    if (windowWidth >= 768) {
      dCoverImg.css('transform', 'translate(0,' + (scrollTop / 4) + 'px');
      var opacityNum = 1 - scrollTop / 600;
      dCoverIntro.css('opacity', opacityNum >= 0 ? opacityNum : 0);
    }
    if (scrollTop <= 0) {
      $header.removeClass('header-not-top').addClass('header-top');
    } else {
      $header.removeClass('header-top').addClass('header-not-top');
    }
  }), 15));

  // 鼠标和点击
  function onNavpageNavHover(e) {
    var navKey = parseInt($(e.target).data('key'), 10);
    if (navKey >= 0 && navKey < 4) {
      var curBg = dNavpageBackgrounds.children().eq(navKey).toggleClass('active');
    }
  }

  dNavpageNav.on('mouseover', 'li a', onNavpageNavHover);
  dNavpageNav.on('mouseout', 'li a', onNavpageNavHover);

    //  点击隐藏滚动条
    function hiddenScrollbar(overflow) {
      overflow = overflow === 'hidden' ? '' : 'hidden';
      document.documentElement.style.overflow = overflow;
      // 补充上滚动条的宽度
      var $h = $('html');
      w1 = $(window).width();
      $h.addClass('fancybox-lock-test');
      w2 = $(window).width();
      $h.removeClass('fancybox-lock-test');
      $("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
    }

  (function () {
    dNavIcon.click(function () {
      dNavIcon.toggleClass('x');
      dPage.toggleClass('navpage-show');
      // 当加载页显示时禁止触摸事件。
      stopBodyScrolling(dPage.hasClass('navpage-show'));
      // 禁止页面出现滚动条
     hiddenScrollbar( document.documentElement.style.overflow );
    });
  })();

  // search
  var dNavpageMain = $('.js-navpage-main');
  var dInput = $('.js-input');

  function getKeyWord() {
    return dInput.val().trim();
  }

  function doSearch(keyWord) {
    var keyWords = keyWord.toLowerCase().split(' ').filter(function (t) {
        return !!t;
      }),
      result = [];
    if (keyWord) {
      for (var i = 0, l = searchData.length - 1; i <= l; i++) {
        var item = searchData[i];
        if (keyWords.every(function (key) {
            return item.title.toLowerCase().indexOf(key) > -1 || item.url.indexOf(key) > -1;
          })) {
          result.push(item);
        }
        if (result.length === 5) {
          break;
        }
      }
    }
    index = -1;
    if (result.length && result.length > 0) {
      var resultHtml = '';
      $("#result").show();
      result.forEach((item) => {
        resultHtml += '<li><a target="_blank" href="' + item.url + '"><p class="result-title">' + item.title + '</p><p class="result-url">' + item.url + '</p></a></li>'
      })
      $("#result").html('<ul>' + resultHtml + '</ul>');
    } else {
      $("#result").html('');
    }
  }

  var timeout;
  var index = -1;
  dInput.bind('input propertychange', function (e) {
    var keyWord = getKeyWord();
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      timeout = null;
      doSearch(keyWord);
    }, 500);
  }).bind('keydown', function (e) {
    if (e.keyCode == 40) {
      index++;
      $('#result .active').removeClass('active');
      // console.log(index % $('#result li').length);
      $('#result li').eq(index % $('#result li').length).addClass('active');
      e.preventDefault();
    } else if (e.keyCode == 38) {
      if (index > 0) {
        index--;
        $('#result .active').removeClass('active');
        $('#result li').eq(index % $('#result li').length).addClass('active');
      }
      e.preventDefault();
    } else if (e.keyCode == 13) {
      if ($('#result li').length) {
        if (index === -1) {
          index = 0;
        }
        window.open($('#result li').eq(index % $('#result li').length).find('a').attr('href'));
      } else {
        window.open('https://www.google.com/search?q=' + getKeyWord(), '_blank');
      }
    }
  });
  if (!isSupportsTouches) {
    dInput.focus(function () {
      dNavpageMain.addClass('inputFocus');
    });
    dInput.blur(function () {
      setTimeout(function () {
        dInput.val('');
        $("#result").html('');
        $('#result').hide();
        dNavpageMain.removeClass('inputFocus');
      }, 200);
    });
  }
  var dpr = window.devicePixelRatio;
  if (dpr >= 2) {
    $('.js-search-help').css({
      backgroundImage: 'url(https://ws1.sinaimg.cn/large/006cGJIjly1fknu5qgh27j301401at8h.jpg)'
    });
  }
});
