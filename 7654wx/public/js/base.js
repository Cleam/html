/*
 * 与项目无关的js功能集合(适用于移动web)
 * 注意：请不要轻易修改和删除此文件的内容，如需修改，请告知创建者。
 * @author lizhigao(lizhigao@021.com)
 * @date 2015-12-05
 */

/**
 * 根据手机尺寸动态更新根元素字体大小
 * 此方法针对的是设计稿为750px宽度，设置了根元素字体大小为20px。
 * @param  {BOM Object} doc document
 * @param  {BOM Ojbect} win window
 * @return {[type]}     
 */
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 20 * (clientWidth / 750) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);






