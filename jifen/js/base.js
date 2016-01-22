/**
 * 根据手机尺寸动态更新根元素字体大小
 * 此方法针对的是设计稿为750px宽度，设置了根元素字体大小为20px。
 * @param  {BOM Object} doc document
 * @param  {BOM Ojbect} win window
 * @return {[type]}   
 * @author lizhigao  
 */
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    // doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
})(document, window);
