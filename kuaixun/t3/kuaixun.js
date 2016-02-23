(function() {
    window.onload = function() {
    	if(typeof DFTOUTTIAO_KUAIXUN_QID == 'undefined' || DFTOUTTIAO_KUAIXUN_QID == null || DFTOUTTIAO_KUAIXUN_QID.length == 0){
    		return;
    	}
        var style = createStyleNode('.DFTOUTTIAO-fixed-kuaixun{position: fixed; bottom: -70px; left: 50%; width: 451px; height: 54px; margin-left: -224.5px; background-color: transparent; z-index: 99999999;}*html{background-image: url(about:blank); background-attachment: fixed;}*html .DFTOUTTIAO-fixed-kuaixun{position:absolute; top:expression(eval(document.documentElement.scrollTop +document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0) - 70)); bottom: auto;}');
        var div = document.createElement('div');
        div.className = 'DFTOUTTIAO-fixed-kuaixun';
        div.id = 'DFTOUTTIAO_KUAIXUN_IFRAME_WRAP';
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', 'http://dev.static.com/kuaixun/t3/src_kx.html?qid=' + DFTOUTTIAO_KUAIXUN_QID);
        // iframe.setAttribute('src', 'http://mini.eastday.com/kuaixun/src_kx.html?qid=' + DFTOUTTIAO_KUAIXUN_QID);
        iframe.setAttribute('style', 'height: 54px; width: 451px; background-color: transparent;');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '100%');
        iframe.setAttribute('marginwidth', '0');
        iframe.setAttribute('marginheight', '0');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowtransparency', 'true');
        div.appendChild(iframe);
        document.body.appendChild(style);
        document.body.appendChild(div);
        var isIE = !!window.ActiveXObject;
        var isIE6 = isIE && !window.XMLHttpRequest;
        // var isIE8=isIE&&!!document.documentMode;
        // var isIE7=isIE&&!isIE6&&!isIE8;
        if (!isIE6) {
            setTimeout(function(){
            	var i = 14;
	            var t = setInterval(function() {
	                div.style.bottom = (getStyleVal(div, 'bottom') + 10) + 'px';
	                i--;
	                if (i <= 0) {
	                    clearInterval(t);
	                }
	            }, 30);
            }, 1000);
        }

        /**
         * 获取DOM元素的样式
         * @param  {[type]} element [description]
         * @param  {[type]} attr    [description]
         * @return {[type]}         [description]
         */
        function getStyleVal(element, attr) {
            if (typeof window.getComputedStyle != 'undefined') {
                //如果支持W3C，使用getComputedStyle来获取样式 
                return parseInt(window.getComputedStyle(element, null)[attr]);
            } else if (element.currentStyle) {
                return parseInt(element.currentStyle[attr]);
            }
        }

        /**
         * 创建style标签并填充样式
         * @param  {[type]} str [description]
         * @return {[type]}     [description]
         */
        function createStyleNode(str) {
            var nod = document.createElement("style");
            nod.type = "text/css";
            // IE
            if (nod.styleSheet) {
                nod.styleSheet.cssText = str;
            } else {
                nod.innerHTML = str; //或者写成 nod.appendChild(document.createTextNode(str))
            }
            // document.getElementsByTagName('head')[0].appendChild(nod); 
            return nod;
        }


    };

})();

function CLOSE_DFTOUTIAO_KUAIXUN(){
    document.body.removeChild(document.getElementById('DFTOUTTIAO_KUAIXUN_IFRAME_WRAP'));
}
