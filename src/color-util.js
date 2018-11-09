/**
 * @fileOverview 颜色计算的辅助方法
 * @author dxq613@gmail.com
 */
const isNumber = require('@antv/util/lib/type/is-number');
const isString = require('@antv/util/lib/type/is-string');
const each = require('@antv/util/lib/each');

// const RGB_REG = /rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
const RGB_REG = /rgba?\(([\s.,0-9]+)\)/;

// 创建辅助 tag 取颜色
function createTmp() {
  const i = document.createElement('i');
  i.title = 'Web Colour Picker';
  i.style.display = 'none';
  document.body.appendChild(i);
  return i;
}

// 获取颜色之间的插值
function getValue(start, end, percent, index) {
  const value = start[index] + (end[index] - start[index]) * percent;
  return value;
}

// 数组转换成颜色
function arr2rgb(arr) {
  return '#' + toHex(arr[0]) + toHex(arr[1]) + toHex(arr[2]);
}

// 将数值从 0-255 转换成16进制字符串
function toHex(value) {
  value = Math.round(value);
  value = value.toString(16);
  if (value.length === 1) {
    value = '0' + value;
  }
  return value;
}

function calColor(colors, percent) {
  if (isNaN(percent) || !isNumber(percent) || percent < 0) {
    percent = 0;
  }
  if (percent > 1) {
    percent = 1;
  }
  const steps = colors.length - 1;
  const step = Math.floor(steps * percent);
  const left = steps * percent - step;
  const start = colors[step];
  const end = step === steps ? start : colors[step + 1];
  const rgb = arr2rgb([
    getValue(start, end, left, 0),
    getValue(start, end, left, 1),
    getValue(start, end, left, 2)
  ]);
  return rgb;
}

// rgb 颜色转换成数组
function rgb2arr(str) {
  const arr = [];
  arr.push(parseInt(str.substr(1, 2), 16));
  arr.push(parseInt(str.substr(3, 2), 16));
  arr.push(parseInt(str.substr(5, 2), 16));
  return arr;
}

const colorCache = {};
let iEl = null;
const ColorUtil = {
  /**
   * 将颜色转换到 rgb 的格式
   * @param  {String} color 颜色
   * @return {String} 将颜色转换到 '#ffffff' 的格式
   */
  toRGB(color) {
    // 如果已经是 rgb的格式
    if (color[0] === '#' && color.length === 7) {
      return color;
    }
    if (!iEl) { // 防止防止在页头报错
      iEl = createTmp();
    }
    let rst;
    if (colorCache[color]) {
      rst = colorCache[color];
    } else {
      iEl.style.color = color;
      rst = document.defaultView.getComputedStyle(iEl, '').getPropertyValue('color');
      const matchs = RGB_REG.exec(rst);
      const cArray = matchs[1].split(/\s*,\s*/);
      rst = arr2rgb(cArray);
      colorCache[color] = rst;
    }
    return rst;
  },

  rgb2arr,

  /**
   * 获取渐变函数
   * @param  {Array} colors 多个颜色
   * @return {String} 颜色值
   */
  gradient(colors) {
    const points = [];
    if (isString(colors)) {
      colors = colors.split('-');
    }
    each(colors, color => {
      if (color.indexOf('#') === -1) {
        color = ColorUtil.toRGB(color);
      }
      points.push(rgb2arr(color));
    });
    return function(percent) {
      return calColor(points, percent);
    };
  }
};

module.exports = ColorUtil;
