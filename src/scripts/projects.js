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
// 通过滚动条点亮相应的导航子项目    移动端时改变text
function activeNavItem(scrollTop, heights, className) {
  var extraClass = "icon-font-red";
  var num = heights.length;
  // console.log('各高等', heights);
  for (var i = 0; i < num; i++) {

    if (scrollTop < heights[i]) {
      $('.' + className).removeClass(extraClass);  //需要恢复原色
      $('.' + className + i).addClass(extraClass);  // 变红
      //  改变text
      var classNameSelector = '.nav-item-title' + i;
      var spanText = $(classNameSelector + ' > .nav-item-name').text();
      // console.log('滚动改变spanText', spanText);
      $('.projects-nav-btn span:first').text(spanText);
      break;
    }
  }
}
// 页面逻辑处理
var $projectsCategory = $('.content-projects-container'),
  $projectNav = $('.content-projects-nav'),
  $projectBtn = $('.projects-nav-btn'),
  $header = $('.js-header'),
  $projectNavContainer = $('.content-projects-nav-container');

var navContainerHeight = $projectNav.height();

var categoryHeights = [];

const projectItemLayout = "projects-category-item col-lg-4 col-xs-12 col-sm-12 col-md-4",
  public = "开源",
  private = "未开源";

function getLogoTemplate(logo) {
  var logoStr = '<i class="icon-font">&#xf053;</i>';  //默认图标
  if (logo && logo.logoType === "iconFont") {
    logoStr = '<i class="icon-font">' + logo.code + '</i>';
  } else if (logo && logo.logoType === "svg") {
    logoStr = '<i class="icon-font">' + logo.code + '</i>';
  }
  return logoStr;
}

//  导航点击函数
function clickNav(event, itemId, className, index) {
  // 你要干嘛呢， 需要给对应的 title变色，并通过scrollTop滚动到相应位置
  var titleItem = $('#' + itemId),
    extraClass = "icon-font-red",
    classNameSelector = '.nav-item-title' + index;
  //  被点击的导航条变颜色
  $('.' + className).siblings().removeClass(extraClass); //需要恢复原色呢
  $('.' + className + index).addClass(extraClass);

  // 自己滚吧
  var $navContainer = $('.content-projects-nav-container');

  var titleOffsetTop = $('#' + itemId).offset().top,
    navBtnHeight = $('.projects-nav-btn ').height(),   // 移动端高度
    navProjectHeight = $('.content-projects-nav ').height(),
    navHeight = $navContainer.height();

  // 导航条高度需要判断pc 端还是移动端
  if (navHeight > navProjectHeight) {     // 说明在移动端并且导航条处于展开状态
    navHeight = navHeight - navProjectHeight;
    // titleOffsetTop -= navProjectHeight;    // 各title距离顶端距离需要判断  在移动端展开还是关闭
  }

  var scrollHeight = titleOffsetTop - navHeight;

  //console.log('移动开发等titleOffsetTop的高度', titleOffsetTop);
  //console.log('navHeight的高度', navHeight);
  //console.log('scrollHeight的高度', scrollHeight);

  //console.log('item+ id', itemId);
  //console.log('scrollHeight', scrollHeight);
  // $(window).scrollTop(scrollHeight);
  sAnimateTo(scrollHeight, 300)
  //  手机端 隐藏自己
  var displayType = $('.content-projects-nav').hasClass("content-projects-nav-show");
  displayType && $('.content-projects-nav').removeClass('content-projects-nav-show');
  //  改变text
  var spanText = $(classNameSelector + ' > .nav-item-name').text();
  //console.log('点击改变spanText', spanText);
  $('.projects-nav-btn span:first').text(spanText);
}

var lastScrollInterval;
function sAnimateTo(to, duration) {
  clearInterval(lastScrollInterval)
  if ($(window).scrollTop() == to) return;
  var diff = to - $(window).scrollTop();
  var scrollStep = Math.PI / (duration / 10);
  var count = 0, currPos;
  start = $(window).scrollTop();
  lastScrollInterval = setInterval(function(){
      if ($(window).scrollTop() != to && count < duration / 10) {
          count = count + 1;
          currPos = start + diff * (0.5 - 0.5 * Math.cos(count * scrollStep));
          $(window).scrollTop(currPos);
      }
      else { clearInterval(lastScrollInterval); }
  },10);
}


function renderProjectNav(data) {
  const targetText = ['移动开发', '基础框架', '静态资源', '构建部署', '效率与改善'];
  return data.map(function (item, index) {
    var linkId = 'nav-item-title' + index,
      linkIdSelector = 'category-title' + index;
    var linkText = targetText[index];
    return `<li class="projects-nav-item" onclick="clickNav(this, '${linkIdSelector}', 'projects-nav-item', '${index}')">
                           <a href="#${linkText}" class = "nav-item-title  ${linkId} " class="nav-item-inner">${getLogoTemplate(item.logo)}
                                <span class="nav-item-name">${item.name}</span>
                           </a>
                     </li>`;
  })
}

/*function renderItem(data) {
 var itemStr = data.map(function (item) {
 return `<div class=${projectItemLayout}>
 <a target="_blank" href=${item.url}>${item.name}</a>
 <div>${item.info}</div>
 </div>`;
 });
 return itemStr.join('');
 }*/

function renderItem(data) {
  var itemStr = data.map(function (item) {
    var repository = item.flag ? public : private,
      cardRepositoryClass = item.flag ? " card-public" : "card-private";

    var temp = '<div class="' + projectItemLayout + '">'
      + '<a target="_blank" href=" ' + item.url + '">'
      + '<div class="inner" href=" ' + item.url + '">'
      + '<span>' + getLogoTemplate(item.logo) + '</span>'
      + '<span class="card-link" >' + item.name + '</span>'
      + '<div class="' + cardRepositoryClass + '">'
      + '<span class="repository-text">' + repository + '</span>'
      + '</div>'
      + '<div class="card-info">' + item.info + '</div>'
      + '</div>'
      + '</a>'
      + '</div>';
    return temp;
  });
  return itemStr.join('');
}

// 生成项目导航栏和项目卡片
$.ajax({
  url: '../config/projects.json',
  dataType: 'json',
  success: function (res) {
    //  获取导航条
    var nav = res.map((item) => {
      return item.type;
    });

    var navStr = renderProjectNav(nav),
      navMobileStr = '<span>移动开发</span><span>&#xf0f9;</span>'
    str = '';
    res.forEach(function (item, index) {
      var itemId = 'category-title' + index;
      str += `<div class="projects-category container">
                               <div id = ${itemId} class="category-title">
                                     ${getLogoTemplate(item.type.logo)}
                                      <span class="category-title-text">${item.type.name}</span>
                                </div>
                                <div class="row project-row ">${renderItem(item.child)}</div>
                           </div>`;
    });
    $projectBtn.append(navMobileStr);
    $projectNav.append(navStr);
    $projectsCategory.append(str);

    //  获取项目 各title高度

    $('.projects-category').each(function (index, item) {
      categoryHeights.push(item.offsetTop + item.offsetHeight - 180);
    });

    // console.log('各title高度 categoryHeights', categoryHeights);

    //  初始时导航条第一个项目亮
    $('.nav-item-title0').addClass('icon-font-red');  // 变红
  },
  error: function (err) {
    console.log(' project err', err);
  }
});

// header 样式
if ($(window).scrollTop() <= 0) {
  $header.removeClass('header-not-top').addClass('header-top');
} else {
  $header.removeClass('header-top').addClass('header-not-top');
}


var headerOffsetTop = $('.header').offset().top,  // 初始位置
  projectNavHeight = $projectNav.height();

// 增加高度属性
$projectNavContainer.attr({height: projectNavHeight});

// 页面滚动
$(window).scroll(window.debounce((function () {
  var scrollHeight = $(document).scrollTop(),
    projectsCoverHeight = $('.m-projects-cover').height(),   // 封面的高度
    headerHeight = $('.header').height(),  // 头部的高度

    headerScrollTop = $('.header').scrollTop(),
    headerDiff = projectsCoverHeight + headerHeight;
  //headerDiff = projectsCoverHeight  - headerOffsetTop;   // 应该隐藏头部的高度

  //console.log('headerDiff', headerDiff);
  //console.log('scrollHeight', scrollHeight);

  var $navStandby = $('.nav-standby');
  //  根据滚动条点亮导航
  activeNavItem(scrollHeight, categoryHeights, 'nav-item-title');

  if (scrollHeight <= headerDiff) {
    //console.log('scrollHeight较小，导航回到原位', scrollHeight);
    $header.removeAttr('hidden');
    //$header.removeClass('z-index-0');
    $projectNavContainer.removeClass('project-nav-top');
    $navStandby.removeClass('nav-standby-height');
    if (headerScrollTop <= 0) {
      $header.removeClass('header-not-top').addClass('header-top');
    } else {
      $header.removeClass('header-top').addClass('header-not-top');
    }
  } else {   //  隐藏header 固定导航条   备用div占据同样高度
    //console.log('scrollHeight较大， header隐藏', scrollHeight);

    $header.attr("hidden", "hidden");
    //$header.addClass('z-index-0');
    $projectNavContainer.addClass('project-nav-top');
    if (scrollHeight >= headerDiff + navContainerHeight) {
      $navStandby.addClass('nav-standby-height');
    }
  }
}), 15));


// 移动端点击出现/隐藏
var navBtn = $('.projects-nav-btn');
navBtn.click(function () {
  var displayType = $('.content-projects-nav').hasClass("content-projects-nav-show");

  displayType ? $('.content-projects-nav').removeClass('content-projects-nav-show') :
    $('.content-projects-nav').addClass('content-projects-nav-show');
});

