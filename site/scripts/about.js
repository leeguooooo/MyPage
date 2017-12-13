/**
 * Created by qingyuan.hou on 2017/10/31.
 */
var photoSource = {
  'situ': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o13u50j30b40b4757.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o58m16g307i0a0e13.jpg'
  },
  'mengchao': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o0zre4j30b40b4myd.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o4bq79j30qo0zktck.jpg'
  },
  'changquan': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o0zkjgj30b40b4ab5.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o3x6s7j30qo0zkadh.jpg'
  },
  'hanyang': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o0zfaqj30b40b4755.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o2h6nig305k05k0ud.jpg'
  },
  'hongqi': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o0zm9lj30b40b4dgq.jpg',
  },
  // 'lifang': {
  //   src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o118htj30b40b4gmq.jpg'
  // },
  'liuwenbo': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o0zoiaj30b40b4wfa.jpg'
  },
  'naiwang': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o13c29j30b40b4wfx.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o49alfg305k05kn0x.jpg'
  },
  'qingguo': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o13kb7j30b40b475a.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o2yxy8g305k05k41h.jpg'
  },
  'qingyuan': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o13wdoj30b40b4aau.jpg'
  },
  'tianqi': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o16f84j30b40b4wfn.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o15s51j308c08cq3w.jpg'
  },
  'tianjun': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o14njgj30b40b4t9j.jpg'
  },
  'wenbo': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o17kgzj30b40b4dgg.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o17hg9j308c08cjsr.jpg'
  },
  'wengai': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o189wbj30b40b4759.jpg'
  },
  'wenjie': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o1alxzj30b40b43zb.jpg'
  },
  'wenxiong': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o1bkruj30b40b4jsa.jpg'
  },
  'xiaolin': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o1hzxhj30b40b4q3r.jpg'
  },
  'xiaoxiao': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o1ucsyj30b40b4wft.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o3gy12j30jg0p0q6h.jpg'
  },
  // 'xili': {
  //   src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o1vu9aj30b40b4t9m.jpg'
  // },
  'xinben': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o1v1sgj30b40b4js3.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp66fln9gg305k05kju1.jpg'
  },
  'xinyue': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o1mvnqj30b40b4ab7.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o1xvhbg305k05kt9f.jpg'
  },
  'xujie': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o1xmpnj30b40b4gmv.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o3bhq3g305k05kjup.jpg'
  },
  'yangzai': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o1x8m8j30b40b43ze.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o4a79cg304g03c42z.jpg'
  },
  'yaojie': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o25793j30b40b4q3p.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o2oe8kj30b40b4405.jpg'
  },
  'yuhao': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o2q9rtj30b40b4wfd.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o2qakpj30e80iyabd.jpg'
  },
  'zhaojun': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o2f8msj30b40b4dgx.jpg'
  },
  'zhenying': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o26p2aj30b40b4756.jpg',
    kuso: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o4bikag305k05kae0.jpg'
  },
  'zixiang': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o2pizdj30b40b4gmg.jpg'
  },
  'zhigang': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o2e3yej30b40b4gmd.jpg'
  },
  'wangliang': {
    src: 'https://ws1.sinaimg.cn/large/006cGJIjly1fkp5o1cq9zj30b40b4aax.jpg'
  }
};

var photos = [
  // 'ymfe',
  'situ',
  'mengchao',
  'naiwang',
  'yaojie',
  'yangzai',
  'xiaoxiao',
  'xujie',
  'xinyue',
  'yuhao',
  'wenjie',
  'changquan',
  'qingguo',
  'zhenying',
  'wenbo',
  'tianqi',
  'wenxiong',
  'zixiang',
  'hongqi',
  'hanyang',
  'wengai',
  // 'lifang',
  // 'xili',
  'zhigang',
  'xiaolin',
  'xinben',
  'liuwenbo',
  'tianjun',
  'wangliang',
  'qingyuan',
  'zhaojun'
];

var kusosMap = {};
kusos = ['yaojie', 'situ', 'yangzai', 'yuhao', 'xiaoxiao', 'mengchao', 'changquan', 'naiwang', 'qingguo', 'xujie', 'hanyang', 'xinben', 'tianqi', 'xinyue', 'zhenying', 'wenbo'];

for (var i = 0; i < kusos.length; i++) {
  // kusosMap['images/photos/' + kusos[i] + '.jpg'] = 'images/photos/' + kusos[i] + '_kuso.jpg';
  kusosMap[photoSource[kusos[i]].src] = photoSource[kusos[i]].kuso;
}

var photosArr = photos.map(function (item, index) {
  return photoSource[item].src;
});

// main
$(function () {
  var $window = $(window)
  var $header = $('.js-header');
  var $photoWall = $('.js-photo-wall');

  function startPhotoWall() {
    if ($photoWall.css('display') !== 'none') {
      $photoWall.tqPhotoWall(photosArr, kusosMap);
    }
  }

  function setHeader() {
    var scrollTop = $window.scrollTop();
    if (scrollTop <= 0) {
      $header.removeClass('header-not-top').addClass('header-top');
    } else {
      $header.removeClass('header-top').addClass('header-not-top');
    }
  }

  $window.resize(startPhotoWall);
  $window.scroll(setHeader);
  startPhotoWall();
  setHeader();
  var dpr = window.devicePixelRatio;
  if (dpr >= 2) {
    $('.m-our-style .photo').css({
      backgroundImage: 'url(https://ws1.sinaimg.cn/large/006cGJIjly1fkntt27e9vj30m80ojaj5.jpg)'
    });
  }
});