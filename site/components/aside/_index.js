/**
 * Created by qingyuan.hou on 2017/10/31.
 */

// body 滚动
function freeze(e) {
    e.preventDefault();
}
function stopBodyScrolling(bool) {
    if (bool === true) {
        // console.log('stop')
        document.body.addEventListener("touchmove", freeze, {passive: false});
    } else {
        document.body.removeEventListener("touchmove", freeze, {passive: false});
    }
}

var isSupportsTouches = ("createTouch" in document),
    dNavpageBackgrounds = $('.js-navpage-backgrounds');

// 鼠标点击变 ✘  出现图片
var dNavIcon = $('.js-nav-icon'),
    dNavpageNav = $('.js-navpage-nav');
dPage = $('.js-page');

function onNavpageNavHover(e) {
    var navKey = parseInt($(e.target).data('key'), 10);
    if (navKey >= 0 && navKey < 4) {
        var curBg = dNavpageBackgrounds.children().eq(navKey).toggleClass('active');
    }
}

dNavpageNav.on('mouseover', 'li a', onNavpageNavHover);
dNavpageNav.on('mouseout', 'li a', onNavpageNavHover);

/* (function () {
 dNavIcon.click(function () {
 dNavIcon.toggleClass('x');
 dPage.toggleClass('navpage-show');
 // 当加载页显示时禁止触摸事件。
 //stopBodyScrolling(dPage.hasClass('navpage-show'));
 });
 })();*/

dNavIcon.click(function () {
    dNavIcon.toggleClass('x');
    dPage.toggleClass('navpage-show');
    // 当加载页显示时禁止触摸事件。
    stopBodyScrolling(dPage.hasClass('navpage-show'));
});

// 滚动
// 图片加载
// stopBodyScrolling(true); // 当加载页显示时禁止触摸事件。
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