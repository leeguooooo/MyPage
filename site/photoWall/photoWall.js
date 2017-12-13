jQuery && (function ($) {
  var WALL_SPEED = 16;
  //// common ////
  // css utils
  // 将 obj 转化为 css string
  function styleString(obj) {
    var _style = '';
    var key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        var value = obj[key];
        if (typeof value === 'number') {
          value += 'px';
        }
        _style += (key + ':' + value + ';');
      }
    }
    return _style;
  }

  // translate3D css string
  function translate3D(obj) {
    return 'translate3d(' + obj.x + 'px,' + obj.y + 'px, 0)';
  }

  // math utils
  // 随机数
  function getRandomInt(min, max) {
    var _min = Math.ceil(min);
    var _max = Math.floor(max);
    return Math.floor(Math.random() * (_max - _min + 1)) + _min;
  }

  // 随机偶数
  // function getRandomEven(min, max) {
  //     var _min = Math.ceil(min / 2);
  //     var _max = Math.floor(max / 2);
  //     return 2 * (Math.floor(Math.random() * (_max - _min)) + _min);
  // }

  /**
   *
   * @class Timmer
   * 定时器
   *
   * @param {number} delay (定时器开始的延时毫秒数)
   * @param {number} count (定时器即使的毫秒数，未设置或 < 0 时则无限计时)
   * @param {number} begin (定时器开始的延时毫秒数)
   */
  function Timmer(callback, delay, count, begin) {
    this.delay = delay || 100;
    this.count = count || -1;
    this._begin = begin || 0;
    this._callback = callback;
    this._pause = false;
    this._timmer = null;
    this._count = 0;
    this.timeoutFn = function () {
      var self = this;
      self._timmer = window.__timer = setTimeout(function () {
        self._count++;
        self._callback();
        if (!self._pause && (self.count < 0 || self._count < self.count)) {
          self.timeoutFn();
        }
      }, self.delay);
    };
  }

  Timmer.prototype.begin = function () {
    var self = this;
    self._pause === false || (self._pause = false);
    self._count++;
    self._timmer = setTimeout(function () {
      self._callback();
      self.timeoutFn();
    }, self._begin);
  };
  Timmer.prototype.pause = function () {
    this._pause === true || (this._pause = true);
    clearTimeout(this._timmer);
  };
  Timmer.prototype.end = function () {
    this._count = 0;
    this._pause === true || (this._pause = true);
  };

  /**
   *
   * @class Round
   * 圆
   * @param {number} x (圆的x轴坐标)
   * @param {number} y (圆的y轴坐标)
   * @param {number} r (圆的半径)
   */
  function Round(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this._dom = null;
  }

  // 圆与圆圆心的距离
  Round.prototype.distanceWith = function (round) {
    var x1 = this.x;
    var y1 = this.y;
    // var r1 = this.r;
    var x2 = round.x;
    var y2 = round.y;
    // var r2 = round.r;
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  };

  // 圆与圆表面的距离（圆心距离 - 半径之和）
  Round.prototype.outDistanceWith = function (round) {
    // var x1 = this.x;
    // var y1 = this.y;
    var r1 = this.r;
    // var x2 = round.x;
    // var y2 = round.y;
    var r2 = round.r;
    // return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) - (r1 + r2);
    return this.distanceWith(round) - (r1 + r2);
  };
  Round.prototype.isIntersectWith = function (round) {
    return this.outDistanceWith(round) <= 0;
  };

  // CLASS: 头像
  /**
   * @class Avatar
   * 头像
   *
   * @param {number} x (头像圆的 x 轴)
   * @param {number} y (头像圆的 y 轴)
   * @param {number} r (头像圆的半径)
   * @param {string} img (头像图片路径， 默认图片为 ./ymfe.jsp)
   */
  function Avatar(x, y, r, img, isKuso) {
    this.shape = new Round(x, y, r);
    this._img = img || 'https://ymfe.org/images/photos/ymfe.jpg';
    this._dom = null;
    this._isKuso = isKuso;
  }

  Avatar.prototype.render = function (root) {
    var shape = this.shape;
    var x = shape.x;
    var y = shape.y;
    var r = shape.r;
    var _template = '<div class="avatar-wrapper" style="' + styleString({
        left: x,
        top: y,
        width: r,
        height: r
      }) + '">' + '<div class="avatar' + (this._isKuso ? ' kuso' : '') + '" style="' + styleString({
        'background-image': 'url(' + this._img + ')'
      }) + '"></div>' + '</div>';
    this._dom = $($.parseHTML(_template));
    root.append(this._dom);
    return this._dom;
  };
  Avatar.prototype.destroy = function () {
    if (this._dom) {
      this._dom.remove();
    }
  };

  /**
   * @class AvatarBuilder
   * 头像发射器
   *
   * @param {Array<string>} photos (头像图片列表)
   */
  function AvatarBuilder(photos, kusos) {
    this.photos = photos || [];
    this._lastAvatars = []; //已经展示的头像
    this._avatars = []; //待展示的头像
    // this._buildMaxCount = 3000; // 随机头像生成的最大次数
    this._remainMaxCount = 50; // 展示在页面的头像数，超过回收，避免 dom 太多出现的性能问题
    this._avatarIndex = 0; // 新的头像索引
    this._mapIndex = 0;
    this._kusos = kusos || {};
  }

  AvatarBuilder.prototype.addIndex = function () {
    this._avatarIndex = (this._avatarIndex + 1) % this.photos.length;
    this._mapIndex = this._mapIndex + 1;
  }
  AvatarBuilder.prototype.buildOne = function () {
    var avatars = this._avatars;
    var item = Map[this._mapIndex % Map.length];
    var avatar = new Avatar(item.x + parseInt(this._mapIndex / Map.length) * 1440 * 5, item.y, item.r, this.photos[this._avatarIndex], !!this._kusos[this.photos[this._avatarIndex]]);
    avatars.push(avatar);
    this.addIndex();
  };
  AvatarBuilder.prototype.buildSome = function (xRange, yRange, rRange, maxX) {
    var i = 0;
    if (this._avatars.length > 0) {
      this._lastAvatars = this._lastAvatars.concat(this._avatars); //将待展示头像加入到已展示头像列表中
      this._avatars = []; //清空待展示头像列表
    }
    if (this._lastAvatars.length > this._remainMaxCount) {
      var recycleNum = this._lastAvatars.length - this._remainMaxCount;
      for (i = 0; i < recycleNum; i++) {
        var element = this._lastAvatars[i];
        element.destroy();
      }
      this._lastAvatars.splice(0, recycleNum);
    }
    while (Map[this._mapIndex].x + parseInt(this._mapIndex / Map.length) * 1440 * 5 < maxX) {
      this.buildOne();
    }
  };
  AvatarBuilder.prototype.clear = function () {
    this._lastAvatars = [];
    this._avatars = [];
  };

  // 一次性展示，首屏使用
  AvatarBuilder.prototype.renderAll = function (root) {
    var i;
    var avatars = this._avatars;
    for (i = 0; i < avatars.length; i++) {
      var avatar = avatars[i];
      avatar.render(root);
    }
  };
  /**
   * @function renderAsync
   * 异步展示
   *
   * @param {dom} root (头像展示的 dom 节点)
   * @param {number} group (分组头像个数，同组头像同步展示，默认值为 1)
   * @param {number} delay (不同分组的展示间隔，单位：毫秒)
   * @param {number} begin (开始延时，单位：毫秒)
   * @returns
   */
  AvatarBuilder.prototype.renderAsync = function (root, group, delay, begin) {
    var avatars = this._avatars;
    var _delay = delay || 700;
    var _group = group || 1;
    var i = 0,
      j,
      k;
    var timmer = new Timmer(function () {
      // var self = this;
      for (j = 0; j < _group; j++) {
        k = i * _group + j;
        if (k < avatars.length) {
          avatars[k].render(root);
        } else {
          break;
        }
      }
      i++;
    }, _delay, Math.ceil(avatars.length / group), begin);
    timmer.begin();
    return timmer;
  };
  AvatarBuilder.prototype.clearLastAvatars = function () {
    this._lastAvatars = [];
  };

  /**
   * @class Curtain
   * 幕布
   */
  function Curtain() {
    this._root = null;
    this._dom = null; //幕布 dom 节点，是一个长度为 2 的数组
    this._left = 0; // 幕布向左移动的距离
    this._drawLeft = 0; // 头像绘制的左边距
  }

  Curtain.prototype.render = function (root) {
    this._root = root;
    var template = '<div class="backdrop current js-current"></div>' +
      '<div class="backdrop next"></div>';
    this._dom = $($.parseHTML(template));
    root.append(this._dom);
    return this._dom;
  };

  // CLASS: 表演
  /**
   * @class Show
   * 表演
   *
   * @param {Array<string>} photos (头像图片列表)
   */
  function Show(photos, kusos, rRange) {
    this.avatarBuilder = new AvatarBuilder(photos, kusos);
    this.curtain = new Curtain();
    this._dom = null;
    this._timmer = null;
    this._drawLeft = 0;
    this._curLeft = 0;
    this._curtainLeft = 0;
    this._currentDom = null;
    this._nextDom = null;
    this._kusos = kusos;
    this.rRange = (rRange && rRange.length === 2) || [60, 120];
  }

  Show.prototype.render = function (root) {
    this._dom = root;
    this.curtain.render(root);
    this._currentDom = this.curtain._dom.eq(0);
    this._nextDom = this.curtain._dom.eq(1);
    return this._dom;
  };
  Show.prototype.begin = function () {
    var self = this;
    var width = this._dom.width();
    var height = this._dom.height();

    // 首屏
    self._drawLeft = width;
    self._curLeft = width;
    var rRange = this.rRange;
    var xRange = [
      rRange[1] / 2,
      self._drawLeft
    ];
    var yRange = [
      rRange[1] / 2,
      height - rRange[1] / 2
    ];
    self.avatarBuilder.clear();
    self.avatarBuilder.buildSome(xRange, yRange, rRange, width);
    // self.curtain.begin();
    self.avatarBuilder.renderAsync(self._currentDom, 3);
    // 头像
    self._timmer = new Timmer(function () {
      self._curtainLeft += .2;
      self._curLeft += .2;

      self.curtain._dom.css('transform', translate3D({
        x: -self._curtainLeft,
        y: 0,
        z: 0
      }));
      // next 画布出现
      if (self._curtainLeft === 10000 - width) {
        self._currentDom.removeClass('js-current');
        self._nextDom.addClass('js-current');
        var _currentDom = self._currentDom;
        self._currentDom = self._nextDom;
        self._nextDom = _currentDom;
        self.avatarBuilder.clearLastAvatars();
        self._curLeft = 0;
        self._drawLeft = 0;
        // next 画布成为新的 current 画布
      } else if (self._curtainLeft === 10000) {
        self._nextDom.removeClass('current');
        self._nextDom.addClass('next');
        self._nextDom.empty();
        self._currentDom.removeClass('next');
        self._currentDom.addClass('current');
        self._curtainLeft = 0;
      }

      var curLeft = self._curLeft;
      var drawLeft = self._drawLeft;

      // 最右边 100px 出现新的头像
      if (curLeft - drawLeft >= 100) {
        var xRange = [
          drawLeft, drawLeft + 100
        ];
        self.avatarBuilder.buildSome(xRange, yRange, rRange, drawLeft + 100);
        self.avatarBuilder.renderAsync(self._currentDom, 1);
        self._drawLeft += 100;
      }
    }, WALL_SPEED);
    self._timmer.begin();

    // avatar 事件
    self._dom.on('mouseenter', '.avatar', function () {
      $(this).css('transform', 'scale(3)');
      var img = this.style['background-image'],
        name = img.replace('url(', '').replace(')', '').replace(/\"/gi, "");
      if (self._kusos[name]) {
        $(this).css('background-image', 'url("' + self._kusos[name] + '")');
      }
      self._timmer.pause();
    });
    self._dom.on('mouseleave', '.avatar', function () {
      var img = this.style['background-image'],
        name = img.replace('url(', '').replace(')', '').replace(/\"/gi, "");
      for (var key in self._kusos) {
        if (name === self._kusos[key]) {
          $(this).css('background-image', 'url("' + key + '")');
        }
      }
      $(this).css('transform', '');
      self._timmer.begin();
    });
  };
  //// plugin main ////
  var photoWall = {
    template: '' +
    '<div class="tq-photo-wall">' +
    '</div>',
    speed: 1000
  };
  $.fn.tqPhotoWall = function (photos, kusos) {
    this.html(photoWall.template);
    var d_root = this.find('.tq-photo-wall');
    // Romdan Photos
    for (var i = 0; i < photos.length / 2; i++) {
      var a = getRandomInt(0, photos.length - 1),
        b = getRandomInt(0, photos.length - 1),
        temp = photos[a];
      photos[a] = photos[b];
      photos[b] = temp;
    }

    // Romdan Photos;
    while (Object.keys(kusos).length > 3) {
      var a = getRandomInt(0, Object.keys(kusos).length - 1);
      delete(kusos[Object.keys(kusos)[a]]);
    }
    for (var key in kusos) {
      (new Image()).src = kusos[key];
    }

    // Romdan Map
    var a = getRandomInt(0, Map.length - 1),
      cache = Map.slice(0, a);
    Map = Map.slice(a);
    for (var i = 0; i < cache.length; i++) {
      cache[i].x += 5 * 1440;
      Map.push(cache[i]);
    }
    var start = Map[0].x - 100;
    for (var i = 0; i < Map.length; i++) {
      Map[i].x -= start;
    }

    $(function () {
      var show = new Show(photos, kusos);
      show.render(d_root);
      show.begin();
    });
  };
})(jQuery);

var Map = [
  {
    "x": 73,
    "y": 246,
    "r": 106
  }, {
    "x": 223,
    "y": 83,
    "r": 112
  }, {
    "x": 256,
    "y": 309,
    "r": 84
  }, {
    "x": 349,
    "y": 194,
    "r": 74
  }, {
    "x": 395,
    "y": 60,
    "r": 74
  }, {
    "x": 396,
    "y": 329,
    "r": 72
  }, {
    "x": 542,
    "y": 171,
    "r": 126
  }, {
    "x": 607,
    "y": 338,
    "r": 72
  }, {
    "x": 728,
    "y": 276,
    "r": 70
  }, {
    "x": 739,
    "y": 83,
    "r": 98
  }, {
    "x": 918,
    "y": 265,
    "r": 146
  }, {
    "x": 927,
    "y": 63,
    "r": 70
  }, {
    "x": 1094,
    "y": 311,
    "r": 70
  }, {
    "x": 1124,
    "y": 107,
    "r": 108
  }, {
    "x": 1266,
    "y": 294,
    "r": 116
  }, {
    "x": 1284,
    "y": 68,
    "r": 70
  }, {
    "x": 1434,
    "y": 117,
    "r": 102
  }, {
    "x": 1438,
    "y": 336,
    "r": 72
  }, {
    "x": 1557,
    "y": 306,
    "r": 100
  }, {
    "x": 1590,
    "y": 199,
    "r": 80
  }, {
    "x": 1616,
    "y": 73,
    "r": 72
  }, {
    "x": 1701,
    "y": 338,
    "r": 124
  }, {
    "x": 1770,
    "y": 152,
    "r": 76
  }, {
    "x": 1880,
    "y": 76,
    "r": 72
  }, {
    "x": 1891,
    "y": 306,
    "r": 80
  }, {
    "x": 2037,
    "y": 156,
    "r": 122
  }, {
    "x": 2059,
    "y": 339,
    "r": 107
  }, {
    "x": 2201,
    "y": 60,
    "r": 78
  }, {
    "x": 2249,
    "y": 309,
    "r": 78
  }, {
    "x": 2301,
    "y": 176,
    "r": 82
  }, {
    "x": 2400,
    "y": 315,
    "r": 88
  }, {
    "x": 2488,
    "y": 71,
    "r": 98
  }, {
    "x": 2600,
    "y": 179,
    "r": 72
  }, {
    "x": 2606,
    "y": 333,
    "r": 100
  }, {
    "x": 2718,
    "y": 114,
    "r": 74
  }, {
    "x": 2792,
    "y": 333,
    "r": 94
  }, {
    "x": 2824,
    "y": 179,
    "r": 70
  }, {
    "x": 2870,
    "y": 61,
    "r": 76
  }, {
    "x": 3059,
    "y": 95,
    "r": 100
  }, {
    "x": 2972,
    "y": 301,
    "r": 120
  }, {
    "x": 3178,
    "y": 128,
    "r": 126
  }, {
    "x": 3181,
    "y": 311,
    "r": 86
  }, {
    "x": 3304,
    "y": 191,
    "r": 70
  }, {
    "x": 3338,
    "y": 62,
    "r": 72
  }, {
    "x": 3342,
    "y": 337,
    "r": 84
  }, {
    "x": 3486,
    "y": 179,
    "r": 126
  }, {
    "x": 3652,
    "y": 80,
    "r": 76
  }, {
    "x": 3653,
    "y": 333,
    "r": 74
  }, {
    "x": 3776,
    "y": 229,
    "r": 128
  }, {
    "x": 3831,
    "y": 70,
    "r": 82
  }, {
    "x": 3911,
    "y": 301,
    "r": 70
  }, {
    "x": 3965,
    "y": 61,
    "r": 70
  }, {
    "x": 4008,
    "y": 184,
    "r": 80
  }, {
    "x": 4105,
    "y": 338,
    "r": 118
  }, {
    "x": 4155,
    "y": 79,
    "r": 104
  }, {
    "x": 4276,
    "y": 227,
    "r": 130
  }, {
    "x": 4318,
    "y": 63,
    "r": 76
  }, {
    "x": 4393,
    "y": 126,
    "r": 86
  }, {
    "x": 4454,
    "y": 325,
    "r": 94
  }, {
    "x": 4566,
    "y": 103,
    "r": 94
  }, {
    "x": 4675,
    "y": 292,
    "r": 160
  }, {
    "x": 4731,
    "y": 79,
    "r": 76
  }, {
    "x": 4845,
    "y": 176,
    "r": 86
  }, {
    "x": 4912,
    "y": 313,
    "r": 72
  }, {
    "x": 4952,
    "y": 62,
    "r": 80
  }, {
    "x": 5056,
    "y": 154,
    "r": 72
  }, {
    "x": 5111,
    "y": 315,
    "r": 116
  }, {
    "x": 5248,
    "y": 112,
    "r": 142
  }, {
    "x": 5286,
    "y": 258,
    "r": 72
  }, {
    "x": 5404,
    "y": 311,
    "r": 74
  }, {
    "x": 5465,
    "y": 168,
    "r": 76
  }, {
    "x": 5547,
    "y": 290,
    "r": 82
  }, {
    "x": 5594,
    "y": 91,
    "r": 70
  }, {
    "x": 5738,
    "y": 218,
    "r": 122
  }, {
    "x": 5888,
    "y": 89,
    "r": 82
  }, {
    "x": 5888,
    "y": 259,
    "r": 90
  }, {
    "x": 6037,
    "y": 136,
    "r": 90
  }, {
    "x": 6059,
    "y": 337,
    "r": 72
  }, {
    "x": 6165,
    "y": 61,
    "r": 74
  }, {
    "x": 6169,
    "y": 241,
    "r": 72
  }, {
    "x": 6273,
    "y": 333,
    "r": 70
  }, {
    "x": 6292,
    "y": 213,
    "r": 70
  }, {
    "x": 6310,
    "y": 66,
    "r": 86
  }, {
    "x": 6419,
    "y": 318,
    "r": 84
  }, {
    "x": 6498,
    "y": 113,
    "r": 94
  }, {
    "x": 6644,
    "y": 297,
    "r": 70
  }, {
    "x": 6732,
    "y": 135,
    "r": 122
  }, {
    "x": 6836,
    "y": 317,
    "r": 70
  }, {
    "x": 6931,
    "y": 200,
    "r": 90
  }, {
    "x": 6969,
    "y": 61,
    "r": 70
  }, {
    "x": 7054,
    "y": 335,
    "r": 80
  }, {
    "x": 7133,
    "y": 194,
    "r": 96
  }, {
    "x": 7192,
    "y": 328,
    "r": 70
  }
].map(function (t) {
  return {
    x: t.x,
    y: t.y,
    r: t.r - 10
  };
});
