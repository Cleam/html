/**
 * 扩展Array对象的方法(判断数组中是否包含指定值)
 * @param  {[type]} item 指定值
 * @return {[type]}      [description]
 */
Array.prototype.contains = function(item){
    return RegExp(item).test(this);
};

/**
 * 提供命名管理，管理全局变量。
 * 所有全局变量必须命名在GLOBAL里面的命名空间下，将变量冲突、覆盖问题降到最小。
 * @type {{}}
 */
var GLOBAL = {};
/**
 * 给创建命名空间提供一个统一接口
 * 调用方法：GLOBAL.namespace('Ie');这样便创建了一个ie的命名空间。
 * 创建完命名空间后，如果需要定义一个全局变量，方法如下：GLOBAL.Ie.isIe6;
 * 使用该变量的方法也是：GLOBAL.Ie.isIe6
 * @param str
 */
GLOBAL.namespace = function(str){
    var arr = str.split("."),o = GLOBAL;
    for(var i = (arr[0] == "GLOBAL") ? 1 : 0; i < arr.length; i++){
        o[arr[i]] = o[arr[i]] || {};
        o = o[arr[i]];
    }
};

GLOBAL.namespace('Util');
GLOBAL.namespace('Js');
GLOBAL.namespace('Cookie');
GLOBAL.namespace('Os');
GLOBAL.namespace('Browser');

/* 公用的工具方法(头条H5) */
GLOBAL.Util = {
    /**
     * 获取url中参数的值
     * @param  {[type]} name 参数名
     * @return {[type]}      参数值
     */
    getQueryString: function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },

    /**
     * 打乱数组
     * @param  {[type]} arr 目标数组
     * @return {[type]}     [description]
     */
    dislocateArr: function(arr) {
        return arr.sort(function() {
            return 0.5 - Math.random(); 
        });
    },

    /**
     * 计算指定时间与当前时间的时间差 并转换成相应格式字符串
     * 如：xx分钟前，xx小时前，昨天 xx:xx，前天 xx:xx，xx-xx xx:xx
     * @return {[type]} [description]
     */
    getSpecialTimeStr: function(str) {
        var targetTime = this.strToTime(str);
        if (!targetTime) {
            return false;
        }
        var currentTime = new Date().getTime();
        var tdoa = Number(currentTime - targetTime),
            dayTime = 24 * 60 * 60 * 1000, // 1天
            hourTime = 60 * 60 * 1000, // 1小时
            minuteTime = 60 * 1000; // 1分钟

        if (tdoa >= dayTime) { // 天
            var h = tdoa / dayTime;
            if (h > 2) {
                return this.timeToString(tdoa);
            } else if (h > 1) {
                return '前天';
            } else {
                return '昨天';
            }
        } else if (tdoa >= hourTime) { // 小时
            return Math.floor(tdoa / hourTime) + '小时前';
        } else if (tdoa >= minuteTime) {
            return Math.floor(tdoa / minuteTime) + '分钟前';
        } else {
            return '最新';
            // return Math.floor(tdoa / 1000) + '秒前';
        }
    },
    /**
     * 字符串转换成时间（毫秒）
     * @param  {[type]} str 时间字符串（格式：2016-02-26 09:12）
     * 注意：iphone不支持（格式：2016-02-26 09:12）需要转换成：（格式：2016/02/26 09:12）
     * @return {[type]}     [description]
     */
    strToTime: function(str) {
        try {
            return Date.parse(str.replace(/-/g, "/"));
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    /**
     * 时间戳转换为字符串
     * @param  {[type]} t 时间戳
     * @param  {[type]} splitStr 分隔符
     * @return {[type]}   [description]
     */
    timeToString: function(t, splitStr) {
        return this.dateToString(this.timeToDate(t), splitStr);
    },

    /**
     * 毫秒级时间转日期时间
     * @param  {[type]} t 毫秒时间戳
     * @return {[type]}   日期时间
     */
    timeToDate: function(t) {
        return new Date(t);
    },

    /**
     * 日期转字符串
     * @param  {[type]} d           日期时间
     * @param  {[type]} splitStr 分隔符
     * @return {[type]}             默认返回 yyyy-MM-dd HH:mm
     */
    dateToString: function(d, splitStr) {
        var year = d.getFullYear().toString(),
            month = (d.getMonth() + 1).toString(),
            day = d.getDate().toString(),
            h = d.getHours().toString(),
            m = d.getMinutes().toString();
        month = month.length > 1 ? month : ('0' + month);
        day = day.length > 1 ? day : ('0' + day);
        h = h.length > 1 ? h : ('0' + h);
        m = m.length > 1 ? m : ('0' + m);
        // var str = year + '-' + month + '-' + day + ' ' + h + ':' + m; // yyyy-MM-dd HH:mm
        var str = month + '-' + day + ' ' + h + ':' + m; // MM-dd HH:mm
        if (splitStr) {
            str = str.replace(/-/g, splitStr);
        }
        return str;
    },

    /**
     * 毫秒转成时间字符串
     * @param  {Number}  seconds 毫秒[必需]
     * @param  {Boolean} hasHour 是否需要区分小时[可选]
     * @return {String}          hasHour[true]: hh:mm:ss；否则[默认]：mm:ss。
     */
    msToTimestr: function(ts, hasHour){
       var seconds = (ts ? Number(ts) / 1000 : 0);
       return GLOBAL.Util.secondsToTimestr(seconds, hasHour);
    },

    /**
     * 秒转成时间字符串
     * @param  {Number}  seconds 秒[必需]
     * @param  {Boolean} hasHour 是否需要区分小时[可选]
     * @return {String}          hasHour[true]: hh:mm:ss；否则[默认]：mm:ss。
     */
    secondsToTimestr: function(seconds, hasHour){
        var hh, mm, ss;
        // 传入的时间为空或小于0
        if(seconds == null || seconds < 0 ){
            return;
        }
        seconds = Math.ceil(seconds);
        // 得到小时
        hh = seconds / 3600 | 0;
        seconds = parseInt(seconds) - hh * 3600;
        if(parseInt(hh) < 10){
            hh = '0' + hh;
        }
        // 得到分
        mm = seconds / 60 | 0;
        if(parseInt(mm) < 10){
            mm = '0' + mm;
        }
        // 得到秒
        ss = parseInt(seconds) - mm * 60;
        if(ss < 10){
            ss = '0' + ss;
        }
        if(hasHour){
            return hh + ':' + mm + ':' + ss;
        }
        return mm + ':' + ss;
    },

    /**
     * 获取滚动高度
     * @return {[type]} [description]
     */
    getScrollTop: function() {
        if (document.documentElement && document.documentElement.scrollTop) {
            return document.documentElement.scrollTop;
        } else if (document.body) {
            return document.body.scrollTop;
        }
    },

    /**
     * 获取文档高度
     * @return {[type]} [description]
     */
    getClientHeight: function() {
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            return (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        } else {
            return (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
    },

    /**
     * browser的判断
     * @return {[type]} [description]
     */
    getBrowserType: function() {
        var agent = navigator.userAgent.toLowerCase();
        var browser_type = "";
        if (agent.indexOf("msie") > 0) {
            browser_type = "IE";
        }
        if (agent.indexOf("firefox") > 0) {
            browser_type = "firefox";
        }
        if (agent.indexOf("chrome") > 0 && agent.indexOf("mb2345browser") < 0 && agent.indexOf("360 aphone browser") < 0) {
            browser_type = "chrome";
        }
        if (agent.indexOf("360 aphone browser") > 0 || agent.indexOf("qhbrowser") > 0) {
            browser_type = "360";
        }
        if (agent.indexOf("ucbrowser") > 0) {
            browser_type = "UC";
        }
        if (agent.indexOf("micromessenger") > 0) {
            browser_type = "WeChat";
        }
        if ((agent.indexOf("mqqbrowser") > 0 || agent.indexOf("qq") > 0) && agent.indexOf("micromessenger") < 0) {
            browser_type = "QQ";
        }
        if (agent.indexOf("miuibrowser") > 0) {
            browser_type = "MIUI";
        }
        if (agent.indexOf("mb2345browser") > 0) {
            browser_type = "2345";
        }
        if (agent.indexOf("sogoumobilebrowser") > 0) {
            browser_type = "sogou";
        }
        if (agent.indexOf("liebaofast") > 0) {
            browser_type = "liebao";
        }
        if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0 && agent.indexOf("ucbrowser") < 0 && agent.indexOf("micromessenger") < 0 && agent.indexOf("mqqbrowser") < 0 && agent.indexOf("miuibrowser") < 0 && agent.indexOf("mb2345browser") < 0 && agent.indexOf("sogoumobilebrowser") < 0 && agent.indexOf("liebaofast") < 0 && agent.indexOf("qhbrowser") < 0) {
            browser_type = "safari";
        }
        return browser_type;
    },

    /**
     * OS的判断
     * @return {[type]} [description]
     */
    getOsType: function() {
        var agent = navigator.userAgent.toLowerCase();
        var os_type = "";
        if (/android/i.test(navigator.userAgent)) {
            var index = agent.indexOf("android");
            version = agent.substr(index + 8, 3);
            os_type = "Android " + version;
        }
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            var index = agent.indexOf("os");
            version = agent.substr(index + 3, 3);
            os_type = "iOS " + version;
        }
        if (/Linux/i.test(navigator.userAgent) && !/android/i.test(navigator.userAgent) && !/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            os_type = "Linux";
        }
        if (/windows|win32/i.test(navigator.userAgent)) {
            os_type = "windows32";
        }
        if (/windows|win32/i.test(navigator.userAgent)) {
            os_type = "windows64";
        }
        return os_type;
    },

    /**
     * 获取当前手机屏幕分辨率的高宽
     * @return {json} {w: xxx, h: xxx}
     */
    getPixel: function(){
        var width = window.screen.width;
        var height = window.screen.height;
        return {w: width, h: height};
    },

    /**
     * 获取字符串字节数
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    getBytes: function(str){
        var byteLen=0,len=str.length;
        if(str){
            for(var i=0; i<len; i++){
                if(str.charCodeAt(i)>255){
                    byteLen += 2;
                }
                else{
                    byteLen++;
                }
            }
            return byteLen;
        }
        else{
            return 0;
        }
    },

    /**
     * Javascript获取页面来源(referer)
     * @from http://www.au92.com/archives/javascript-get-referer.html
     * @return {[type]} [description]
     */
    getReferrer: function() {
        var referrer = '';
        try {
            referrer = window.top.document.referrer;
        } catch(e) {
            if(window.parent) {
                try {
                    referrer = window.parent.document.referrer;
                } catch(e2) {
                    referrer = '';
                }
            }
        }
        if(referrer === '') {
            referrer = document.referrer;
        }
        return referrer;
    },

    /**
     * 获取url（排除url中参数）
     * @return {[type]} [description]
     */
    getUrlNoParams: function() {
        var locaUrl = window.location.href;
        if(locaUrl.indexOf("?") >= 0){
            var endIndex = locaUrl.indexOf("?");
            return locaUrl.substring(0, endIndex);
        }
        if(locaUrl.indexOf("#") >= 0){
            var endIndex = locaUrl.indexOf("#");
            return locaUrl.substring(0, endIndex);
        }
        return locaUrl;
    },

    /**
     * 获取url
     * @return {[type]} [description]
     */
    getUrl: function() {
        var locaUrl = window.location.href;
        if(locaUrl.indexOf("?") >= 0){
            var endIndex = locaUrl.indexOf("?");
            return locaUrl.substring(0, endIndex);
        }
        if(locaUrl.indexOf("#") >= 0){
            var endIndex = locaUrl.indexOf("#");
            return locaUrl.substring(0, endIndex);
        }
        return locaUrl;
    },

    /**
     * 设置iframe宽高
     * @param {[type]} ifm iframe DOM对象
     */
    setIframe: function(ifm) {   
        var ifm= ifm || window.frames['iframe'] || document.getElementById('iframe') || null;
        if(ifm){
            var subWeb = document.frames ? document.frames["iframe"].document : ifm.contentDocument;
            if(ifm != null && subWeb != null) {
               ifm.height = subWeb.body.scrollHeight;
               ifm.width = subWeb.body.scrollWidth;
            }   
        }
    },

    /**
     * 设置iframe content宽高
     * @param {[type]} ifm iframe DOM对象
     */
    setIframeContent: function(ifm) {   
        var ifm= ifm || window.frames['iframe'] || document.getElementById('iframe') || null;
        if(ifm){
            var subWeb = document.frames ? document.frames["iframe"].document : ifm.contentDocument;
            if(ifm != null && subWeb != null) {
               subWeb.documentElement.width = ifm.parentNode.offsetWidth;
               subWeb.documentElement.height = ifm.parentNode.offsetHeight;
               subWeb.body.setAttribute('width', ifm.parentNode.offsetWidth);
               subWeb.body.setAttribute('height', ifm.parentNode.offsetHeight);
            }   
        }
    }

};

/* 原声JavaScript扩展 */
GLOBAL.Js = {
    /**
     * 去空白
     * @param ostr 需处理的值
     * @returns {string|void|XML|*} 处理后的值
     */
    trim: function (ostr){
        return ostr.replace(/^\s+|\s+$/g,'');
    },
    isNumber: function (s){
        return !isNaN(s);
    },
    isString: function (s){
        return typeof s === 'string';
    },
    isBoolean: function (s){
        return typeof s === 'boolean';
    },
    isFunction: function (s){
        return typeof s === 'function';
    },
    isNull: function (s){
        return s === null;
    },
    isUndefined: function (s){
        return typeof s === 'undefined';
    },
    isEmpty: function (s){
        return /^\s*$/.test(s);
    },
    isArray: function (s){
        return s instanceof Array;
    }
};

/* cookie扩展 */
GLOBAL.Cookie = {
    /**
     * 设置cookie
     * @param name 名称
     * @param value 值
     * @param expires 有效时间（单位：小时）（可选） 默认：24h
     */
    set: function(name, value, expires){
        var expTimes = expires ? (Number(expires) * 60 * 60 * 1000) : (24 * 60 * 60 * 1000); // 毫秒
        var expDate = new Date();
        expDate.setTime(expDate.getTime() + expTimes);
        var expString = expires ? '; expires=' + expDate.toUTCString() : '';
        var pathString = '; path=/';
        document.cookie = name + '=' + encodeURI(value) + expString + pathString;
    },
    /**
     * 读cookie
     * @param name
     */
    get: function(name){
        var cookieStr = '; ' + document.cookie + '; ';
        var index = cookieStr.indexOf('; ' + name + '=');
        if(index != -1){
            var s = cookieStr.substring(index + name.length + 3, cookieStr.length);
            return decodeURI(s.substring(0, s.indexOf('; ')));
        } else {
            return null;
        }
    },
    /**
     * 删除cookie
     * @param name
     */
    del: function(name){
        var exp = new Date(new Date().getTime() - 1);
        var s = this.read(name);
        if(s !== null) {
            document.cookie = name + '=' + s + '; expires=' + exp.toUTCString + '; path=/';
        }
    }
};

// 操作系统
GLOBAL.Os = function () { 
    var u = navigator.userAgent,
        Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"),  
        mobile = false;  
    for (var v = 0; v < Agents.length; v++) {  
        if (u.indexOf(Agents[v]) > -1) { 
            mobile = true; 
            break; 
        }  
    }
    return {
        //移动终端浏览器版本信息 
        mobile: mobile, //是否为移动终端 
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器 
        iphone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
        ipad: u.indexOf('iPad') > -1, //是否iPad 
        webapp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部 
    }; 
}();

// 浏览器
GLOBAL.Browser = function () { 
    var ua = navigator.userAgent, //获取判断用的对象
        mobile = GLOBAL.Os.mobile;
    if(mobile){    // mobile
        //移动终端浏览器版本信息
        return { 
            wechat: ua.indexOf('MicroMessenger') > -1, // 在微信中打开  
            weibo: ua.toLowerCase().indexOf('weibo') > -1, // 在新浪微博客户端打开
            qq: ua.indexOf('QQ') > -1, // 在QQ空间打开 
            qqbrowser: ua.indexOf('MQQBrowser') > -1 // 在QQ空间打开 
        }; 
    }
}();



/**
 * 返回顶部动画
 */
//goTop(500);//500ms内滚回顶部
// function goTop(times) {
//     if (!!!times) {
//         $(window).scrollTop(0);
//         return;
//     }
//     var sh = $('body').scrollTop(); //移动总距离
//     var inter = 13.333; //ms,每次移动间隔时间
//     var forCount = Math.ceil(times / inter); //移动次数
//     var stepL = Math.ceil(sh / forCount); //移动步长
//     var timeId = null;

//     function ani() {
//         !!timeId && clearTimeout(timeId);
//         timeId = null;
//         //console.log($('body').scrollTop());
//         if ($('body').scrollTop() <= 0 || forCount <= 0) { //移动端判断次数好些，因为移动端的scroll事件触发不频繁，有可能检测不到有<=0的情况
//             $('body').scrollTop(0);
//             return;
//         }
//         forCount--;
//         sh -= stepL;
//         $('body').scrollTop(sh);
//         timeId = setTimeout(function() { ani(); }, inter);
//     }
//     ani();
// }


